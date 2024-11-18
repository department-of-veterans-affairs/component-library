import { VaBanner } from '../va-banner';

// Functions are set to private however they will still run properly even with the TS error
describe('va-banner', () => {
  it('should add dismissed banners to local array', () => {
    let cmp = new VaBanner();
    cmp.headline = 'Test headline';
    cmp.el.innerHTML = 'This is test content';
    cmp.showClose = true;
    expect(cmp.dismissedBanners).toEqual([]);
    cmp["dismiss"]();
    expect(cmp.dismissedBanners).toEqual([
      'Test headline:This is test content',
    ]);
  });

  it('prepareBannerID should return back a string of both headline and slot content', () => {
    let cmp = new VaBanner();
    cmp.headline = 'Test headline';
    cmp.el.innerHTML = 'This is test content';
    expect(cmp["prepareBannerID"]()).toEqual('Test headline:This is test content');
  });
});
