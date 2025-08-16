// nodes/PlanningCenter/properties/people/UpdatePerson.ts
export const updatePersonProperties = [
    {
        displayName: 'Person ID',
        name: 'personId',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'ID of the person to update',
    },
    {
        displayName: 'Accounting Administrator',
        name: 'accountingAdministrator',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: false,
        description: 'Whether the person is an accounting administrator',
    },
    {
        displayName: 'Anniversary',
        name: 'anniversary',
        type: 'dateTime',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'Anniversary in YYYY-MM-DD format',
    },
    {
        displayName: 'Birthdate',
        name: 'birthdate',
        type: 'dateTime',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'Birthdate in YYYY-MM-DD format',
    },
    {
        displayName: 'Child',
        name: 'child',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: false,
        description: 'Whether the person is a child',
    },
    {
        displayName: 'Given Name',
        name: 'givenName',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'The given name of the person',
    },
    {
        displayName: 'Grade',
        name: 'grade',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: null,
        description: 'Grade level for the person (e.g., for students)',
    },
    {
        displayName: 'Graduation Year',
        name: 'graduationYear',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: null,
        description: 'Year of graduation (e.g., 2025)',
    },
    {
        displayName: 'Middle Name',
        name: 'middleName',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'Middle name of the person',
    },
    {
        displayName: 'Nickname',
        name: 'nickname',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'Nickname or preferred name of the person',
    },
    {
        displayName: 'People Permissions',
        name: 'peoplePermissions',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'Permissions level for people-related actions',
    },
    {
        displayName: 'Site Administrator',
        name: 'siteAdministrator',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: false,
        description: 'Whether the person is a site administrator',
    },
    {
        displayName: 'Gender',
        name: 'gender',
        type: 'options',
        options: [
            { name: 'Male', value: 'Male' },
            { name: 'Female', value: 'Female' },
        ],
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: 'Male',
        description: 'Gender of the person (Male or Female)',
    },
    {
        displayName: 'Inactivated At',
        name: 'inactivatedAt',
        type: 'dateTime',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'Date when the person was inactivated (YYYY-MM-DD)',
    },
    {
        displayName: 'Medical Notes',
        name: 'medicalNotes',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'Medical notes or conditions for the person',
    },
    {
        displayName: 'Membership',
        name: 'membership',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'Membership status of the person',
    },
    {
        displayName: 'Stripe Customer Identifier',
        name: 'stripeCustomerIdentifier',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'Stripe customer ID associated with the person',
    },
    {
        displayName: 'Avatar',
        name: 'avatar',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'URL or reference to the person’s avatar image',
    },
    {
        displayName: 'First Name',
        name: 'firstName',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'First name of the person',
    },
    {
        displayName: 'Last Name',
        name: 'lastName',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'Last name of the person',
    },
    {
        displayName: 'Gender ID',
        name: 'genderId',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'ID referencing the gender in the system',
    },
    {
        displayName: 'Primary Campus ID',
        name: 'primaryCampusId',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'ID of the primary campus associated with the person',
    },
    {
        displayName: 'Remote ID',
        name: 'remoteId',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: '',
        description: 'External ID for the person from another system',
    },
    {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
            { name: 'Active', value: 'active' },
            { name: 'Inactive', value: 'inactive' },
        ],
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['updatePerson'],
            },
        },
        default: 'active',
        description: 'Status of the person (e.g., active, inactive)',
    },
];
