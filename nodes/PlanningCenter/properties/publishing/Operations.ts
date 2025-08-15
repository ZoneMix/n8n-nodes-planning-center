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
                name: 'Get A Series',
                value: 'getSeries',
                action: 'Get a series',
            },
            {
                name: 'Get A Speaker',
                value: 'getSpeaker',
                action: 'Get a speaker',
            },
            {
                name: 'Get An Episode',
                value: 'getEpisode',
                action: 'Get an episode',
            },
            {
                name: 'Get Many Channels',
                value: 'getManyChannels',
                action: 'Get many channels',
            },
            {
                name: 'Get Many Episodes',
                value: 'getManyEpisodes',
                action: 'Get many episodes',
            },
            {
                name: 'Get Many Series',
                value: 'getManySeries',
                action: 'Get many series',
            },
            {
                name: 'Get Many Speakers',
                value: 'getManySpeakers',
                action: 'Get many speakers',
            },
        ],
        default: 'createEpisode',
    },
];
