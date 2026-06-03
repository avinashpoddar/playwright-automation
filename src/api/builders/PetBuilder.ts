import { faker } from "@faker-js/faker";

import { Pet } from "../models/Pet";
import { PetStatus } from "../enums/PetStatus";

export class PetBuilder {

    private pet: Pet = {

        id:
            faker.number.int(),

        name:
            faker.animal.dog(),

        photoUrls: [],

        status:
            PetStatus.AVAILABLE
    };

    static create() {

        return new PetBuilder();
    }

    withName(
        name: string
    ) {

        this.pet.name =
            name;

        return this;
    }

    withStatus(
        status: PetStatus
    ) {

        this.pet.status =
            status;

        return this;
    }

    build(): Pet {

        return this.pet;
    }
}