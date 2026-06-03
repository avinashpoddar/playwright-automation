import { PageFactory } from "./PageFactory";
import { LoginFlow } from "../flows/LoginFlow";

export class UIFactory{
    readonly login: LoginFlow;

    constructor(pageFactory: PageFactory){
        this.login = new LoginFlow(pageFactory.login);
    }
}