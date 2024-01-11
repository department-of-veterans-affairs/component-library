export const wrapAndAddClass = (slot, clss) => {
  const children = slot.assignedElements();
  const wrapper = children.at(-1);
  wrapper.classList.add(clss);
  wrapper.name = undefined;
  for (let i = 0, l = children.length - 1; i < l; i++) {
    wrapper.appendChild(children[i]);
  }
};

export const createNewBlankDiv = (el, nme, abortIf = []) => {
  if (abortIf.includes(nme)) {
    return;
  }
  const divElement = document.createElement('div');
  if (nme) {
    divElement.slot = nme;
  }
  el.appendChild(divElement);
};
