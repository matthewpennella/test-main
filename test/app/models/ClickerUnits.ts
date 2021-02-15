import { ClickerButton, Requirements, Resource } from "./Clicker";

export class ClickerUnit extends ClickerButton {
    ModifiedBuilding: string;
    ResourceAdded: Resource[];
    Cost: Requirements;
    Owned: number;
}   
