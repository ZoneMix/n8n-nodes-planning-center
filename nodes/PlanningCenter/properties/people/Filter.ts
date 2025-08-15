// nodes/PlanningCenter/properties/people/Filter.ts
import { peopleFilterOptions } from './FilterOptions';

export const peopleFilters = [
	{
		displayName: 'Filters',
		name: 'peopleFilters',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['people'],
				operation: ['getManyPeople'],
			},
		},
		placeholder: 'Add Filter',
		default: {},
		options: [
			{
				name: 'whereFilters',
				displayName: 'Where Filter',
				values: [
					{
						displayName: 'Field',
						name: 'field',
						type: 'options',
						options: peopleFilterOptions,
						default: 'accounting_administrator',
						description: 'The field to filter on',
					},
					{
						displayName: 'Value',
						name: 'stringValue',
						type: 'string',
						default: '',
						displayOptions: {
							hide: {
								field: [
									'accounting_administrator',
									'child',
									'site_administrator',
									'passed_background_check',
								],
							},
						},
						description: 'The value to filter by',
					},
					{
						displayName: 'Value',
						name: 'booleanValue',
						type: 'options',
						options: [
							{ name: 'True', value: 'true' },
							{ name: 'False', value: 'false' },
						],
						default: 'true',
						displayOptions: {
							show: {
								field: [
									'accounting_administrator',
									'child',
									'site_administrator',
									'passed_background_check',
								],
							},
						},
						description: 'The value to filter by',
					},
				],
			},
		],
	},
];
