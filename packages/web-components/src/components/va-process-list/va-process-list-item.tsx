import {
    Component,
    Host,
    Prop,
    h,
  } from '@stencil/core';
import { getHeaderLevel } from '../../utils/utils';

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

  /**
  * Text to display in the eyebrow of an item if active, pending, or checkmark is true. Defaults to "Active", "Pending", or "Complete"
  */
  @Prop() statusText?: string;

  render() { 
    const {header, level, checkmark, active, pending, statusText} = this;
    // eslint-disable-next-line i18next/no-literal-string
    const HeaderLevel = getHeaderLevel(level);
    const status = checkmark ? 'checkmark' : active ? 'active' : pending ? 'pending' : null;
    const statusTextMap = {
      checkmark: statusText || 'Complete',
      active: statusText || 'Active',
      pending: statusText || 'Pending'
    }
    
    return (
      <Host role="listitem" class='usa-process-list__item'>
        { status ?
          <div class="usa-process-list__heading-eyebrow">{statusTextMap[status]}</div>
          : null
        }
        {header ? <HeaderLevel part="header" class='usa-process-list__heading'>{header}</HeaderLevel> : null}
        <slot/>
      </Host>
    )
  }
}