import {
		IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

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
                    {
                        name: 'Person',
                        value: 'person',
                    },
                ],
                default: 'person',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['person'],
                    },
                },
                options: [
                    {
                        name: 'Get',
                        value: 'get',
                        description: 'Get a person by ID',
                        action: 'Get a person',
                    },
                    {
                        name: 'Get Many',
                        value: 'getAll',
                        description: 'Get a list of people',
                        action: 'Get many people',
                    },
                ],
                default: 'getAll',
            },
            {
                displayName: 'Person ID',
                name: 'personId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['person'],
                        operation: ['get'],
                    },
                },
                default: '',
                description: 'ID of the person to get',
            },
            {
                displayName: 'Return All',
                name: 'returnAll',
                type: 'boolean',
                displayOptions: {
                    show: {
                        resource: ['person'],
                        operation: ['getAll'],
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
                        resource: ['person'],
                        operation: ['getAll'],
                        returnAll: [false],
                    },
                },
                typeOptions: {
                    minValue: 1,
                },
                default: 50,
                description: 'Max number of results to return',
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        const baseUrl = 'https://api.planningcenteronline.com/people/v2';

        for (let i = 0; i < items.length; i++) {
            try {
                if (resource === 'person') {
                    if (operation === 'get') {
                        const personId = this.getNodeParameter('personId', i);
                        const response = await this.helpers.httpRequestWithAuthentication.call(
                            this,
                            'planningCenterOAuth2Api',
                            {
                                method: 'GET',
                                url: `${baseUrl}/people/${personId}`,
                                json: true,
                            }
                        );
                        returnData.push({ json: response.data });
                    } else if (operation === 'getAll') {
                        const returnAll = this.getNodeParameter('returnAll', i);
                        let response = await this.helpers.httpRequestWithAuthentication.call(
                            this,
                            'planningCenterOAuth2Api',
                            {
                                method: 'GET',
                                url: `${baseUrl}/people`,
                                json: true,
                            }
                        );
                        let data = response.data || [];
                        if (!returnAll) {
                            const limit = this.getNodeParameter('limit', i);
                            data = data.slice(0, limit);
                        }
                        returnData.push(...data.map((item: any) => ({ json: item })));
                    }
                }
            } catch (error) {
                throw new NodeOperationError(this.getNode(), `Planning Center error: ${error.message}`, { itemIndex: i });
            }
        }

        return [returnData];
    }
}
