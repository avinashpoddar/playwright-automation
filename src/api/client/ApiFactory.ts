import { PetService } from "../services/PetService";
import { ApiClient } from "./ApiClient";

export class ApiFactory {

    readonly petService: PetService;

    constructor(
        private readonly apiClient: ApiClient
    ) {
        this.petService = new PetService(this.apiClient);
    }
}