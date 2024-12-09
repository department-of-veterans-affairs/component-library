export default {
  name: 'mainTag',

  lookup(options) {
    const mainTag = document.querySelector('main');

    return mainTag?.getAttribute('lang');
  },
};
