import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class PlanningCenterOAuth2Api implements ICredentialType {
    name = 'planningCenterOAuth2Api';
    extends = ['oAuth2Api'];
    displayName = 'Planning Center OAuth2 API';
    documentationUrl = 'https://github.com/ZoneMix/n8n-nodes-planning-center.git'; // Optional: link to your docs
    properties: INodeProperties[] = [
        {
            displayName: 'Grant Type',
            name: 'grantType',
            type: 'hidden',
            default: 'authorizationCode',
        },
        {
            displayName: 'Authorization URL',
            name: 'authUrl',
            type: 'string',
            default: 'https://api.planningcenteronline.com/oauth/authorize',
            required: true,
        },
        {
            displayName: 'Access Token URL',
            name: 'accessTokenUrl',
            type: 'string',
            default: 'https://api.planningcenteronline.com/oauth/token',
            required: true,
        },
        {
            displayName: 'Scope',
            name: 'scope',
            type: 'string',
            default: 'calendar check_ins giving people services publishing registrations groups',
        },
        {
            displayName: 'Auth URI Query Parameters',
            name: 'authQueryParameters',
            type: 'hidden',
            default: '',
        },
        {
            displayName: 'Authentication',
            name: 'authentication',
            type: 'hidden',
            default: 'header',
        },
    ];
}
