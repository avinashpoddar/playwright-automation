import { ApiPaths } from '../../config/api-paths';
import { IHttpRequest } from '../../contracts/IHttpRequest';
import { HttpMethod } from '../../contracts/HttpMethod';
import { PetStatus } from '../../enums/PetStatus';

export class GetPetByStatusEndpoint implements IHttpRequest {
    readonly method = HttpMethod.GET;
    readonly url = ApiPaths.petFindByStatus;
    readonly headers = { Accept: 'application/json' };
    readonly queryParams: Record<string, string>;

    constructor(status: PetStatus) {
        this.queryParams = { status };
    }
}
