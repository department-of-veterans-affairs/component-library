
/** TargetElement = [CSS selector, intended attribute value, ?? shallow application option] */
type TargetElement = [string, string] | [string, string, boolean];

export interface SlotTarget{
    slotName: string,
    wrapperClass ?: string, 
    selectorClasses ? : TargetElement[],
    selectorId ? : TargetElement[],
  };
  

/** 
 * Will iterate though the array of slotTargets, applying the attribute value [1] as a class, 
 * to all matching selectors [0]; if the slotTarget also contains a 3rd item (shallow application)
 * the function will NOT apply the classes to any descendants
 * If the slot target has an optional wrapperClass provided: if the slot is passed more than one element, or 
 * if the one child element is not a DIV, the function will create a DIV element with the provided class
 * if the one child is a div it will add the optional class to it. 
 */
export function iterateAddAttrs(targetingArray:SlotTarget[], shadow:ShadowRoot) : null
{
    targetingArray.forEach((slot:SlotTarget) => {
        const slotSelector:string = slot.slotName ? `slot[name=${slot.slotName}]` : 'slot:not([name])';
        const theSlotEl:HTMLSlotElement = shadow.querySelector(slotSelector);
        if (slot.wrapperClass) {
            const childCount = theSlotEl.assignedElements().length; 
            if (childCount >= 1) {
                const firstEl:Element = theSlotEl.assignedElements()[0];
                const firstTag:string|null = firstEl?.tagName.toUpperCase();
                /** This makes the assumption that if there is only one slotted element 
                 * AND it's a div, that the VFS team has wrapped the content in said div
                 */
                if (firstTag !== "DIV" || childCount > 1) { 
                   wrapSlotElements(theSlotEl, slot.wrapperClass); 
                }
                if (firstTag === "DIV" && childCount == 1) {
                    firstEl.classList.add(slot.wrapperClass); 
                }
            } 
        }  
        if (slot.selectorClasses) {
            slot.selectorClasses.forEach((tuple:TargetElement) => {
                addClassToSlottedElements(theSlotEl,tuple[0],tuple[1], tuple[2]||false);
            });
        }
        if (slot.selectorId) {
            slot.selectorId.forEach((tuple:TargetElement) => {
                addIdToSlottedElements(theSlotEl,tuple[0],tuple[1], tuple[2]||false )
            });
        }
    });
    return;
}

/** Applies classes as described in iterateAddAttrs */
export function addClassToSlottedElements(slotEl:HTMLSlotElement, selector:string, theClass:string, shallow:boolean) : null {
   const els:Element[] = slotEl.assignedElements();
   if (els && els.length) { 
       els.forEach((el:HTMLElement) => {
            if (el.matches(selector)) { 
                el.classList.add(theClass);
            }
            if (!shallow) {
                const subEls:NodeListOf<HTMLElement> = el.querySelectorAll(selector);
                subEls.forEach((subEl:HTMLElement) => subEl.classList.add(theClass))
            }
       }); 
   }
   return;
}

/** Applies IDs as described in iterateAddAttrs */
export function addIdToSlottedElements(slotEl:HTMLSlotElement, selector:string, theId:string, shallow:boolean) : null {
   const els:Element[] = slotEl.assignedElements();
   if (els && els.length) {
       for (let i = 0; i < els.length; i++) {
           const el:Element = els[i];
           if (el.matches(selector)) { 
               el.id = theId;
               break; 
           }
           if (!shallow) {
                const subEl:HTMLElement = el.querySelector(selector) ;
                if (subEl) {
                    subEl.id = theId;
                    break;
                }
            }
       }
   }
   return;
}

/** Creates a new div element, adds the class 
 * and corresponding slot.name to it, 
 * appends it to the list returned by slot.assignedElements()
 * removes the slot attribute from all siblings 
 * and moves them into  the newly created div
 */
export function wrapSlotElements(slot:HTMLSlotElement, aClass:string ) : null{
    const children:Element[] = slot.assignedElements();
    const wrapper:HTMLElement = document.createElement('div');
    if (slot.name) { wrapper.slot = slot.name };
    children.at(-1).after(wrapper);
    wrapper.classList.add(aClass);
    for (let i = 0; i < children.length; i++) { 
        children[i].removeAttribute('slot');
        wrapper.appendChild(children[i]);
   }
   return; 
}
