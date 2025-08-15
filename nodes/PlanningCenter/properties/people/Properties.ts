// nodes/PlanningCenter/properties/people/Properties.ts
import { peopleCreateUpdateProperties } from './CreateUpdate';
import { peopleOperations } from './Operations';
import { peopleFilters } from './Filter';

export const peopleProperties = [
	...peopleOperations,
	...peopleCreateUpdateProperties,
	...peopleFilters,

	// Common parameters for multiple operations
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
