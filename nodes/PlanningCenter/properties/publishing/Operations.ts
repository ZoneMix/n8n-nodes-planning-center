// nodes/PlanningCenter/properties/publishing/Operations.ts
export const publishingOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['publishing'],
			},
		},
		options: [
			{
				name: 'Create An Episode',
				value: 'createEpisode',
				action: 'Create an episode',
			},
			{
				name: 'Get A Channel',
				value: 'getChannel',
				action: 'Get a channel',
			},
			{
				name: 'Get Many Channels',
				value: 'deleteEpisode',
				action: 'Get many channels',
			},
		],
		default: 'createEpisode',
	},
];
