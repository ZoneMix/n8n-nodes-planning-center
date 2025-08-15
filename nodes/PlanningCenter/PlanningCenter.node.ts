// nodes/PlanningCenter/PlanningCenter.node.ts
import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
	INodeProperties,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';
import { PeopleClient } from './clients/PeopleClient';
import { PublishingClient } from './clients/PublishingClient';
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

	methods = {
		loadOptions: {
			async getFieldDefinitions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				try {
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'planningCenterOAuth2Api',
						{
							method: 'GET',
							url: 'https://api.planningcenteronline.com/people/v2/field_definitions',
							qs: { per_page: 100 },
							json: true,
						},
					);
					const fieldDefinitions = response.data || [];
					return fieldDefinitions.map((fd: any) => ({
						name: fd.attributes.name,
						value: fd.id,
					}));
				} catch (error) {
					throw new NodeOperationError(
						this.getNode(),
						`Failed to load field definitions: ${error.message}`,
					);
				}
			},
			async getChannels(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				try {
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'planningCenterOAuth2Api',
						{
							method: 'GET',
							url: 'https://api.planningcenteronline.com/publishing/v2/channels',
							qs: { per_page: 100 },
							json: true,
						},
					);
					const channels = response.data || [];
					return channels.map((c: any) => ({
						name: c.attributes.name,
						value: c.id,
					}));
				} catch (error) {
					throw new NodeOperationError(this.getNode(), `Failed to load channels: ${error.message}`);
				}
			},
			async getSeries(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				try {
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'planningCenterOAuth2Api',
						{
							method: 'GET',
							url: 'https://api.planningcenteronline.com/publishing/v2/series',
							qs: { per_page: 100 },
							json: true,
						},
					);
					const series = response.data || [];
					return [
						{ name: 'Series', value: '' },
						...series.map((s: any) => ({
							name: s.attributes.title,
							value: s.id,
						})),
					];
				} catch (error) {
					throw new NodeOperationError(this.getNode(), `Failed to load series: ${error.message}`);
				}
			},
			async getSpeakers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				try {
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'planningCenterOAuth2Api',
						{
							method: 'GET',
							url: 'https://api.planningcenteronline.com/publishing/v2/speakers',
							qs: { per_page: 100 },
							json: true,
						},
					);
					const speakers = response.data || [];
					return speakers.map((s: any) => ({
						name: s.attributes.formatted_name,
						value: s.id,
					}));
				} catch (error) {
					throw new NodeOperationError(this.getNode(), `Failed to load speakers: ${error.message}`);
				}
			},
		},
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
				// console.log(`API request to ${url}:`, JSON.stringify(response, null, 2));
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
		const publishingClient = new PublishingClient(request);

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
					} else if (operation === 'listFieldDefinitions') {
						const fieldDefinitionId = this.getNodeParameter('fieldDefinitionId', i, '') as string;
						if (fieldDefinitionId) {
							result = await peopleClient.getFieldDefinition(fieldDefinitionId, qs);
						} else {
							result = await peopleClient.getFieldDefinitions(qs);
						}
					}
				} else if (resource === 'publishing') {
					if (operation === 'getChannel') {
						const channelId = this.getNodeParameter('channelId', i) as string;
						result = await publishingClient.getChannel(channelId, qs);
					} else if (operation === 'getManyChannels') {
						const search = this.getNodeParameter('search', i, '') as string;
						if (search) qs['where[search]'] = search;
						result = await publishingClient.getChannels(qs);
					} else if (operation === 'getSeries') {
						const seriesId = this.getNodeParameter('seriesId', i) as string;
						result = await publishingClient.getSeriesById(seriesId, qs);
					} else if (operation === 'getManySeries') {
						const search = this.getNodeParameter('search', i, '') as string;
						if (search) qs['where[search]'] = search;
						result = await publishingClient.getSeries(qs);
					} else if (operation === 'getSpeaker') {
						const speakerId = this.getNodeParameter('speakerId', i) as string;
						result = await publishingClient.getSpeaker(speakerId, qs);
					} else if (operation === 'getManySpeakers') {
						result = await publishingClient.getSpeakers(qs);
					} else if (operation === 'getEpisode') {
						const episodeId = this.getNodeParameter('episodeId', i) as string;
						result = await publishingClient.getEpisode(episodeId, qs);
					} else if (operation === 'getManyEpisodes') {
						const search = this.getNodeParameter('search', i, '') as string;
						const seriesId = this.getNodeParameter('seriesId', i, '') as string;
						const servicesPlanRemoteIdentifier = this.getNodeParameter(
							'servicesPlanRemoteIdentifier',
							i,
							'',
						) as string;
						const servicesServiceTypeRemoteIdentifier = this.getNodeParameter(
							'servicesServiceTypeRemoteIdentifier',
							i,
							'',
						) as string;
						if (search) qs['where[search]'] = search;
						if (seriesId) qs['where[series_id]'] = seriesId;
						if (servicesPlanRemoteIdentifier)
							qs['where[services_plan_remote_identifier]'] = servicesPlanRemoteIdentifier;
						if (servicesServiceTypeRemoteIdentifier)
							qs['where[services_service_type_remote_identifier]'] =
								servicesServiceTypeRemoteIdentifier;
						result = await publishingClient.getEpisodes(qs);
					} else if (operation === 'createEpisode') {
						const attributes: any = {};
						const fields = [
							'art',
							'seriesId',
							'title',
							'description',
							'sermonAudio',
							'streamType',
							'videoUrl',
							'publishedToLibraryAt',
							'libraryAudioUrl',
							'libraryVideoUrl',
							'channelId',
						];
						const keyMap: { [key: string]: string } = {
							seriesId: 'series_id',
							sermonAudio: 'sermon_audio',
							streamType: 'stream_type',
							videoUrl: 'video_url',
							publishedToLibraryAt: 'published_to_library_at',
							libraryAudioUrl: 'library_audio_url',
							libraryVideoUrl: 'library_video_url',
							channelId: 'channel_id',
						};
						fields.forEach((field) => {
							const value = this.getNodeParameter(field, i, undefined);
							if (value !== undefined && value !== null && value !== '') {
								const key = keyMap[field] || field;
								attributes[key] = value;
							}
						});
						result = await publishingClient.createEpisode(attributes);
					}
				}

				let output = Array.isArray(result) ? result : [result];
				if (
					(operation.startsWith('getMany') || operation === 'listFieldDefinitions') &&
					!returnAll
				) {
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
