import { VaAlert } from '../va-alert';

describe('va-alert', () => {

  it('fires an custom event when the component is loaded', async () => {
    const alert = new VaAlert();
    alert.vaComponentDidLoad = {emit:jest.fn()};
    alert.componentDidLoad();
    expect(alert.vaComponentDidLoad.emit).toHaveBeenCalled();
  });

});
