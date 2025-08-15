// nodes/PlanningCenter/PlanningCenter.node.ts
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
import { peopleProperties } from './properties/people/Properties';
import { publishingProperties } from './properties/publishing/Properties';

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
			...(peopleProperties as INodeProperties[]),
			...(publishingProperties as INodeProperties[]),
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		const request = async (method: string, url: string, body?: any, qs?: any) => {
			try {
				const response = await this.helpers.httpRequestWithAuthentication.call(
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
				//console.log(`API request to ${url}:`, JSON.stringify(response, null, 2));
				return response;
			} catch (error) {
				console.error(
					`API error for ${url}:`,
					JSON.stringify(error.response?.data || error.message, null, 2),
				);
				const message = error.response?.data?.errors?.[0]?.detail || error.message;
				throw new NodeOperationError(this.getNode(), `API error: ${message}`, {
					description: `Full error response: ${JSON.stringify(error.response?.data || error.message)}`,
				});
			}
		};

		const parseFilters = (filters: string): any => {
			const params: any = {};
			if (filters) {
				filters.split(',').forEach((param) => {
					const [key, ...valueParts] = param.split('=');
					const value = valueParts.join('=').trim();
					if (key && value) params[key.trim()] = value;
				});
			}
			return params;
		};

		const peopleClient = new PeopleClient(request);
		console.log('Items to process:', items);

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
						const booleanFields = ['accounting_administrator', 'child', 'site_administrator'];
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
						const fields = [
							'accountingAdministrator',
							'anniversary',
							'birthdate',
							'child',
							'givenName',
							'grade',
							'graduationYear',
							'middleName',
							'nickname',
							'peoplePermissions',
							'siteAdministrator',
							'gender',
							'inactivatedAt',
							'medicalNotes',
							'membership',
							'stripeCustomerIdentifier',
							'avatar',
							'firstName',
							'lastName',
							'genderId',
							'primaryCampusId',
							'remoteId',
							'status',
						];
						const keyMap: { [key: string]: string } = {
							accountingAdministrator: 'accounting_administrator',
							givenName: 'given_name',
							graduationYear: 'graduation_year',
							middleName: 'middle_name',
							peoplePermissions: 'people_permissions',
							siteAdministrator: 'site_administrator',
							inactivatedAt: 'inactivated_at',
							medicalNotes: 'medical_notes',
							stripeCustomerIdentifier: 'stripe_customer_identifier',
							firstName: 'first_name',
							lastName: 'last_name',
							genderId: 'gender_id',
							primaryCampusId: 'primary_campus_id',
							remoteId: 'remote_id',
						};
						fields.forEach((field) => {
							const value = this.getNodeParameter(field, i, undefined);
							if (value !== undefined && value !== null && value !== '') {
								const key = keyMap[field] || field;
								attributes[key] = value;
							}
						});
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
				console.error(`Node error for item ${i}:`, JSON.stringify(error, null, 2));
				throw new NodeOperationError(this.getNode(), `Planning Center error: ${error.message}`, {
					itemIndex: i,
					description: `Full error: ${JSON.stringify(error.cause?.response?.data || error.message)}`,
				});
			}
		}
		return [returnData];
	}
}
