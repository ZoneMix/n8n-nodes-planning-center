// nodes/PlanningCenter/properties/people/Operations.ts
export const peopleOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['people'],
			},
		},
		options: [
			{
				name: 'Create a Person',
				value: 'createPerson',
				action: 'Create a person',
			},
			{
				name: 'Delete a Person',
				value: 'deletePerson',
				action: 'Delete a person',
			},
			{
				name: 'Get a Person',
				value: 'getPerson',
				action: 'Get a person',
			},
			{
				name: 'Get Many People',
				value: 'getManyPeople',
				action: 'Get many people',
			},
			{
				name: 'Update a Person',
				value: 'updatePerson',
				action: 'Update a person',
			},
		],
		default: 'getManyPeople',
	},
];
