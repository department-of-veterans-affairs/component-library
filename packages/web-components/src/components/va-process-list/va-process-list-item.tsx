import {
    Component,
    Host,
    Prop,
    h,
  } from '@stencil/core';

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
  @Prop() level?: number = 3;

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

  /**
  * Whether or not the component will use USWDS v3 styling.
  */
  @Prop() uswds?: boolean = false;

  render() { 
    const {uswds, header, level} = this;
    // eslint-disable-next-line i18next/no-literal-string
    const HeaderTag = `h${level}`;
    
    if (uswds) { 
      return (
        <Host role="listitem" class='usa-process-list__item'>
            <HeaderTag class='usa-process-list__heading'>{header}</HeaderTag>
            <slot/>
        </Host>
      )
    } else {
      return (
        <li>
          <HeaderTag>{header}</HeaderTag>
          <slot/>
        </li>
      )
    }
  }
}