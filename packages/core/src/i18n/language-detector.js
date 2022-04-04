export default {
  name: 'contentElementTag',

  lookup(options) {
    console.log('DETECTING LANGUAGE', options);
    const contentContainer = document.getElementById('content');

    // if(htmlTag && typeof htmlTag.getAttribute === 'function') {
    //   found = htmlTag.getAttribute('lang');
    // }
    console.log('CONTENT', contentContainer);
    console.log('DOC', document);

    return contentContainer?.getAttribute('lang');
  },
};
