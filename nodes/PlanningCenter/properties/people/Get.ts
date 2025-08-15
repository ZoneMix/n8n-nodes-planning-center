// nodes/PlanningCenter/properties/people/Get.ts
export const peopleGet = [
	{
		displayName: 'Person ID',
		name: 'personId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['people'],
				operation: ['getPerson', 'deletePerson', 'updatePerson'],
			},
		},
		default: '',
		description: 'ID of the person',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['people'],
				operation: ['getManyPeople'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['people'],
				operation: ['getManyPeople'],
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
		displayName: 'Field Definition Name or ID',
		name: 'fieldDefinitionId',
		type: 'options',
		default: '',
		required: true,
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
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
