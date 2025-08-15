// PeopleClient.ts: Extends BaseClient for People API (/people/v2).
// Mirrors people.py, with all methods converted to async TS.
// Added createPerson, updatePerson, deletePerson based on standard JSON-API patterns (not in original Python, but supported by API and your n8n node).
// BUILT_IN_FIELDS is static data for person attributes (used in n8n UI for fields).
// Utilities like get_all_people_ids, get_field_definition_id, search_person_by_name are included as methods.
// All methods return the extracted 'data' where applicable, matching Python.

import { BaseClient } from './BaseClient';

// Built-in field definitions for person attributes. Mirrors BUILT_IN_FIELDS in Python.
// Used for validation or UI in n8n, but not directly here.
export const BUILT_IN_FIELDS = [
    { id: null, attributes: { name: 'First Name', slug: 'first_name', data_type: 'string', sequence: null } },
    { id: null, attributes: { name: 'Middle Name', slug: 'middle_name', data_type: 'string', sequence: null } },
    { id: null, attributes: { name: 'Last Name', slug: 'last_name', data_type: 'string', sequence: null } },
    { id: null, attributes: { name: 'Nickname', slug: 'nickname', data_type: 'string', sequence: null } },
    { id: null, attributes: { name: 'Birthdate', slug: 'birthdate', data_type: 'date', sequence: null } },
    { id: null, attributes: { name: 'Anniversary', slug: 'anniversary', data_type: 'date', sequence: null } },
    { id: null, attributes: { name: 'Gender', slug: 'gender', data_type: 'string', sequence: null } },
    { id: null, attributes: { name: 'Grade', slug: 'grade', data_type: 'integer', sequence: null } },
    { id: null, attributes: { name: 'Child', slug: 'child', data_type: 'boolean', sequence: null } },
    { id: null, attributes: { name: 'Graduation Year', slug: 'graduation_year', data_type: 'integer', sequence: null } },
    { id: null, attributes: { name: 'Medical Notes', slug: 'medical_notes', data_type: 'text', sequence: null } },
    { id: null, attributes: { name: 'Membership', slug: 'membership', data_type: 'string', sequence: null } },
    { id: null, attributes: { name: 'Status', slug: 'status', data_type: 'string', sequence: null } },
    { id: null, attributes: { name: 'School Type', slug: 'school_type', data_type: 'string', sequence: null } },
    { id: null, attributes: { name: 'Passed Background Check', slug: 'passed_background_check', data_type: 'boolean', sequence: null } },
    // Add more if needed
];

// Helper to get slugs from built-in fields. Mirrors get_built_in_field_slugs in Python.
export function getBuiltInFieldSlugs(): string[] {
    return BUILT_IN_FIELDS.map(f => f.attributes.slug);
}

// Helper to find built-in field by name. Mirrors get_built_in_field_by_name in Python.
export function getBuiltInFieldByName(fieldName: string): any | null {
    return BUILT_IN_FIELDS.find(f => f.attributes.name.toLowerCase() === fieldName.toLowerCase()) || null;
}

export class PeopleClient extends BaseClient {
    constructor(request: (method: string, url: string, body?: any, qs?: any) => Promise<any>) {
        super('people/v2', request);
    }

    // Get list of people with pagination. Mirrors get_people.
    async getPeople(params?: any): Promise<any[]> {
        return await this.paginateGet('people', params);
    }

    // Get a single person by ID. Extracts 'data' from response.
    async getPerson(personId: string, params?: any): Promise<any> {
        const response = await this.get(`people/${personId}`, params);
        return response.data;
    }

    // Create a new person. Not in original Python, but added for completeness (matches API and n8n).
    // Body format: JSON-API { data: { type: 'Person', attributes: { ... } } }
    async createPerson(attributes: any): Promise<any> {
        const payload = { data: { type: 'Person', attributes } };
        const response = await this.post('people', payload);
        return response.data;
    }

    // Update a person. Not in original Python, but added.
    async updatePerson(personId: string, attributes: any): Promise<any> {
        const payload = { data: { type: 'Person', attributes } };
        const response = await this.patch(`people/${personId}`, payload);
        return response.data;
    }

