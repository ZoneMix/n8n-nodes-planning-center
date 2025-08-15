// nodes/PlanningCenter/properties/people/AdditionalQueryParams.ts
export const peopleAdditionalParams = [
	{
		displayName: 'Additional Query Parameters',
		name: 'additionalFilters',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['people'],
				operation: ['getPerson', 'getManyPeople'],
			},
		},
		default: '',
		description:
			'Other query parameters like order=last_name,include=emails (comma-separated, no leading ?)',
		placeholder: 'order=last_name,include=emails',
	},
];
