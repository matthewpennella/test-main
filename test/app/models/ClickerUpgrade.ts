import { ClickerButton, Requirements, Resource } from "./Clicker";

export class ClickerUpgrade extends ClickerButton {
    Modify: string;
    ModifyType: string;
    ResourceAdded: Resource[];
    Cost: Requirements;
    ModalData: ModalData;
}

export class ModalData {
    Title: string;
    Description: string;
    ButtonTitle: string;
    ModalUpgrades: ModalUpgrade[];
}

export class ModalUpgrade extends ClickerButton {
    Description: string;
    Selected = false;
}

