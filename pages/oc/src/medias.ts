export type MediaItem = {
    type: 'photo' | 'video';
    src: string;
    alt?: string;
    width?: number;
    height?: number;
};

import goodle1 from '@/assets/luna/goodle/goodle_web.mp4?url';

import yrsdmVideo from '@/assets/luna/yrsdm/yrsdm.mp4?url';

// import posterHandwrite from '@/assets/luna/poster/handwrite.png?url';
import posterCat from '@/assets/luna/poster/cat-post.png?url';
import LunaPoster from '@/assets/luna/poster/luna.png';

import stickerPreview from '@/assets/luna/sticker/preview.png?url';

import sticker1 from '@/assets/luna/sticker/1.GIF?url';
import sticker2 from '@/assets/luna/sticker/2.png?url';
import sticker3 from '@/assets/luna/sticker/3.png?url';

import cardImage from '@/assets/luna/card/image.png?url';

export const lunaMedia: MediaItem[] = [
    {
        type: 'video',
        src: goodle1,
        alt: 'INI: Goodle video',
    },
    { type: 'photo', src: LunaPoster, alt: 'LUNA post' },
    { type: 'photo', src: posterCat, alt: 'INI: Cat poster' },
    { type: 'photo', src: cardImage, alt: 'INI: Card image' },

    { type: 'video', src: yrsdmVideo, alt: 'INI: YRSDM video' },

    {
        type: 'photo',
        src: stickerPreview,
        alt: 'INI: Telegram Sticker: https://t.me/addstickers/LunaEmojiStickers',
    },
    { type: 'photo', src: sticker1, alt: 'INI: Sticker 1' },
    { type: 'photo', src: sticker2, alt: 'INI: Sticker 2' },
    { type: 'photo', src: sticker3, alt: 'INI: Sticker 3' },
];
