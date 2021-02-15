export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function getSlottedNodes(root: HTMLElement, nodeName: string): Array<Node> {
  return root.shadowRoot
    .querySelector('slot')
    .assignedNodes()
    .filter(item => item.nodeName.toLowerCase() === nodeName.toLowerCase());
}
