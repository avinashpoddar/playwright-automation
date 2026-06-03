import { Category } from "./Category";
import { Tag } from "./Tag";
import { PetStatus } from "../enums/PetStatus";

export interface Pet {

    id: number;

    category?: Category;

    name: string;

    photoUrls: string[];

    tags?: Tag[];

    status: PetStatus;
}