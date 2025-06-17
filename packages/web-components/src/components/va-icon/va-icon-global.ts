export function initIconSpriteLocation() {
    const VA_ICON_SPRITE_PATH = '__VA_ICON_SPRITE_LOCATION__';

    (globalThis as any).setVaIconSpriteLocation = (path: string) => {
    (globalThis as any)[VA_ICON_SPRITE_PATH] = path;
    }

    (globalThis as any).getVaIconSpriteLocation = () => {
    return (globalThis as any)[VA_ICON_SPRITE_PATH] || './../img/sprite.svg';
    }
  
}