    // Delete a person. Not in original Python, but added.
    async deletePerson(personId: string): Promise<any> {
        return await this.delete(`people/${personId}`);
    }

    // Get addresses for a person.
    async getAddressesForPerson(personId: string, params?: any): Promise<any[]> {
        return await this.paginateGet(`people/${personId}/addresses`, params);
    }

    // Get a single address by ID.
    async getAddress(addressId: string, params?: any): Promise<any> {
        const response = await this.get(`addresses/${addressId}`, params);
        return response.data;
    }

    // Get emails for a person.
    async getEmailsForPerson(personId: string, params?: any): Promise<any[]> {
        return await this.paginateGet(`people/${personId}/emails`, params);
    }

    // Get a single email by ID.
    async getEmail(emailId: string, params?: any): Promise<any> {
        const response = await this.get(`emails/${emailId}`, params);
        return response.data;
    }

    // Get phone numbers for a person.
    async getPhoneNumbersForPerson(personId: string, params?: any): Promise<any[]> {
        return await this.paginateGet(`people/${personId}/phone_numbers`, params);
    }

    // Get a single phone number by ID.
    async getPhoneNumber(phoneId: string, params?: any): Promise<any> {
        const response = await this.get(`phone_numbers/${phoneId}`, params);
        return response.data;
    }

    // Get field definitions.
    async getFieldDefinitions(params?: any): Promise<any[]> {
        return await this.paginateGet('field_definitions', params);
    }

    // Get a single field definition by ID.
    async getFieldDefinition(fieldId: string, params?: any): Promise<any> {
        const response = await this.get(`field_definitions/${fieldId}`, params);
        return response.data;
    }

    // Get field data.
    async getFieldData(params?: any): Promise<any[]> {
        return await this.paginateGet('field_data', params);
    }

    // Get a single field datum by ID.
    async getFieldDatum(fieldDataId: string, params?: any): Promise<any> {
        const response = await this.get(`field_data/${fieldDataId}`, params);
        return response.data;
    }

    // Get field data for a person.
    async getFieldDataForPerson(personId: string, params?: any): Promise<any[]> {
        return await this.paginateGet(`people/${personId}/field_data`, params);
    }

    // Get households.
    async getHouseholds(params?: any): Promise<any[]> {
        return await this.paginateGet('households', params);
    }

    // Get a single household by ID.
    async getHousehold(householdId: string, params?: any): Promise<any> {
        const response = await this.get(`households/${householdId}`, params);
        return response.data;
    }

    // Get birthdays.
    async getBirthdays(params?: any): Promise<any[]> {
        return await this.paginateGet('birthdays', params);
    }

    // Get anniversaries.
    async getAnniversaries(params?: any): Promise<any[]> {
        return await this.paginateGet('anniversaries', params);
    }

    // Utility: Get all people IDs.
    async getAllPeopleIds(): Promise<string[]> {
        const people = await this.getPeople();
        return people.map((p: any) => p.id);
    }

    // Utility: Get field definition ID by name.
    async getFieldDefinitionId(fieldName: string): Promise<string> {
        const defs = await this.getFieldDefinitions({ 'where[name]': fieldName });
        if (!defs.length) {
            throw new Error(`Field definition '${fieldName}' not found.`);
        }
        return defs[0].id;
    }

    // Utility: Get field data by definition ID.
    async getFieldDataByDefinition(fieldDefinitionId: string): Promise<any[]> {
        return await this.getFieldData({ 'where[field_definition_id]': fieldDefinitionId });
    }

    // Utility: Search person by name, return email and phone.
    async searchPersonByName(searchName: string): Promise<{ email: string, phone: string }> {
        const people = await this.getPeople({ 'where[search_name]': searchName, per_page: 1 });
        if (!people.length) {
            return { email: '', phone: '' };
        }
        const personId = people[0].id;
        const emails = await this.getEmailsForPerson(personId);
        const email = emails.length ? emails[0].attributes.address : '';
        const phones = await this.getPhoneNumbersForPerson(personId);
        const phone = phones.length ? phones[0].attributes.number : '';
        return { email, phone };
    }
}
