import { setMode } from '@stencil/core';

setMode(elm => {
    return elm.getAttribute('uswds') === null ? 'uswds': 'default';
});