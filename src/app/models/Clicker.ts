import { ResourcesList, ActionList, BuildingsList, UnitList, UpgradesList, FieldTypes } from './ClickerDataLists';

export class ClickerItem {
    Name: string;
    SpecialUnlock: boolean;
    Unlocked: boolean;
    UnlockRequirements: Requirements = new Requirements;
    Visible: boolean;
    VisibilityRequirements: Requirements = new Requirements;
}

export class ClickerButton extends ClickerItem {
    ImagePath: string;
    FlavorText: string;
    ButtonType: string;
    Owned: number
    Description: string;;
}

export class Resource {
    Name: string;
    Amount: number;
}

export class Requirement {
    Name: string;
    Amount: number;
    Type: string;
}

export class UserInventory {
    Fields = FieldTypes;
    Resources = ResourcesList;
    Actions = ActionList;
    Buildings = BuildingsList;
    Units = UnitList;
    Upgrades = UpgradesList;
}

export class Requirements {
    Resources: Requirement[] = [];
    Actions: Requirement[] = [];
    Buildings: Requirement[] = [];
    Units: Requirement[] = [];
    Upgrades: Requirement[] = [];
}

export class ClickerLog {
    Date: string;
    Text: string;
}