// nodes/PlanningCenter/properties/publishing/Properties.ts
import { publishingOperations } from './Operations';
import { getChannelProperties } from './GetChannel';
import { getManyChannelsProperties } from './GetManyChannels';
import { getSeriesProperties } from './GetSeries';
import { getManySeriesProperties } from './GetManySeries';
import { getSpeakerProperties } from './GetSpeaker';
import { getManySpeakersProperties } from './GetManySpeakers';
import { getEpisodeProperties } from './GetEpisode';
import { getManyEpisodesProperties } from './GetManyEpisodes';
import { createEpisodeProperties } from './CreateEpisode';

export const publishingProperties = [
	...publishingOperations,
	...getChannelProperties,
	...getManyChannelsProperties,
	...getSeriesProperties,
	...getManySeriesProperties,
	...getSpeakerProperties,
	...getManySpeakersProperties,
	...getEpisodeProperties,
	...getManyEpisodesProperties,
	...createEpisodeProperties,
];
