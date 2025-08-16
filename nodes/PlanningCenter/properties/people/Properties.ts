// nodes/PlanningCenter/properties/people/Properties.ts
import { peopleOperations } from './Operations';
import { createPersonProperties } from './CreatePerson';
import { updatePersonProperties } from './UpdatePerson';
import { deletePersonProperties } from './DeletePerson';
import { getPersonProperties } from './GetPerson';
import { getFieldDefinitionProperties } from './GetFieldDefinition';
import { getManyPeopleProperties } from './GetManyPeople';

export const peopleProperties = [
    ...peopleOperations,
    ...createPersonProperties,
    ...updatePersonProperties,
    ...deletePersonProperties,
    ...getPersonProperties,
    ...getFieldDefinitionProperties,
    ...getManyPeopleProperties,
];
