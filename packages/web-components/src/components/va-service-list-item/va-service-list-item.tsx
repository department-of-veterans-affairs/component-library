/* eslint-disable i18next/no-literal-string */
import { Component, Host, h, Prop, Watch, State, Element } from '@stencil/core';
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
  @Element() el: HTMLElement;

  /** The name of the service */
  @Prop() serviceName: string;

  /** The heading level for the service name (defaults to h3) */
  @Prop() serviceNameHeadingLevel?: number = 3;

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
    this.parsedServiceDetails = this.parseJsonProp(newValue);
  }

  @Watch('action')
  handleActionChange(newValue?: ServiceAction | string) {
    this.parsedAction = this.parseJsonProp(newValue);
  }

  @Watch('optionalLink')
  handleOptionalLinkChange(newValue?: OptionalLink | string) {
    this.parsedOptionalLink = this.parseJsonProp(newValue);
  }

  componentWillLoad() {
    this.parsedServiceDetails = this.parseJsonProp(this.serviceDetails);
    this.parsedAction = this.parseJsonProp(this.action);
    this.parsedOptionalLink = this.parseJsonProp(this.optionalLink);
  }

  private parseJsonProp<T>(prop: any): T | undefined {
    if (!prop || prop === '{}' || prop === 'null') return undefined;

    try {
      return typeof prop === 'string' ? JSON.parse(prop) : prop;
    } catch (error) {
      consoleDevError(`Error parsing prop: ${prop}`);
      return undefined;
    }
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

    const serviceDetailsList = parsedServiceDetails
      ? Object.entries(parsedServiceDetails).map(([key, value]) => (
          <li>
            <div>
              <strong>{key}:</strong> {value}
            </div>
          </li>
        ))
      : null;

    const actionNeeded = !!parsedAction?.href && !!parsedAction?.text;
    const HeadingTag =
      `h${serviceNameHeadingLevel}` as keyof JSX.IntrinsicElements;
    const validIcons = new Set([
      'star',
      'work',
      'description',
      'school',
      'groups',
      'medical_services',
      'home',
      'shield',
      'handshake',
      'identification',
      'flag',
    ]);
    const iconClass = validIcons.has(icon) ? `icon ${icon}` : 'icon default';

    return (
      <Host>
        <div class="service-list-item">
          <a
            href={serviceLink}
            class="service-title-row"
            aria-label={`Go to ${serviceName}`}
          >
            <div class="header" tabIndex={0}>
              {icon && (
                <va-icon class={iconClass} icon={icon} size={3}></va-icon>
              )}
              <div class="name-and-chevron">
                <HeadingTag class="service-name">{serviceName}</HeadingTag>
                <va-icon
                  class="chevron-icon"
                  icon="chevron_right"
                  size={4}
                ></va-icon>
              </div>
            </div>
          </a>

          {actionNeeded && (
            <va-alert-critical
              link={parsedAction.href}
              text={parsedAction.text}
            ></va-alert-critical>
          )}

          <div class="status">
            <span class="usa-label">{serviceStatus}</span>
          </div>

          <ul class="service-details-list">{serviceDetailsList}</ul>

          {parsedOptionalLink?.href && parsedOptionalLink?.text && (
            <va-link
              class="optional-link"
              href={parsedOptionalLink.href}
              text={parsedOptionalLink.text}
            ></va-link>
          )}
        </div>
      </Host>
    );
  }
}
