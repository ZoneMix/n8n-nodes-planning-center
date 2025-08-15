// nodes/PlanningCenter/clients/PeopleClient.ts
// Extends BaseClient for People API (/people/v2).
import { BaseClient } from './BaseClient';

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
	// Body format: JSON-API { data: { attributes: { ... } } }
	async createPerson(attributes: any): Promise<any> {
		try {
			const payload = { data: { attributes } };
			//console.log('Payload for createPerson:', payload);
			const response = await this.post('people', payload);
			return response.data;
		} catch (error) {
			throw new Error(`Failed to create person: ${error.message}`);
		}
	}

	// Update a person by ID. Body format: JSON-API { data: { attributes: { ... } } }
	async updatePerson(personId: string, attributes: any): Promise<any> {
		const payload = { data: { attributes } };
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
}
