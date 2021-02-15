import { ClickerButton, Requirements, Resource } from "./Clicker";

export class ClickerAction extends ClickerButton{
    Time: number;
    TimeLabel: string;
    ResourceAdded: Resource[];
    Disabled = false;
    Progress = 0;
    ActionType: string;
    Description: string;
    Cost: Requirements;
}