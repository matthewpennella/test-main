import { ClickerButton, Requirements, Resource } from "./Clicker";

export class ClickerBuilding extends ClickerButton{
    Time: number;
    TimeLabel: string;
    ResourceAdded: Resource[];
    Progress = 0;
    Cost: Requirements;
}
