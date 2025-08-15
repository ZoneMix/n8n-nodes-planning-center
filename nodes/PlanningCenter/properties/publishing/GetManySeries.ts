// nodes/PlanningCenter/properties/publishing/GetManySeries.ts
export const getManySeriesProperties = [
    {
        displayName: 'Search',
        name: 'search',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['publishing'],
                operation: ['getManySeries'],
            },
        },
        default: '',
        description: 'Search for series by name',
    },
    {
        displayName: 'Return All',
        name: 'returnAll',
        type: 'boolean',
								description: 'Whether to return all results or only up to a given limit',
        displayOptions: {
            show: {
                resource: ['publishing'],
                operation: ['getManySeries'],
            },
        },
        default: false,
    },
    {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['publishing'],
                operation: ['getManySeries'],
                returnAll: [false],
            },
        },
        typeOptions: {
            minValue: 1,
        },
        default: 50,
        description: 'Max number of results to return',
    },
    {
        displayName: 'Additional Query Parameters',
        name: 'additionalFilters',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['publishing'],
                operation: ['getManySeries'],
            },
        },
        default: '',
        placeholder: 'order=name,include=episodes',
    },
];
