// src/properties/PeopleCreateUpdateProperties.ts
export const peopleCreateUpdateProperties = [
    {
        displayName: 'First Name',
        name: 'firstName',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['createPerson', 'updatePerson'],
            },
        },
        default: '',
    },
    {
        displayName: 'Last Name',
        name: 'lastName',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['createPerson', 'updatePerson'],
            },
        },
        default: '',
    },
    {
        displayName: 'Middle Name',
        name: 'middleName',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['createPerson', 'updatePerson'],
            },
        },
        default: '',
    },
    {
        displayName: 'Nickname',
        name: 'nickname',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['createPerson', 'updatePerson'],
            },
        },
        default: '',
    },
    {
        displayName: 'Birthdate',
        name: 'birthdate',
        type: 'dateTime',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['createPerson', 'updatePerson'],
            },
        },
        default: '',
        description: 'Birthdate in YYYY-MM-DD format',
    },
    {
        displayName: 'Anniversary',
        name: 'anniversary',
        type: 'dateTime',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['createPerson', 'updatePerson'],
            },
        },
        default: '',
        description: 'Anniversary in YYYY-MM-DD format',
    },
    {
        displayName: 'Gender',
        name: 'gender',
        type: 'options',
        options: [
            { name: 'Male', value: 'male' },
            { name: 'Female', value: 'female' },
        ],
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['createPerson', 'updatePerson'],
            },
        },
        default: 'male',
    },
    {
        displayName: 'Grade',
        name: 'grade',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['createPerson', 'updatePerson'],
            },
        },
        default: 0,
    },
    {
        displayName: 'Child',
        name: 'child',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['createPerson', 'updatePerson'],
            },
        },
        default: false,
    },
    {
        displayName: 'Graduation Year',
        name: 'graduationYear',
        type: 'number',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['createPerson', 'updatePerson'],
            },
        },
        default: 0,
    },
    {
        displayName: 'Medical Notes',
        name: 'medicalNotes',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['createPerson', 'updatePerson'],
            },
        },
        default: '',
    },
    {
        displayName: 'Membership',
        name: 'membership',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['createPerson', 'updatePerson'],
            },
        },
        default: '',
    },
    {
        displayName: 'Status',
        name: 'status',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['createPerson', 'updatePerson'],
            },
        },
        default: '',
    },
    {
        displayName: 'School Type',
        name: 'schoolType',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['createPerson', 'updatePerson'],
            },
        },
        default: '',
    },
    {
        displayName: 'Passed Background Check',
        name: 'passedBackgroundCheck',
        type: 'boolean',
        displayOptions: {
            show: {
                resource: ['people'],
                operation: ['createPerson', 'updatePerson'],
            },
        },
        default: false,
    },
];
