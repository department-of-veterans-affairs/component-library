import { Component, Host, h, Prop, Event, EventEmitter, Listen, forceUpdate } from '@stencil/core';

export type FilterFacet = {
  label: string;
  category: FilterCategory[];
  index?: number;
};

export type FilterCategory = {
  label: string;
};

export type Filter = FilterFacet;

@Component({
  tag: 'va-search-filter',
  styleUrl: 'va-search-filter.scss',
  shadow: true,
})
export class VaSearchFilter {

  /**
   * The filter header text.
   */
  @Prop() header: string = 'Filters';

  /**
   * Represents a list of filter facets and their categories.
   * Use a JSON array of objects with label properties.
   * Wrap in a string if not using the React-binding version of the web component.
   */
  @Prop() filterOptions: Filter[] = [];

  /**
   * A custom event emitted when the filter changes. The payload will provide all active categories.
   */
  @Event() vaFilterChange : EventEmitter<Filter[]>;

  @Listen('resize', { target: 'window' })
  handleResize() {
    // Corresponds with the --tablet breakpoint size.
    // https://design.va.gov/foundation/breakpoints
    this.isDesktop = window.innerWidth > 640;
    forceUpdate(this);
  }

  private isDesktop: boolean = window.innerWidth > 640;

  render() {
    const {
      header,
      filterOptions,
      isDesktop,
    } = this;

    if (isDesktop) {
      return (
        <Host>
          <h2 id="header">{header}</h2>
          <va-accordion class="va-search-filter__accordion">
            {filterOptions.map((facet: FilterFacet, index: number) => (
              <va-accordion-item header={facet.label} key={index}>
                <va-checkbox-group label={facet.label} class="va-search-filter__checkbox-group">
                  {facet.category.map((category: FilterCategory, index: number) => (
                    <va-checkbox
                      label={category.label}
                      key={index}
                    />
                  ))}
                </va-checkbox-group>
              </va-accordion-item>
            ))}
          </va-accordion>
        </Host>
      );
    }

    return (
      <Host>
        <va-accordion class="va-search-filter__accordion">
          <va-accordion-item header={header}>
            {filterOptions.map((facet: FilterFacet, index: number) => (
              <va-checkbox-group label={facet.label} key={index}>
                {facet.category.map((category: FilterCategory, index: number) => (
                  <va-checkbox
                    label={category.label}
                    key={index}
                  />
                ))}
              </va-checkbox-group>
            ))}
          </va-accordion-item>
        </va-accordion>
      </Host>
    );
  }
}
