import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInventory } from './models/Clicker';
import { ActionList, ResourcesList, BuildingsList, UnitList, UpgradesList, KnightFaction, PriestFaction, WizardFaction } from './models/ClickerDataLists';

@Injectable({
  providedIn: 'root'
})
export class ClickerService {

  constructor() { }

  Inventory: BehaviorSubject<UserInventory> = new BehaviorSubject(new UserInventory);

  getIconsList() {
    return ActionList;
  }

  getResourcesList() {
    return ResourcesList;
  }

  getBuildingsList() {
    return BuildingsList;
  }

  getUnitList() {
    return UnitList;
  }

  getUpgradeList() {
    return UpgradesList;
  }

  getFactionChoice(faction: string) {
    if (faction === 'Establish a knightly order.') {
      return KnightFaction;
    } else if (faction === 'Establish a priesthood.') {
      return PriestFaction;
    } else if (faction === 'Establish a college of magic.') {
      return WizardFaction;
    }
  }
}
