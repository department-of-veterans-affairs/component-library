import { VaIcon } from '../va-icon';

describe('VaIcon.validateSpriteLocation', () => {
  let vaIcon: VaIcon;

  beforeEach(() => {
    vaIcon = new VaIcon();
  });

  it('returns the default sprite path for unsafe absolute path', () => {
    expect(vaIcon['validateSpriteLocation']('http://evil.com/evil.svg')).toBe('/img/sprite.svg');
  });

  it('returns the default sprite path for unsafe relative path with ..', () => {
    expect(vaIcon['validateSpriteLocation']('/img/../secret.svg')).toBe('/img/sprite.svg');
  });

  it('returns the default sprite path for non-svg file', () => {
    expect(vaIcon['validateSpriteLocation']('/img/sprite.png')).toBe('/img/sprite.svg');
  });

  it('returns the default sprite path for invalid URL', () => {
    expect(vaIcon['validateSpriteLocation']('::::not-a-url::::')).toBe('/img/sprite.svg');
  });

  it('returns the path for a safe, same-origin svg', () => {
    expect(vaIcon['validateSpriteLocation']('/img/test.svg')).toBe('/img/test.svg');
  });

  it('returns the path for a safe, same-origin svg with query', () => {
    expect(vaIcon['validateSpriteLocation']('/img/test.svg?version=1')).toBe('/img/test.svg');
  });

  it('returns the path for a safe, same-origin svg with hash', () => {
    expect(vaIcon['validateSpriteLocation']('/img/test.svg#icon')).toBe('/img/test.svg');
  });
});
