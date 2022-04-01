export default {
  name: 'contentElementTag',

  lookup(options) {
    const contentContainer = document.getElementById('content');

    // if(htmlTag && typeof htmlTag.getAttribute === 'function') {
    //   found = htmlTag.getAttribute('lang');
    // }

    return contentContainer?.getAttribute('lang');
  },
};
