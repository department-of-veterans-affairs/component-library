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

  render() { 
    const {header, level, checkmark, active, pending} = this;
    // eslint-disable-next-line i18next/no-literal-string
    const HeaderTag = `h${level}`;
    const status = checkmark ? 'checkmark' : active ? 'active' : pending ? 'pending' : null;
    const statusTextMap = {
      checkmark: 'Complete',
      active: 'Active',
      pending: 'Pending'
    }
    
    return (
      <Host role="listitem" class='usa-process-list__item'>
        { status ?
          <div class="usa-process-list__heading-eyebrow">{statusTextMap[status]}</div>
          : null
        }
        {header ? <HeaderTag class='usa-process-list__heading'>{header}</HeaderTag> : null}
        <slot/>
      </Host>
    )
  }
}