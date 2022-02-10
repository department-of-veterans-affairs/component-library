import { VaBanner } from '../va-banner';

// Functions are set to private however they will still run properly even with the TS error
describe('va-banner', () => {
  it('should add dismissed banners to local array', async () => {
    let cmp = new VaBanner();
    cmp.headline = 'Test headline';
    cmp.el.innerHTML = 'This is test content';
    cmp.showClose = true;
    expect(cmp.dismissedBanners).toEqual([]);
    await cmp.dismiss();
    expect(await cmp.dismissedBanners).toEqual([
      'Test headline:This is test content',
    ]);
  });

  it('should fire an analytics event when banner is dismissed', () => {
    let cmp = new VaBanner();
    cmp.showClose = true;
    cmp.headline = 'Test headline';
    cmp.el.innerHTML = 'This is test content';
    const spy = jest.spyOn(cmp.componentLibraryAnalytics, 'emit');
    cmp.dismiss();
    expect(spy).toHaveBeenCalled();
  });

  it('prepareBannerID should return back a string of both headline and slot content', () => {
    let cmp = new VaBanner();
    cmp.headline = 'Test headline';
    cmp.el.innerHTML = 'This is test content';
    expect(cmp.prepareBannerID()).toEqual('Test headline:This is test content');
  });
});
