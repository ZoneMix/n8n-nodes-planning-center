// nodes/PlanningCenter/clients/PublishingClient.ts
// Extends BaseClient for Publishing API (/publishing/v2).
import { BaseClient } from './BaseClient';

export class PublishingClient extends BaseClient {
	constructor(request: (method: string, url: string, body?: any, qs?: any) => Promise<any>) {
		super('publishing/v2', request);
	}

	// Get list of channels.
	async getChannels(params?: any): Promise<any[]> {
		return await this.paginateGet('channels', params);
	}

	// Get a single channel by ID.
	async getChannel(channelId: string, params?: any): Promise<any> {
		const response = await this.get(`channels/${channelId}`, params);
		return response.data;
	}

	// Utility: Get channel ID by name.
	async getChannelIdByName(name: string): Promise<string> {
		const channels = await this.getChannels({ 'where[name]': name, per_page: 100 });
		if (!channels.length) {
			throw new Error(`No channel found with name '${name}'`);
		}
		return channels[0].id;
	}

	// Utility: Get first channel ID (ordered by name).
	async getFirstChannelId(): Promise<string> {
		const channels = await this.getChannels({ order: 'name', per_page: 1 });
		if (!channels.length) {
			throw new Error('No channels found.');
		}
		return channels[0].id;
	}

	// Get list of series.
	async getSeries(params?: any): Promise<any[]> {
		return await this.paginateGet('series', params);
	}

	// Get a single series by ID.
	async getSeriesById(seriesId: string, params?: any): Promise<any> {
		const response = await this.get(`series/${seriesId}`, params);
		return response.data;
	}

	// Get list of speakers.
	async getSpeakers(params?: any): Promise<any[]> {
		return await this.paginateGet('speakers', params);
	}

	// Get a single speaker by ID.
	async getSpeaker(speakerId: string, params?: any): Promise<any> {
		const response = await this.get(`speakers/${speakerId}`, params);
		return response.data;
	}

	// Create an episode.
	async createEpisode(attributes?: any): Promise<any> {
		const payload = { data: { attributes } };
		const response = await this.post('episodes', payload);
		return response.data;
	}

	// Get episodes (global, not under channel).
	async getEpisodes(params?: any): Promise<any[]> {
		return await this.paginateGet('episodes', params);
	}

	// Get episodes for a channel (existing method).
	async getEpisodesForChannel(channelId: string, params?: any): Promise<any[]> {
		return await this.paginateGet(`channels/${channelId}/episodes`, params);
	}

	// Get a single episode by ID.
	async getEpisode(episodeId: string, params?: any): Promise<any> {
		const response = await this.get(`episodes/${episodeId}`, params);
		return response.data;
	}

	// Update an episode.
	async updateEpisode(episodeId: string, attributes: any): Promise<any> {
		const payload = { data: { attributes } };
		const response = await this.patch(`episodes/${episodeId}`, payload);
		return response.data;
	}

	// Delete an episode.
	async deleteEpisode(episodeId: string): Promise<any> {
		return await this.delete(`episodes/${episodeId}`);
	}

	// Get episode resources for an episode.
	async getEpisodeResources(episodeId: string, params?: any): Promise<any[]> {
		return await this.paginateGet(`episodes/${episodeId}/episode_resources`, params);
	}

	// Get a single episode resource by ID.
	async getEpisodeResource(resourceId: string, params?: any): Promise<any> {
		const response = await this.get(`episode_resources/${resourceId}`, params);
		return response.data;
	}

	// Create an episode resource.
	async createEpisodeResource(episodeId: string, attributes: any): Promise<any> {
		const payload = { data: { attributes } };
		const response = await this.post(`episodes/${episodeId}/episode_resources`, payload);
		return response.data;
	}

	// Update an episode resource.
	async updateEpisodeResource(resourceId: string, attributes: any): Promise<any> {
		const payload = { data: { attributes } };
		const response = await this.patch(`episode_resources/${resourceId}`, payload);
		return response.data;
	}

	// Delete an episode resource.
	async deleteEpisodeResource(resourceId: string): Promise<any> {
		return await this.delete(`episode_resources/${resourceId}`);
	}
}
