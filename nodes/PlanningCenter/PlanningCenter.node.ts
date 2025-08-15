// src/PlanningCenter.node.ts
import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
	INodeProperties,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';
import { PeopleClient } from './clients/PeopleClient';
import { peopleFilterOptions } from './properties/people/PeopleFilterOptions';
import { peopleCreateUpdateProperties } from './properties/people/PeopleCreateUpdateProperties';
import { PeopleOperations } from './properties/people/PeopleOperations';
import { PublishingOperations } from './properties/publishing/PublishingOperations';

export class PlanningCenter implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Planning Center',
		name: 'planningCenter',
		icon: 'file:planning-center.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Planning Center API',
		defaults: {
			name: 'Planning Center',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'planningCenterOAuth2Api',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Person', value: 'people' },
					{ name: 'Publishing', value: 'publishing' },
				],
				default: 'people',
			},
			...(PeopleOperations as INodeProperties[]),
			...(PublishingOperations as INodeProperties[]),
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
			...(peopleCreateUpdateProperties as INodeProperties[]),
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		const request = async (method: string, url: string, body?: any, qs?: any) => {
			try {
				return await this.helpers.httpRequestWithAuthentication.call(
					this,
					'planningCenterOAuth2Api',
					{
						method: method as IHttpRequestMethods,
						url,
						body,
						qs,
						json: true,
					},
				);
			} catch (error) {
				throw error;
			}
		};

		const parseFilters = (filters: string): any => {
			const params: any = {};
			if (filters) {
				filters.split(',').forEach((param) => {
					const [key, value] = param.split('=');
					params[key.trim()] = value?.trim();
				});
			}
			return params;
		};

		const peopleClient = new PeopleClient(request);

		for (let i = 0; i < items.length; i++) {
			try {
				let result: any;
				const additionalFilters = parseFilters(
					this.getNodeParameter('additionalFilters', i, '') as string,
				);
				let qs = { ...additionalFilters };

				if (operation === 'getManyPeople' || operation === 'getPerson') {
					const whereFilters = this.getNodeParameter('peopleFilters.whereFilters', i, []) as Array<{
						field: string;
						stringValue?: string;
						booleanValue?: string;
					}>;
					whereFilters.forEach((filter) => {
						let value;
						const booleanFields = [
							'accounting_administrator',
							'child',
							'site_administrator',
							'passed_background_check',
						];
						if (booleanFields.includes(filter.field)) {
							value = filter.booleanValue;
						} else {
							value = filter.stringValue;
						}
						if (value !== undefined && value !== '') {
							qs[`where[${filter.field}]`] = value;
						}
					});
				}

				const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
				const limit = returnAll ? Infinity : (this.getNodeParameter('limit', i, 50) as number);

				if (resource === 'people') {
					if (operation === 'getPerson') {
						const personId = this.getNodeParameter('personId', i) as string;
						result = await peopleClient.getPerson(personId, qs);
					} else if (operation === 'getManyPeople') {
						result = await peopleClient.getPeople(qs);
					} else if (operation === 'createPerson' || operation === 'updatePerson') {
						const attributes: any = {};
						attributes.first_name = this.getNodeParameter('firstName', i, '');
						attributes.last_name = this.getNodeParameter('lastName', i, '');
						attributes.middle_name = this.getNodeParameter('middleName', i, '');
						attributes.nickname = this.getNodeParameter('nickname', i, '');
						const birthdate = this.getNodeParameter('birthdate', i, '') as string;
						attributes.birthdate = birthdate ? birthdate.split('T')[0] : undefined;
						const anniversary = this.getNodeParameter('anniversary', i, '') as string;
						attributes.anniversary = anniversary ? anniversary.split('T')[0] : undefined;
						const gender = this.getNodeParameter('gender', i, '') as string;
						attributes.gender = gender ? gender.toUpperCase() : undefined;
						attributes.grade = this.getNodeParameter('grade', i, undefined);
						attributes.child = this.getNodeParameter('child', i, false);
						attributes.graduation_year = this.getNodeParameter('graduationYear', i, undefined);
						attributes.medical_notes = this.getNodeParameter('medicalNotes', i, '');
						attributes.membership = this.getNodeParameter('membership', i, '');
						attributes.status = this.getNodeParameter('status', i, '');
						attributes.school_type = this.getNodeParameter('schoolType', i, '');
						attributes.passed_background_check = this.getNodeParameter(
							'passedBackgroundCheck',
							i,
							false,
						);
						if (!attributes.first_name && !attributes.last_name && operation === 'createPerson') {
							throw new NodeOperationError(
								this.getNode(),
								'At least one of first name or last name is required',
								{ itemIndex: i },
							);
						}
						if (operation === 'createPerson') {
							result = await peopleClient.createPerson(attributes);
						} else {
							const personId = this.getNodeParameter('personId', i) as string;
							result = await peopleClient.updatePerson(personId, attributes);
						}
					} else if (operation === 'deletePerson') {
						const personId = this.getNodeParameter('personId', i) as string;
						result = await peopleClient.deletePerson(personId);
					}
				}

				let output = Array.isArray(result) ? result : [result];
				if (operation === 'getManyPeople' && !returnAll) {
					output = output.slice(0, limit);
				}
				returnData.push(...output.map((item: any) => ({ json: item || {} })));
			} catch (error) {
				throw new NodeOperationError(this.getNode(), `Planning Center error: ${error.message}`, {
					itemIndex: i,
				});
			}
		}
		return [returnData];
	}
}
