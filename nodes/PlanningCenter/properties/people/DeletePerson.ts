// nodes/PlanningCenter/properties/people/DeletePerson.ts
export const deletePersonProperties = [
    {
        displayName: 'Person ID',
        name: 'personId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['deletePerson'],
            },
        },
        default: '',
        description: 'ID of the person to delete',
    },
];
