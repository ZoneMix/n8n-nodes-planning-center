// nodes/PlanningCenter/properties/people/GetManyPeople.ts
import { peopleFilterOptions } from './GetFilterOptions';

export const getManyPeopleProperties = [
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
        displayName: 'Additional Query Parameters',
        name: 'additionalFilters',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['getManyPeople'],
            },
        },
        default: '',
        description: 'Other query parameters like order=last_name,include=emails (comma-separated, no leading ?)',
        placeholder: 'order=last_name,include=emails',
    },
];
