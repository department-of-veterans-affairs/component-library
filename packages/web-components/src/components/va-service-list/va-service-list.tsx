/* eslint-disable i18next/no-literal-string */
import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { consoleDevError } from '../../utils/utils';

/**
 * @componentName Service List
 * @maturityCategory caution
 * @maturityLevel candidate
 */
@Component({
  tag: 'va-service-list',
  styleUrl: 'va-service-list.scss',
  shadow: true,
})
export class VaServiceList {
  /** The name of the service */
  @Prop() serviceName: string;

  /**
    * The status of the service
    */
  @Prop() serviceStatus: string;
  @Prop() serviceDetails: any;  
  @Prop() icon: string;
  @Prop() action: any;
  @Prop() optionalLink: string;

  @State() parsedServiceDetails: any = {};
  @State() parsedAction: any = {};

  @Watch('serviceDetails')
  handleServiceDetailsChange(newValue: any) {
    if (!newValue) return;
    try {
      this.parsedServiceDetails = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
    } catch (error) {
      consoleDevError('Error parsing serviceDetails:');
      this.parsedServiceDetails = {};
    }
  }

  @Watch('action')
  handleActionChange(newValue: any) {
    if (!newValue) return;
    try {
      this.parsedAction = typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
    } catch (error) {
      console.error('Error parsing action:', error);
      this.parsedAction = {};
    }
  }

  componentWillLoad() {
    this.handleServiceDetailsChange(this.serviceDetails);
    this.handleActionChange(this.action);
  }

  render() {
    const { parsedServiceDetails, parsedAction, icon, serviceName, serviceStatus, optionalLink } = this;

    const serviceListItems = Object.entries(parsedServiceDetails).map(([key, value]) => (
      <li>
        <div>
          <strong>{key.toUpperCase()}:</strong> {value}
        </div>
      </li>
    ));

    const actionNeeded = serviceStatus === 'Eligible';

    return (
      <Host>
        <div class="service-list">
          <a href="/">
            <div class="header">
              <slot name="icon">
                <va-icon class="icon" size={3} icon={icon}></va-icon>
              </slot>
              <slot name="service-name">
                <h3 class="service-name">{serviceName}</h3>
              </slot>
              <va-icon class="chevron-icon" icon="chevron_right"></va-icon>
            </div>
          </a>

          {actionNeeded && (
            <div class="action-bar">
              <va-link-action type="secondary" href={parsedAction?.href} text={parsedAction?.text} />
            </div>
          )}

          <div class="status">
            <span class="usa-label">{serviceStatus}</span>
          </div>

          <ul class="service-list-items">{serviceListItems}</ul>

          {optionalLink && 
          <slot name="optional-link">
            <va-link href={optionalLink} text="Click here"></va-link>
          </slot>
          }
        </div>
      </Host>
    );
  }
}
