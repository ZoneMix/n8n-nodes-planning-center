// nodes/PlanningCenter/properties/people/GetFieldDefinition.ts
export const getFieldDefinitionProperties = [
    {
        displayName: 'Field Definition Name or ID',
        name: 'fieldDefinitionId',
        type: 'options',
        default: '',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getFieldDefinitions',
        },
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['getFieldDefinition'],
            },
        },
    },
];
