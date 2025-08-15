// nodes/PlanningCenter/properties/publishing/GetManyEpisodes.ts
export const getManyEpisodesProperties = [
	{
		displayName: 'Search',
		name: 'search',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['getManyEpisodes'],
			},
		},
		default: '',
		description: 'Search for episodes by title or description',
	},
	{
		displayName: 'Series Name or ID',
		name: 'seriesId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getSeries',
			loadOptionsDependsOn: [],
		},
		options: [
			{
				name: 'Series',
				value: '',
			},
		],
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['getManyEpisodes'],
			},
		},
		default: '',
		description:
			'Filter by series ID. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Services Plan Remote Identifier',
		name: 'servicesPlanRemoteIdentifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['getManyEpisodes'],
			},
		},
		default: '',
		description: 'Filter by services plan remote identifier',
	},
	{
		displayName: 'Services Service Type Remote Identifier',
		name: 'servicesServiceTypeRemoteIdentifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['getManyEpisodes'],
			},
		},
		default: '',
		description: 'Filter by services service type remote identifier',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['getManyEpisodes'],
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
				operation: ['getManyEpisodes'],
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
				operation: ['getManyEpisodes'],
			},
		},
		default: '',
		placeholder: 'order=title,include=series',
	},
];
