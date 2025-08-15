// nodes/PlanningCenter/properties/publishing/GetEpisode.ts
export const getEpisodeProperties = [
    {
        displayName: 'Episode ID',
        name: 'episodeId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['publishing'],
                operation: ['getEpisode'],
            },
        },
        default: '',
        description: 'ID of the episode',
    },
    {
        displayName: 'Additional Query Parameters',
        name: 'additionalFilters',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['publishing'],
                operation: ['getEpisode'],
            },
        },
        default: '',
        placeholder: 'include=episode_resources',
    },
];
