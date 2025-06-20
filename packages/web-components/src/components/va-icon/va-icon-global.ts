declare global {
    interface globalThis {
        setVaIconSpriteLocation?: (path: string) => void;
        getVaIconSpriteLocation?: () => string;
        [key: string]: any;
    }
}

export function initIconSpriteLocation() {
    const VA_ICON_SPRITE_PATH = '__VA_ICON_SPRITE_LOCATION__';

    globalThis.setVaIconSpriteLocation = (path: string) => {
        globalThis[VA_ICON_SPRITE_PATH] = path;
    };

    globalThis.getVaIconSpriteLocation = () => {
        return globalThis[VA_ICON_SPRITE_PATH] || './../img/sprite.svg';
    };
}
