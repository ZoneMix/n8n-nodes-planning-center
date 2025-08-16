// nodes/PlanningCenter/properties/people/GetPerson.ts
export const getPersonProperties = [
    {
        displayName: 'Person ID',
        name: 'personId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['getPerson'],
            },
        },
        default: '',
        description: 'ID of the person to retrieve',
    },
    {
        displayName: 'Additional Query Parameters',
        name: 'additionalFilters',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['getPerson'],
            },
        },
        default: '',
        description: 'Other query parameters like order=last_name,include=emails (comma-separated, no leading ?)',
        placeholder: 'order=last_name,include=emails',
    },
];
