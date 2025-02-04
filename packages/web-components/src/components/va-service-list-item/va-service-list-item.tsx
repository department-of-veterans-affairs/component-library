/* eslint-disable i18next/no-literal-string */
import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { consoleDevError } from '../../utils/utils';

export interface ServiceDetails {
  [key: string]: string;
}
export interface ServiceAction {
  href: string;
  text: string;
}
export interface OptionalLink {
  href: string;
  text: string;
}

/**
 * @componentName Service list item
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-service-list-item',
  styleUrl: 'va-service-list-item.scss',
  shadow: true,
})
export class VaServiceListItem {
  /** The name of the service */
  @Prop() serviceName: string;

  /** The heading level for the service name (defaults to h3) */
  @Prop() serviceNameHeadingLevel: string = 'h3';

  /** The link to the service page */
  @Prop() serviceLink: string;

  /** The status of the service */
  @Prop() serviceStatus: string;

  /** Details about the service */
  @Prop() serviceDetails: ServiceDetails | string;

  /** The icon associated with the service */
  @Prop() icon?: string;

  /** Action associated with the service  */
  @Prop() action?: ServiceAction | string;

  /** An optional link related to the service */
  @Prop() optionalLink?: OptionalLink | string;

  @State() parsedServiceDetails: ServiceDetails;
  @State() parsedAction?: ServiceAction;
  @State() parsedOptionalLink?: OptionalLink;


  @Watch('serviceDetails')
  handleServiceDetailsChange(newValue: ServiceDetails | string) {
    if (!newValue) return;
    try {
      this.parsedServiceDetails =
        typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
    } catch (error) {
      consoleDevError('Error parsing serviceDetails');
    }
  }

  @Watch('action')
  handleActionChange(newValue?: ServiceAction | string) {
    if (!newValue) return;
    try {
      this.parsedAction =
        typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
    } catch (error) {
      consoleDevError('Error parsing action');
    }
  }

  @Watch('optionalLink')
  handleOptionalLinkChange(newValue?: OptionalLink | string) {
    if (!newValue) return;
    try {
      this.parsedOptionalLink =
        typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
    } catch (error) {
      consoleDevError('Error parsing optionalLink');
    }
  }

  componentWillLoad() {
    this.handleServiceDetailsChange(this.serviceDetails);
    this.handleActionChange(this.action);
    this.handleOptionalLinkChange(this.optionalLink);
  }

  render() {
    const {
      parsedServiceDetails,
      parsedAction,
      parsedOptionalLink,
      icon,
      serviceName,
      serviceNameHeadingLevel,
      serviceLink,
      serviceStatus,
    } = this;

    const serviceListItems = Object.entries(parsedServiceDetails).map(
      ([key, value]) => (
        <li>
          <div>
            <strong>{key}:</strong> {value}
          </div>
        </li>
      ),
    );

    const actionNeeded = parsedAction?.href && parsedAction?.text;
    const HeadingTag = serviceNameHeadingLevel as keyof JSX.IntrinsicElements;

    return (
      <Host>
        <div class="service-list">
          <a href={serviceLink} class="service-title-row">
            <div class="header">
              {icon && (
                  <va-icon
                    class={`icon ${icon}`}
                    size={3}
                    icon={icon}
                  ></va-icon>
              )}
              <HeadingTag class="service-name">{serviceName}</HeadingTag>
              <va-icon class="chevron-icon" icon="chevron_right"></va-icon>
            </div>
          </a>

          {actionNeeded && (
            <div class="action-bar">
              <va-link-action
                type="secondary"
                href={parsedAction?.href}
                text={parsedAction?.text}
              />
            </div>
          )}

          <div class="status">
            <span class="usa-label">{serviceStatus}</span>
          </div>

          <ul class="service-list-items">{serviceListItems}</ul>

          {parsedOptionalLink?.href && parsedOptionalLink?.text && (
              <va-link
                href={parsedOptionalLink.href}
                text={parsedOptionalLink.text}
              ></va-link>
          )}
        </div>
      </Host>
    );
  }
}
