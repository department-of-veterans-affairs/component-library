import {
    Component,
    Host,
    Prop,
    h,
  } from '@stencil/core';

// Shadow DOM turned off so the va-process-list has visibility into component and can apply styles
@Component({
  tag: 'va-process-list-item',
  styleUrl: 'va-process-list-item.scss',
  shadow: false,
})

export class VaProcessListItem {
  /**
  * The process list item header text
  */
  @Prop() header?: string;

  /**
  * Header level for item header. Must be between 1 and 6
  */
  @Prop() level?: number = 4;

  /**
  * Whether or not the item is active
  */
  @Prop() active?: boolean = false;
    
  /**
  * Whether or not the item is pending
  */
  @Prop() pending?: boolean = false;
 
  /**
  * Whether or not the item should display the checkmark icon
  */
  @Prop() checkmark?: boolean = false;

  render() { 
    const {header, level} = this;
    // eslint-disable-next-line i18next/no-literal-string
    const HeaderTag = `h${level}`;
    
    return (
      <Host role="listitem" class='usa-process-list__item'>
        {header ? <HeaderTag class='usa-process-list__heading'>{header}</HeaderTag> : null}
        <slot/>
      </Host>
    )
  }
}