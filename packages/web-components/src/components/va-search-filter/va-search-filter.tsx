import { Component, Host, h, Prop, Event, EventEmitter, Listen, forceUpdate, State, Watch } from '@stencil/core';
import { deepEquals } from '../../utils/utils';
// import { VaRadioOption } from '../va-radio-option/va-radio-option';

export type FilterFacet = {
  label: string;
  category: FilterCategory[];
  id?: number | string;
  activeFiltersCount?: number;
  isRadio?: boolean;
};

export type FilterCategory = {
  label: string;
  active?: boolean;
  id?: number | string;
};

export type Filter = FilterFacet;

interface FilterChangeParams {
  facetId: number | string;
  categoryId: number | string;
  active: boolean;
}

/**
 * Value corresponds with the --tablet breakpoint size.
 * https://design.va.gov/foundation/breakpoints
 */
const TABLET_BREAKPOINT = 640;

/**
 * @componentName Search Filter
 * @maturityCategory caution
 * @maturityLevel candidate
 */
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
   * Use a JSON array of objects with label and id properties.
   */
  @Prop({ mutable: true }) filterOptions: Filter[] = [];

  /**
   * The total number of active filters which is updated when the filter changes.
   */
  @State() totalActiveFilters: number = 0;

  /**
   * Watch for changes to filterOptions and update totalActiveFilters
   */
  @Watch('filterOptions')
  filterOptionsChanged(newValue: Filter[]) {
    if (newValue && newValue.length > 0) {
      this.totalActiveFilters = this.getTotalActiveFilters();

      // Update activeFiltersCount for each facet without triggering the watcher again
      const updatedOptions = newValue.map((facet) => {
        return {
          ...facet,
          activeFiltersCount: VaSearchFilter.getTotalActiveFiltersByFacet(facet),
        };
      });

      // Only update if there's a difference to avoid infinite recursion
      const needsUpdate = !deepEquals(updatedOptions, this.filterOptions);
      if (needsUpdate) {
        this.filterOptions = updatedOptions;
      }
    }
  }

  /**
   * A custom event emitted when the filter changes. The payload will provide all active categories.
   */
  @Event() vaFilterChange: EventEmitter<Filter[]>;

  /**
   * A custom event emitted when the apply filters button is clicked.
   */
  @Event() vaFilterApply: EventEmitter<Filter[]>;

  /**
   * A custom event emitted when the clear all filters button is clicked.
   */
  @Event() vaFilterClearAll: EventEmitter<void>;

  @Listen('resize', { target: 'window' })
  handleResize() {
    this.isDesktop = window.innerWidth > TABLET_BREAKPOINT;
    forceUpdate(this);
  }

  private isDesktop: boolean = window.innerWidth > TABLET_BREAKPOINT;

  private handleFilterChange = ({ facetId, categoryId, active }: FilterChangeParams) => {
    // find the matching facet and category by ID and update the active state
    this.filterOptions = this.filterOptions.map((facet) => {
      if (facet.id === facetId) {
        return {
          ...facet,
          category: facet.category.map((category) => {
            if (category.id === categoryId) {
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
        activeFiltersCount: VaSearchFilter.getTotalActiveFiltersByFacet(facet),
      };
    });

    // Emit the event with all active filters
    this.vaFilterChange.emit(this.getActiveFiltersWithCategories());
  };

  handleClearAllFilters = () => {
    this.filterOptions = this.filterOptions.map((facet) => {
      const updatedFacet = {
        ...facet,
        category: facet.category.map((category) => ({ ...category, active: false })),
      };
      return {
        ...updatedFacet,
        activeFiltersCount: 0,
      };
    });

    this.totalActiveFilters = 0;

    // Emit event to signal that all filters have been cleared.
    this.vaFilterClearAll.emit();
  };

  handleApplyFilters = () => {
    this.vaFilterApply.emit(this.getActiveFiltersWithCategories());
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
   * Returns a component prop for appending screen reader text to the filter header or label
   * @param count The number of active filters
   * @param prop The component property name
   * @returns 
   */
  static getSrOnlyProp(count: number, prop: string) {
    return count > 0 ? { [prop]: `${count === 1 ? 'filter' : 'filters'} applied` } : {};
  }

  /**
   * Get the total number of active filters by category.
   * @returns {number} The total number of active filters by category.
   */
  static getTotalActiveFiltersByFacet(facet: FilterFacet): number {
    return facet.category.filter(category => category.active === true).length;
  }

  /**
   * Validates the filter options structure and returns the validated options.
   * @param options The filter options to validate.
   * @returns The validated filter options or null if validation fails.
   */
  static validateFilterOptions(options: Filter[] | string): Filter[] | null {
    if (typeof options === 'string') {
      try {
        options = JSON.parse(options);
      } catch (e) {
        console.error('Error parsing filterOptions:', e);
        return null;
      }
    }

    if (!Array.isArray(options)) {
      console.error('filterOptions must be an array');
      return null;
    }

    /**
     * Checks that the top-level facet:
     * - Has a valid label (string and non-empty)
     * - Has a valid ID (number or string)
     * - Has a category array
     * Checks that each facet category item:
     * - Has a valid label (string and non-empty)
     * - Has a valid ID (number or string)
     */
    const validOptions = options.every(option => {
      const hasValidLabel = typeof option.label === 'string' && option.label.length > 0;
      const hasValidCategory = Array.isArray(option.category) && option.category.length > 0 && option.category.every(cat => {
        const hasValidCatLabel = typeof cat.label === 'string' && cat.label.length > 0;
        const hasValidCatId = typeof cat.id === 'number' || typeof cat.id === 'string';
        return hasValidCatLabel && hasValidCatId;
      });
      const hasValidId = typeof option.id === 'number' || typeof option.id === 'string';
      return hasValidLabel && hasValidCategory && hasValidId;
    });

    return validOptions ? options : null;
  }

  /**
   * This method is invoked once before the component is first rendered.
   * Its main purpose is to validate and set initial active filter counts.
   */
  componentWillLoad() {
    if (!this.filterOptions?.length) return;

    const validatedOptions = VaSearchFilter.validateFilterOptions(this.filterOptions);

    if (validatedOptions) {
      // update filterOptions with validated options and initial active filter counts.
      this.totalActiveFilters = this.getTotalActiveFilters();
      this.filterOptions = validatedOptions.map((facet) => {
        return {
          ...facet,
          activeFiltersCount: VaSearchFilter.getTotalActiveFiltersByFacet(facet),
        };
      });
    } else {
      this.filterOptions = [];
    }
  }

  render() {
    const {
      header,
      filterOptions,
      isDesktop,
      totalActiveFilters,
      handleFilterChange,
      handleClearAllFilters,
      handleApplyFilters,
    } = this;

    // Helper method to render filter buttons for both mobile and desktop views
    const filterButtons = (
      <div id="filter-buttons">
        <va-button
          onClick={handleApplyFilters}
          text="Apply filters"
          full-width
        />
        <va-button
          onClick={handleClearAllFilters}
          text="Clear all filters"
          secondary
          full-width
        />
      </div>
    );

    // Helper method to render checkbox for both mobile and desktop views
    const renderCheckbox = (facet: FilterFacet, category: FilterCategory) => (
      <va-checkbox
        label={category.label}
        key={category.id}
        checked={category.active}
        onVaChange={(e) => handleFilterChange({
          facetId: facet.id,
          categoryId: category.id,
          active: e.target.checked,
        })}
      />
    );

    // Helper method to render checkbox for both mobile and desktop views
    const renderRadioButton = (category: FilterCategory) => {
      return <va-radio-option
        label={category.label}
        name={category.label}
        value={category.id.toString()}
      />
    };

    const renderFacet = (facet: FilterFacet) => {
      // if (facet.isRadio === true) {
      //   console.log("Blah blah blah");
      // }
      if (facet.isRadio === true) {
        if (isDesktop) {
          return <va-radio
            error={null}
            header-aria-describedby={null}
            hint=""
            label={facet.label}
            label-header-level=""
          >
            {facet.category.map((category: FilterCategory) =>
              renderRadioButton(category))}
          </va-radio>
        }
        else {
          return <va-radio
            error={null}
            header-aria-describedby={null}
            hint=""
            label={facet.label}
            label-header-level=""
          >
            {facet.category.map((category: FilterCategory) =>
              renderRadioButton(category))}
          </va-radio>
        }
      }
      else {
        if (isDesktop) {
          return <va-checkbox-group
            label={facet.label}
            class="va-search-filter__checkbox-group"
          >
            {facet.category.map((category: FilterCategory) =>
              renderCheckbox(facet, category))}
          </va-checkbox-group>
        }
        else {
          return <va-checkbox-group
            label={facet.label + (facet.activeFiltersCount > 0 ? ` (${facet.activeFiltersCount})` : '')}
            {...VaSearchFilter.getSrOnlyProp(facet.activeFiltersCount, 'labelSrOnly')}
            key={facet.id}
            label-header-level="3"
          >
            {facet.category.map((category: FilterCategory) =>
              renderCheckbox(facet, category))}
          </va-checkbox-group>
        }
      }
    };

    if (isDesktop) {
      return (
        <Host>
          <h2 id="header">{header}{totalActiveFilters > 0 ? ` (${totalActiveFilters})` : ''}
            {totalActiveFilters > 0 && (
              <span class="usa-sr-only">&nbsp;applied</span>
            )}
          </h2>
          {filterOptions.length > 0 && (
            <va-accordion class="va-search-filter__accordion">
              {filterOptions.map((facet: FilterFacet) => (
                <va-accordion-item
                  header={facet.label + (facet.activeFiltersCount > 0 ? ` (${facet.activeFiltersCount})` : '')}
                  {...VaSearchFilter.getSrOnlyProp(facet.activeFiltersCount, 'headerSrOnly')}
                  key={facet.id}
                  level={3}
                  open
                >
                  {renderFacet(facet)}
                </va-accordion-item>
              ))}
            </va-accordion>
          )}
          {filterButtons}
        </Host>
      );
    }

    return (
      <Host>
        {filterOptions.length > 0 && (
          <va-accordion class="va-search-filter__accordion">
            <va-accordion-item
              header={header + (totalActiveFilters > 0 ? ` (${totalActiveFilters})` : '')}
              headerSrOnly="applied"
              open
            >
              <span slot="icon"><va-icon icon="filter_list" /></span>
              {filterOptions.map((facet: FilterFacet) => (
                renderFacet(facet)
              ))}
              {filterButtons}
            </va-accordion-item>
          </va-accordion>
        )}
      </Host>
    );
  }
}
