import { ApiClient } from "../client/ApiClient";

import { ApiResponse } from "../response/ApiResponse";

import { Pet } from "../models/Pet";

import { AddPetEndpoint } from "../endpoints/pet/AddPetEndpoint";

export class PetService {

    constructor(
        private readonly apiClient:
        ApiClient
    ) {}

    async addPet(pet: Pet): Promise<ApiResponse<Pet>> {

        return this.apiClient
            .processRequest<Pet>(
                new AddPetEndpoint(pet)
            );
    }
}