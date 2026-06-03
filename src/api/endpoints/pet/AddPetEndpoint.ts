import { ApiPaths } from '../../config/api-paths';
import { IHttpRequest } from '../../contracts/IHttpRequest';
import { HttpMethod } from '../../contracts/HttpMethod';
import { Pet } from '../../models/Pet';

export class AddPetEndpoint implements IHttpRequest {
    readonly method = HttpMethod.POST;
    readonly url = ApiPaths.pet;
    readonly headers = { 'Content-Type': 'application/json' };

    constructor(readonly body: Pet) {}
}
