// nodes/PlanningCenter/properties/publishing/GetSeries.ts
export const getSeriesProperties = [
    {
        displayName: 'Series Name or ID',
        name: 'seriesId',
        type: 'options',
        typeOptions: {
            loadOptionsMethod: 'getSeries',
        },
        required: true,
        displayOptions: {
            show: {
                resource: ['publishing'],
                operation: ['getSeries'],
            },
        },
        default: '',
        description: 'ID of the series. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    },
    {
        displayName: 'Additional Query Parameters',
        name: 'additionalFilters',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['publishing'],
                operation: ['getSeries'],
            },
        },
        default: '',
        placeholder: 'include=episodes',
    },
];
