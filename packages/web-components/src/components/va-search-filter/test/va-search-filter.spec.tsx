import { VaSearchFilter } from '../va-search-filter';

describe('validateFilterOptions', () => {
    const validOptions = [
        {
            label: "Benefits",
            id: 1,
            category: [
                { label: "Health Care", id: 2 },
                { label: "Education", id: 3 },
            ]
        }
    ];

    const invalidOptions1 = [
        {
            label: "Benefits", // missing id
            category: [
                { label: "Health Care", id: 2 },
                { label: "Education", id: 3 },
            ]
        }
    ];

    const invalidOptions2 = [
        {
            label: "Benefits",
            id: 1,
            category: [
                { label: "Health Care" }, // missing id
                { label: "Education", id: 3 },
            ]
        }
    ];

    const invalidOptions3 = [
        {
            label: "Benefits",
            id: 1,
            category: [] // missing categories
        }
    ];

    it('validates that filter facets have a label, id, and category array', () => {
        expect(VaSearchFilter.validateFilterOptions(validOptions)).not.toBeNull();
    })
    it('returns null for facet missing an id', () => {
        expect(VaSearchFilter.validateFilterOptions(invalidOptions1)).toBeNull();
    })
    it('returns null for category missing an id', () => {
        expect(VaSearchFilter.validateFilterOptions(invalidOptions2)).toBeNull();
    })
    it('returns null for facet missing a category array', () => {
        expect(VaSearchFilter.validateFilterOptions(invalidOptions3)).toBeNull();
    })
});

describe('getTotalActiveFiltersByFacet', () => {
    const activeFilters1 = {
        label: "Benefits",
        id: 1,
        category: [
            { label: "Health Care", id: 2, active: true },
            { label: "Education", id: 3, active: true },
        ]
    };

    const activeFilters2 = {
        label: "Benefits",
        id: 1,
        category: [
            { label: "Health Care", id: 2, active: false },
            { label: "Education", id: 3, active: false },
        ]
    };
    it('returns the total number of active filters by category', () => {
        expect(VaSearchFilter.getTotalActiveFiltersByFacet(activeFilters1)).toBe(2);
    })
    it('returns 0 for no active filters', () => {
        expect(VaSearchFilter.getTotalActiveFiltersByFacet(activeFilters2)).toBe(0);
    })
});

describe('getSrOnlyProp', () => {
    it('returns a singular or pluralized string based on the number of active filters', () => {
        expect(VaSearchFilter.getSrOnlyProp(1, 'headerSrOnly')).toEqual({ headerSrOnly: 'filter applied' });
        expect(VaSearchFilter.getSrOnlyProp(2, 'headerSrOnly')).toEqual({ headerSrOnly: 'filters applied' });
        expect(VaSearchFilter.getSrOnlyProp(0, 'headerSrOnly')).toEqual({});
    })
})
