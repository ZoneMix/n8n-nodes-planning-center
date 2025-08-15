// nodes/PlanningCenter/properties/publishing/CreateEpisode.ts
export const createEpisodeProperties = [
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
				operation: ['createEpisode'],
			},
		},
		default: '',
		description:
			'ID of the channel to publish the episode to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Series Name or ID',
		name: 'seriesId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getSeries',
		},
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['createEpisode'],
			},
		},
		default: '',
		description:
			'ID of the series the episode belongs to. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['createEpisode'],
			},
		},
		default: '',
		description: 'Title of the episode',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['createEpisode'],
			},
		},
		default: '',
		description: 'Description of the episode',
	},
	{
		displayName: 'Stream Type',
		name: 'streamType',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['createEpisode'],
			},
		},
		default: '',
		description: 'Type of stream for the episode',
	},
	{
		displayName: 'Video URL',
		name: 'videoUrl',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['createEpisode'],
			},
		},
		default: '',
		description: 'URL of the video for the episode',
	},
	{
		displayName: 'Published To Library At',
		name: 'publishedToLibraryAt',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['createEpisode'],
			},
		},
		default: '',
		description:
			'Date and time when the episode is published to the library (YYYY-MM-DDTHH:MM:SSZ)',
	},
	{
		displayName: 'Library Audio URL',
		name: 'libraryAudioUrl',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['createEpisode'],
			},
		},
		default: '',
		description: 'URL of the audio in the library for the episode',
	},
	{
		displayName: 'Library Video URL',
		name: 'libraryVideoUrl',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['createEpisode'],
			},
		},
		default: '',
		description: 'URL of the video in the library for the episode',
	},
	{
		displayName: 'Art',
		name: 'art',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['createEpisode'],
			},
		},
		default: '',
		description:
			'Currently not supported (see <a href="https://github.com/planningcenter/developers/issues/1350#issue-3319108133">Github Issue</a>)',
	},
	{
		displayName: 'Sermon Audio',
		name: 'sermonAudio',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['publishing'],
				operation: ['createEpisode'],
			},
		},
		default: '',
		description:
			'Currently not supported (see <a href="https://github.com/planningcenter/developers/issues/1350#issue-3319108133">Github Issue</a>)',
	},
];
