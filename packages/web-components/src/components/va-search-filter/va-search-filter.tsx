import { Component, Host, h, Prop, Event, EventEmitter, Listen, forceUpdate, State } from '@stencil/core';

export type FilterFacet = {
  label: string;
  category: FilterCategory[];
  index?: number;
  activeFiltersCount?: number;
};

export type FilterCategory = {
  label: string;
  active?: boolean;
};

export type Filter = FilterFacet;

interface FilterChangeParams {
  facetLabel: string;
  categoryLabel: string;
  active: boolean;
}

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
   */
  @Prop({ mutable: true }) filterOptions: Filter[] = [];

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

  /**
   * The total number of active filters which is updated when the filter changes.
   */
  @State() totalActiveFilters: number = 0;

  private handleFilterChange = ({ facetLabel, categoryLabel, active }: FilterChangeParams) => {
    // find the matching facetLabel and categoryLabel then update the active state of the category
    this.filterOptions = this.filterOptions.map((facet) => {
      if (facet.label === facetLabel) {
        return {
          ...facet,
          category: facet.category.map((category) => {
            if (category.label === categoryLabel) {
              return { ...category, active };
            }
            return category;
          }),
        };
      }
      return facet;
    });

    this.totalActiveFilters = this.getTotalActiveFilters()

    // update filterOptions with getTotalActiveFiltersByFacet for each facet
    this.filterOptions = this.filterOptions.map((facet) => {
      return {
        ...facet,
        activeFiltersCount: this.getTotalActiveFiltersByFacet(facet),
      };
    });

    // Emit the event with all active filters
    const allActiveFilters = this.getActiveFiltersWithCategories();
    this.vaFilterChange.emit(allActiveFilters);
  };

  /**
   * Get the total number of active filters across all categories.
   * @returns {number} The total number of active filters.
   */
  getTotalActiveFilters(): number {
    return this.getActiveFiltersWithCategories().reduce((acc: number, facet: FilterFacet) => acc + facet.category.length, 0);
  }

  /**
   * Get the active filters with their categories.
   * @returns {Filter[]} The active filters with their categories.
   */
  getActiveFiltersWithCategories(): Filter[] {
    return this.filterOptions
      .map(facet => ({
        ...facet,
        category: facet.category.filter(category => category.active === true)
      }))
      .filter(facet => facet.category.length > 0);
  }

  /**
   * Get the total number of active filters by category.
   * @returns {number} The total number of active filters by category.
   */
  getTotalActiveFiltersByFacet(facet: FilterFacet): number {
    return facet.category.filter(category => category.active === true).length;
  }

  render() {
    const {
      header,
      filterOptions,
      isDesktop,
      totalActiveFilters,
      handleFilterChange,
    } = this;

    if (isDesktop) {
      return (
        <Host>
          <h2 id="header">{header}{totalActiveFilters > 0 ? ` (${totalActiveFilters})` : ''}</h2>
          <va-accordion class="va-search-filter__accordion">
            {filterOptions.map((facet: FilterFacet, index: number) => (
              <va-accordion-item header={facet.label + (facet.activeFiltersCount > 0 ? ` (${facet.activeFiltersCount})` : '')} key={index} open>
                <va-checkbox-group label={facet.label} class="va-search-filter__checkbox-group">
                  {facet.category.map((category: FilterCategory, index: number) => (
                    <va-checkbox
                      label={category.label}
                      key={index}
                      onVaChange={(e) => handleFilterChange({
                        facetLabel: facet.label,
                        categoryLabel: category.label,
                        active: e.target.checked,
                      })}
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
          <va-accordion-item header={header + (totalActiveFilters > 0 ? ` (${totalActiveFilters})` : '')}>
            {filterOptions.map((facet: FilterFacet, index: number) => (
              <va-checkbox-group label={facet.label + (facet.activeFiltersCount > 0 ? ` (${facet.activeFiltersCount})` : '')} key={index}>
                {facet.category.map((category: FilterCategory, index: number) => (
                  <va-checkbox
                    label={category.label}
                    key={index}
                    onVaChange={(e) => handleFilterChange({
                      facetLabel: facet.label,
                      categoryLabel: category.label,
                      active: e.target.checked,
                    })}
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
