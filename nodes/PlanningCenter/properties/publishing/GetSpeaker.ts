// nodes/PlanningCenter/properties/publishing/GetSpeaker.ts
export const getSpeakerProperties = [
    {
        displayName: 'Speaker Name or ID',
        name: 'speakerId',
        type: 'options',
        typeOptions: {
            loadOptionsMethod: 'getSpeakers',
        },
        required: true,
        displayOptions: {
            show: {
                resource: ['publishing'],
                operation: ['getSpeaker'],
            },
        },
        default: '',
        description: 'ID of the speaker. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
    },
    {
        displayName: 'Additional Query Parameters',
        name: 'additionalFilters',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['publishing'],
                operation: ['getSpeaker'],
            },
        },
        default: '',
        placeholder: 'include=episodes',
    },
];
