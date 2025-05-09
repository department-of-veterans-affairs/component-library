/**
 * Calculates the interior width of an element in pixels (total width minus border and padding).
 * 
 * @param element - The HTML element to measure
 * @returns The interior width in pixels
 */
export function getInteriorWidth(element: HTMLElement): number | null {
  if (!element) return null;

  const computedStyle = window.getComputedStyle(element);

  // Get total width including padding and border
  const totalWidth = element.clientWidth;

  // Subtract padding
  const paddingLeft = parseFloat(computedStyle.paddingLeft);
  const paddingRight = parseFloat(computedStyle.paddingRight);

  // Subtract border
  const borderLeft = parseFloat(computedStyle.borderLeftWidth);
  const borderRight = parseFloat(computedStyle.borderRightWidth);

  const interiorWidth = totalWidth - paddingLeft - paddingRight - borderLeft - borderRight;

  return interiorWidth;
}