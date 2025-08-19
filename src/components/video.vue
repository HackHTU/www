<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{
  src: string;
  alt?: string;
  poster?: string;
  posterFirstFrame?: boolean;
}>();

const isShowPreview = ref(false);
const posterUrl = ref<string | undefined>(props.poster);

function drawFrameFromVideoElement(video: HTMLVideoElement) {
  return new Promise<string | undefined>((resolve) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 160;
      canvas.height = video.videoHeight || 90;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(undefined);
        return;
      }
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL('image/jpeg', 0.8);
        resolve(data);
      } catch  {
        // canvas 可能被跨域污染（tainted）会抛错
        resolve(undefined);
      }
    } catch {
      resolve(undefined);
    }
  });
}

async function tryExtractFromSrc(videoSrc: string): Promise<string | undefined> {
  // create hidden video element
  let objectUrl: string | undefined;
  const video = document.createElement('video');
  video.preload = 'metadata';
  video.muted = true;
  video.playsInline = true;
  video.crossOrigin = 'anonymous';
  video.style.display = 'none';
  document.body.appendChild(video);

  let cleaned = false;
  const cleanUp = () => {
    if (cleaned) return;
    cleaned = true;
    try {
      video.pause();
    } catch {}
    try {
      video.removeAttribute('src');
      video.load?.();
    } catch {}
    if (video.parentNode) video.parentNode.removeChild(video);
    if (objectUrl) {
      try { URL.revokeObjectURL(objectUrl); } catch {}
      objectUrl = undefined;
    }
  };

  const timedOut = new Promise<undefined>((resolve) => {
    const t = setTimeout(() => {
      clearTimeout(t);
      resolve(undefined);
    }, 5000);
  });

  const attemptOnce = async (src: string) => {
    return new Promise<string | undefined>((resolve) => {
      const onError = () => {
        resolve(undefined);
      };
      const onLoadedMeta = async () => {
        // ensure we have some duration/size
        // try to seek to a very small time (first frame)
        const trySeekAndDraw = async () => {
          const handleSeeked = async () => {
            const data = await drawFrameFromVideoElement(video);
            resolve(data);
          };

          // listen seeked
          video.addEventListener('seeked', handleSeeked, { once: true });

          // set time to tiny positive to avoid some codecs returning blank at 0
          try {
            video.currentTime = 0.05;
          } catch {
            // some browsers may throw if not seekable yet; fallback to waiting for timeupdate
          }

          // also try to play to help decode frames (muted so autoplay allowed)
          try {
            const p = video.play();
            if (p && typeof p.then === 'function') p.catch(() => {/* ignore */});
          } catch {
            //
          }
          // fallback: in case seeked never fires, use timeupdate as last resort
          const onTimeUpdate = async () => {
            const data = await drawFrameFromVideoElement(video);
            video.removeEventListener('timeupdate', onTimeUpdate);
            resolve(data);
          };
          video.addEventListener('timeupdate', onTimeUpdate, { once: true });
        };

        // next tick to ensure video dims available
        requestAnimationFrame(trySeekAndDraw);
      };

      video.addEventListener('loadedmetadata', onLoadedMeta, { once: true });
      video.addEventListener('error', onError, { once: true });
      video.src = src;
      // ensure loading begins
      video.load();
    });
  };

  try {
    // First attempt: use the original src (with crossOrigin anonymous)
    const first = await Promise.race([attemptOnce(videoSrc), timedOut]);
    if (first) {
      cleanUp();
      return first;
    }

    // If first failed possibly due to taint or other, try fetching as blob (if allowed)
    try {
      const resp = await fetch(videoSrc, { mode: 'cors' });
      if (!resp.ok) throw new Error('fetch failed');
      const blob = await resp.blob();
      objectUrl = URL.createObjectURL(blob);
      const second = await Promise.race([attemptOnce(objectUrl), timedOut]);
      cleanUp();
      return second ?? undefined;
    } catch {
      cleanUp();
      return undefined;
    }
  } finally {
    cleanUp();
  }
}

async function extractFirstFrame(videoSrc: string) {
  try {
    return await tryExtractFromSrc(videoSrc);
  } catch {
    return undefined;
  }
}

onMounted(async () => {
  if (!posterUrl.value && props.posterFirstFrame && props.src) {
    const dataUrl = await extractFirstFrame(props.src);
    if (dataUrl) posterUrl.value = dataUrl;
  }
});

// 如果 src 变化，且用户要求首帧 poster，则重新尝试生成
watch(
  () => props.src,
  async (newSrc) => {
    if (!newSrc) return;
    if (!props.poster && props.posterFirstFrame) {
      // reset only if user didn't provide poster prop
      posterUrl.value = undefined;
      const dataUrl = await extractFirstFrame(newSrc);
      if (dataUrl) posterUrl.value = dataUrl;
    }
  }
);
</script>

<template>
  <div class="relative h-full w-full">
    <video
      :src="src"
      :poster="posterUrl"
      class="h-full w-full object-cover"
      @click="isShowPreview = true"
    ></video>

    <Teleport to="body">
      <div
        v-if="isShowPreview"
        class="fixed top-0 left-0 z-50 flex h-dvh w-dvw items-center justify-center bg-neutral-600"
        @click.self="isShowPreview = false"
      >
        <div class="relative max-h-full max-w-full text-white">
          <video
            :src="src"
            :alt="alt"
            controls
            autoplay
            class="max-h-full max-w-full object-contain"
          ></video>
          <a
            class="absolute top-4 left-4 cursor-pointer p-2 bg-neutral-700 rounded-2xl"
            :href="src"
            download
          >
            下载
          </a>
          <button
            class="absolute top-4 right-4 cursor-pointer p-2 bg-neutral-700 rounded-2xl"
            @click="isShowPreview = false"
          >
            关闭
          </button>
          <p class="absolute bottom-4 left-4 p-2 bg-neutral-700 rounded-2xl">{{ alt }}</p>
        </div>
      </div>
    </Teleport>
  </div>
</template>
