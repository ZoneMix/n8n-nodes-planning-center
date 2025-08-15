// nodes/PlanningCenter/properties/publishing/GetChannel.ts
export const getChannelProperties = [
	{
		displayName: 'Channel Name or ID',
		name: 'channelId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getChannels',
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['getChannel'],
			},
		},
		default: '',
		description: 'ID of the channel. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Additional Query Parameters',
		name: 'additionalFilters',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['getChannel'],
			},
		},
		default: '',
		placeholder: 'include=episodes',
	},
];
