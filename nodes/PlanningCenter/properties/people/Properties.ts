// nodes/PlanningCenter/properties/people/Properties.ts
import { peopleCreateUpdateProperties } from './CreateUpdate';
import { peopleOperations } from './Operations';
import { peopleGet } from './Get';
import { peopleFilters } from './Filter';
import { peopleAdditionalParams } from './AdditionalQueryParams';

export const peopleProperties = [
	...peopleOperations,
	...peopleCreateUpdateProperties,
	...peopleGet,
	...peopleFilters,
	...peopleAdditionalParams,
];
