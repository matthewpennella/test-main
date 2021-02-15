import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ClickerLog, Requirements, UserInventory } from '../models/Clicker';
import { ClickerBuilding } from '../models/ClickerBuilding';
import { ScreenService } from '../screen.service';
import { ClickerService } from './../clicker.service';
import { ClickerAction } from './../models/ClickerAction';
import { ClickerUnit } from './../models/ClickerUnits';
import { ClickerUpgrade, ModalUpgrade } from './../models/ClickerUpgrade';

@Component({
  selector: 'app-clicker',
  styleUrls: ['./clicker.component.scss'],
  templateUrl: './clicker.component.html',
})
export class ClickerComponent implements OnInit {

  @ViewChild('UpgradeModal', {static: true}) public UpgradeModalRef: ElementRef;

  public divHeight;
  public divWidth;
  public iconGridWidth;
  public iconGridHeight;
  public navheight;

  public showNavResources = true;

  public IconRows: number[];
  public IconRowSizeArray: number[];
  public IconRowsAmount: number;
  public IconRowSize: number;

  public Inventory = new UserInventory();
  public selectedModalUpgrade = new ClickerUpgrade();
  public selectedModalUpgradeChoice = new ModalUpgrade();
  public textLog: ClickerLog[] = [];
  public maxLogLength = 50;

  constructor(
    private clickerService: ClickerService,
    private screenService: ScreenService,
    private ngbModal: NgbModal,
  ) { }

  public ngOnInit(): void {
    this.divHeight = this.screenService.getScreenHeight() - 100 + 'px';
    this.divWidth = this.screenService.getScreenWidth() - 30 + 'px';
    this.Inventory.Resources.find((resource) => resource.Name === 'Food').Owned = 100000;
    this.Inventory.Resources.find((resource) => resource.Name === 'Lumber').Owned = 100000;
    this.Inventory.Resources.find((resource) => resource.Name === 'Gold').Owned = 100000;
    this.formatIconGrid();
    this.logDetails('Welcome to the game! Logs of important activity will be displayed here.');
  }

  public onResize(event): void {
    this.divHeight = this.screenService.getScreenHeight() - 100 + 'px';
    this.divWidth = this.screenService.getScreenWidth() - 30 + 'px';
    this.formatIconGrid();
  }

  private formatIconGrid(): void {
    if (this.screenService.getScreenWidth() > 575) {
      // sidebar exists
      this.iconGridWidth = this.screenService.getScreenWidth() - 240;
      this.iconGridHeight = this.screenService.getScreenHeight() - 320 + 'px';
    } else {
      // sidebar does not exist
      this.iconGridWidth = this.screenService.getScreenWidth() - 30;
      this.iconGridHeight = this.screenService.getScreenHeight() - 320 + 'px';
    }

    this.IconRowSize = Math.floor(this.iconGridWidth / 89);

    this.IconRowsAmount = Math.ceil(this.Inventory.Actions.length / this.IconRowSize);
    this.IconRowSizeArray = [];
    this.IconRows = [];
    for (let i = 0; i < this.IconRowSize; i++) {
      this.IconRowSizeArray.push(i);
    }
    for (let i = 0; i < this.IconRowsAmount; i++) {
      this.IconRows.push(i);
    }
  }

  public clickedButton(manuallyClicked: boolean, item: any, buttonType: string): void {
    if (buttonType === 'Actions') {
      this.executeAction(item, manuallyClicked);
    } else if (buttonType === 'Buildings') {
      this.buyBuilding(item, manuallyClicked);
    } else if (buttonType === 'Units') {
      this.buyUnit(item);
    } else if (buttonType === 'Upgrades') {
      this.buyUpgrade(item, this.UpgradeModalRef);
    }
  }

  private executeAction(action: ClickerAction, manuallyClicked: boolean): void {
    if (manuallyClicked === true && action.Disabled || !action.Unlocked) { return; }
    if (!this.canAfford(action)) { return; }

    action.Progress++;
    action.Disabled = true;
    if (manuallyClicked === true) {
      this.Inventory.Fields.forEach((req) => {
        action.Cost[req].forEach((resource) => {
          this.getInventoryItem(resource.Name, req).Owned = this.getInventoryItem(resource.Name, req).Owned - resource.Amount;
        });
      });
    }
    if (action.ActionType === 'Raid') {
      if (this.getInventoryItem('Knight', 'Units').Owned === 0) { 
        this.logDetails('You need knights to be able to raid!');
        { return; }
      }
      if (action.Name === 'Raid Village') {
        this.sendRaidingParty(action, manuallyClicked,  5, 1);
      } else if (action.Name === 'Pillage Castle') {
        this.sendRaidingParty(action, manuallyClicked, 25, 5);
      }
    } else {
      setTimeout(() => {
        if (action.Progress < 100) {
          this.executeAction(action, false);
        } else {
          if (action.ActionType === 'Harvest') { 
             // For each resource to be added by harvesting, add the correct amount to the inventory
            action.ResourceAdded.forEach((resource) => {
            this.getInventoryItem(resource.Name, 'Resources').Owned =
              this.getInventoryItem(resource.Name, 'Resources').Owned + resource.Amount;
            });
          } else if(action.ActionType === 'Spell') {
            if (this.getInventoryItem('Wizard', 'Units').Owned < 1) {
              this.logDetails('You can\'t cast a spell with no wizards!');
              return;
            }
            if (action.Name === 'Experiment') {
              this.castExperiment();
            } else if (action.Name === 'Midas Touch') {
              this.castMidasTouch();
            } else if (action.Name === 'Conjure Golem') {
              this.castConjureGolem();
            }
          }
          this.checkAllUnlocks();
          action.Disabled = false;
          action.Progress = 0;
        }
      },
      (action.Time / 100));  
    }
  }

  private castExperiment(): void {
    const roll = Math.floor((Math.random() * Math.floor(99)) + 1);
    const minRollToFail = 25 + (this.getInventoryItem('Wizard', 'Units').Owned * 2);
    const discoverNewSpell = 10 + Math.floor(this.getInventoryItem('Wizard', 'Units').Owned / 25);
    const scaledResourceAmount = 20 * this.getInventoryItem('Wizard', 'Units').Owned;
    if (roll > minRollToFail) {
      // Failure based on wizards owned.
      this.logDetails('Your experimental spell fizzles. Nothing happens.');
    } else if (roll <= minRollToFail && roll > discoverNewSpell) {
      // Typical result, create a random amount of a resource scaled with wizards owned
      const resource = Math.floor((Math.random() * Math.floor(this.Inventory.Resources.length)));
      const added = Math.floor((Math.random() * Math.floor(scaledResourceAmount)) + 10);
      this.Inventory.Resources[resource].Owned += added;
      this.logDetails('Your experiment spell conjured ' + added + ' ' + this.Inventory.Resources[resource].Name + '!') ;
    } else if (roll <= discoverNewSpell) {
      const nextSpellToUnlock = this.Inventory.Actions.find((action) => action.ActionType === 'Spell' && action.SpecialUnlock === true && action.Unlocked === false);
      if(nextSpellToUnlock !== undefined) {
        // Unlock the next spell in the progression if one exists
        nextSpellToUnlock.Unlocked = true;
        nextSpellToUnlock.Visible = true;
        this.logDetails('Through vigorous research (and some blind luck), your wizards discovered how to cast ' + nextSpellToUnlock.Name + '. Huzzah!');
      } else {
        // If all spells are owned, create a random amount of a resource
        const resource = Math.floor((Math.random() * Math.floor(this.Inventory.Resources.length)));
        const added = Math.floor((Math.random() * Math.floor(scaledResourceAmount)) + 10);
        this.Inventory.Resources[resource].Owned += added;
        this.logDetails('Your experiment spell conjured ' + added + ' ' + this.Inventory.Resources[resource].Name + '!') ;
      }
    }
  }

  private castMidasTouch(): void {
    const roll = Math.floor((Math.random() * Math.floor(99)) + 1);
    if (roll > 1) {
      // Turn wood into gold, scaled with wizard amount
      let gold = Math.floor((Math.random() * Math.floor(100 * this.getInventoryItem('Wizard', 'Units').Owned))) + 50;
      if (this.getInventoryItem('Lumber', 'Resources').Owned < gold) {
        gold = this.getInventoryItem('Lumber', 'Resources').Owned;
      }
      this.getInventoryItem('Lumber', 'Resources').Owned -= gold;
      this.getInventoryItem('Gold', 'Resources').Owned += gold;
      this.logDetails('Your wizards successfully turned ' + gold + ' lumber into gold.');
    } else {
      // 1% chance to lose a wizard
      const gold = Math.floor((Math.random() * Math.floor(150))) + 100;
      this.getInventoryItem('Wizard', 'Units').Owned +- 1;
      this.getInventoryItem('Gold', 'Resources').Owned += gold;
      this.logDetails('One of your wizards accidentally turned himself to gold. Oops. At least he was worth ' + gold + ' gold.');
    }
  }

  private castConjureGolem(): void {
    const golems = this.getInventoryItem('Golem', 'Units');
    if(golems.Unlocked === false) {
      golems.Unlocked = true;
      golems.Visible = true;
    }
    golems.Owned += 1;
  }

  private sendRaidingParty(action: ClickerAction, manuallyClicked: boolean, knightsSent: number, difficulty: number): void {
    let knightsToSend = knightsSent;
    if (manuallyClicked === true) {
      if (knightsToSend > this.getInventoryItem('Knight', 'Units').Owned) {
        knightsToSend = this.getInventoryItem('Knight', 'Units').Owned;
      }
      this.getInventoryItem('Knight', 'Units').Owned = this.getInventoryItem('Knight', 'Units').Owned - knightsToSend;
    } else {
      knightsToSend = knightsSent;
    }
    action.Progress++;
    action.Disabled = true;
    setTimeout(() => {
        if (action.Progress < 100) {
          this.sendRaidingParty(action, false, knightsToSend, difficulty);
        } else {
          // Determine how many knights die and how many resources are generated and assign them
          let knightsKilled = Math.floor(Math.random() * Math.ceil(knightsToSend * (7 - difficulty)));
          if (knightsKilled > knightsToSend) {
            knightsKilled = 0;
          }
          if (knightsKilled < 0) { knightsKilled = 0; }

          const knightsAlive = knightsToSend - knightsKilled;
          this.getInventoryItem('Knight', 'Units').Owned += knightsAlive;

          if (knightsKilled !== knightsToSend) {
            const foodReturn = Math.floor((Math.random() * Math.floor(100 * difficulty * knightsAlive)) + (10 * knightsAlive));
            const lumberReturn = Math.floor((Math.random() * Math.floor(70 * difficulty * knightsAlive)) + (5 * knightsAlive));
            const goldReturn = Math.floor((Math.random() * Math.floor(25 * difficulty * knightsAlive)) + knightsAlive);
            this.getInventoryItem('Food', 'Resources').Owned += foodReturn;
            this.getInventoryItem('Lumber', 'Resources').Owned += lumberReturn;
            this.getInventoryItem('Gold', 'Resources').Owned += goldReturn;

            if (knightsKilled > 0) {
              this.logDetails('Your knights returned from pillaging with ' + foodReturn + ' food, ' +
                lumberReturn + ' lumber, and ' + goldReturn + ' gold. Unfortunately, ' + knightsKilled + ' knights were slain in battle.');
            } else {
              this.logDetails('Your knights returned from pillaging with ' + foodReturn + ' food, ' +
                lumberReturn + ' lumber, and ' + goldReturn + ' gold. Fortunately, no knights were lost!');
            }
          } else {
            if (knightsToSend === 1) {
              this.logDetails('The lonely knight you sent pillaging died on his misson. What were you thinking?');
            } else {
              this.logDetails('All ' + knightsToSend + ' knights that you sent pillaging were slain on thier mission.');
            }

          }

          this.checkAllUnlocks();
          action.Disabled = false;
          action.Progress = 0;
        }
      },
      (action.Time / 100));

  }

  private buyBuilding(building: ClickerBuilding, manuallyClicked: boolean): void {
    if (!this.canAfford(building) || !building.Unlocked) {
      return;
    }
    this.Inventory.Fields.forEach((req) => {
      building.Cost[req].forEach((resource) => {
        this.getInventoryItem(resource.Name, req).Owned =
          this.getInventoryItem(resource.Name, req).Owned - resource.Amount * (building.Owned + 1);
      });
    });
    building.Owned++;
    this.checkAllUnlocks();
    if (building.Owned === 1) {
      // Turn the building on
      this.activateBuilding(building);
    }
  }

  private buyUnit(unit: ClickerUnit): void {
    if (!this.canAfford(unit) || !unit.Unlocked || unit.Name === 'Golem') {
      return;
    }
    this.Inventory.Fields.forEach((req) => {
      unit.Cost[req].forEach((resource) => {
        this.getInventoryItem(resource.Name, req).Owned =
          this.getInventoryItem(resource.Name, req).Owned - resource.Amount * (unit.Owned + 1);
      });
    });
    unit.Owned++;
    this.checkAllUnlocks();
    this.Inventory.Buildings.forEach((building) => {
      if (unit.ModifiedBuilding === building.Name) {
        unit.ResourceAdded.forEach((resource) => {
          const buildingResourceIndex = building.ResourceAdded.findIndex((res) => res.Name === resource.Name);
          if (buildingResourceIndex > -1) {
            building.ResourceAdded[buildingResourceIndex].Amount = building.ResourceAdded[buildingResourceIndex].Amount + resource.Amount;
          } else {
            building.ResourceAdded.push(resource);
          }
        });
      }
    });
  }

  private buyUpgrade(upgrade: ClickerUpgrade, content: any): void {
    if (!this.canAfford(upgrade) || !upgrade.Unlocked || upgrade.Owned > 0) {
      return;
    }
    this.Inventory.Fields.forEach((req) => {
      upgrade.Cost[req].forEach((resource) => {
        this.getInventoryItem(resource.Name, req).Owned =
          this.getInventoryItem(resource.Name, req).Owned - resource.Amount * (upgrade.Owned + 1);
      });
    });
    upgrade.Owned++;

    if (upgrade.ModifyType !== 'Global') {
      const modifiedItem = this.Inventory[upgrade.ModifyType].find((item) => item.Name === upgrade.Modify);
      upgrade.ResourceAdded.forEach((resourceAdded) => {
        const resOrigIndex = modifiedItem.ResourceAdded.findIndex((resourceOriginal) => resourceOriginal.Name === resourceAdded.Name);
        if (resOrigIndex > -1) {
          modifiedItem.ResourceAdded[resOrigIndex].Amount = modifiedItem.ResourceAdded[resOrigIndex].Amount + resourceAdded.Amount;
        } else {
          modifiedItem.ResourceAdded.push(resourceAdded);
        }
      });
    } else {
      if (upgrade.ModalData.Title !== '') {
        this.selectedModalUpgrade = upgrade;
        this.openModal(content);
      }
    }
    this.checkAllUnlocks();
  }

  public canAfford(item: any): boolean {
    let canafford = true;
    this.Inventory.Fields.forEach((req) => {
      if (item.Cost[req] !== undefined) {
        item.Cost[req].forEach((resource) => {
          if (this.getInventoryItem(resource.Name, req).Owned < (resource.Amount * (item.Owned + 1))) {
            canafford = false;
          }
        });
      }
    });
    return canafford;
  }

  private activateBuilding(building: ClickerBuilding): void {
    interval(building.Time / 100)
        .pipe(takeWhile(() => true))
        .subscribe(() => {
          building.Progress++;
          if (building.Progress === 100) {
            let golems;
            if(this.getInventoryItem('Golem', 'Units') !== undefined) {
              golems = this.getInventoryItem('Golem', 'Units').Owned;
            } else {
              golems = 0;
            }
            building.ResourceAdded.forEach((resource) => {
              let productionModifier = building.Owned + golems;
              this.getInventoryItem(resource.Name, 'Resources').Owned += (resource.Amount * productionModifier);
          });
          this.checkAllUnlocks();
          building.Progress = 0;
        }
      });
  }

  public getInventoryItem(name: string, field: string): any {
    return this.Inventory[field].find((invitem) => invitem.Name === name);
  }

  public itemHasCost(item: Requirements): boolean {
    let hasCost = false;
    this.Inventory.Fields.forEach((req) => {
      if (item[req].length > 0) {
        hasCost = true;
      }
    });
    return hasCost;
  }

  private checkAllUnlocks(): void {
    let toBeUnlocked = false;
    let toBeVisible = false;
    this.Inventory.Fields.forEach((field) => {
      this.Inventory[field].forEach((item) => {
         if (item.Unlocked === false) {
          toBeUnlocked = true;
          this.Inventory.Fields.forEach((reqfield) => {
            if (item.UnlockRequirements[reqfield].length > 0) {
              item.UnlockRequirements[reqfield].forEach((req) => {
                const resourceChecked = this.Inventory[req.Type].find((i) => i.Name === req.Name);
                if (resourceChecked.Owned < req.Amount) {
                  toBeUnlocked = false;
                }
              });
            }
          });
          if (toBeUnlocked === true && item.SpecialUnlock === false) {
            item.Unlocked = true;
          }
         }
         if (item.Visible === false) {
          toBeVisible = true;
          this.Inventory.Fields.forEach((reqfield) => {
            if (item.VisibilityRequirements[reqfield].length > 0) {
              item.VisibilityRequirements[reqfield].forEach((req) => {
                const resourceChecked = this.Inventory[req.Type].find((i) => i.Name === req.Name);
                if (resourceChecked.Owned < req.Amount) {
                  toBeVisible = false;
                }
              });
            }
          });
          if (toBeVisible === true && item.SpecialUnlock === false) {
            item.Visible = true;
          }
         }
      });
    });
  }

  private openModal(content: any): void {
    this.ngbModal.open(content, { centered: true, backdrop: 'static', keyboard: false, windowClass: 'modal-dark' });
  }

  public modalOptionSelect(choice: ModalUpgrade): void {
    this.selectedModalUpgradeChoice = choice;
    this.selectedModalUpgrade.ModalData.ModalUpgrades.forEach((upgrade) => upgrade.Selected = false);
    this.selectedModalUpgradeChoice.Selected = true;
  }

  public modalFinalSelect(): void {
    this.Inventory.Fields.forEach((field) => {
      this.clickerService.getFactionChoice(this.selectedModalUpgradeChoice.Name)[field].forEach((item) => {
        this.Inventory[field].push(item);
      });
    });

    this.selectedModalUpgrade = new ClickerUpgrade();
    this.selectedModalUpgradeChoice = new ModalUpgrade();
    this.ngbModal.dismissAll();
  }

  public logDetails(details: string): void {
    const log = new ClickerLog();
    log.Date = '[' + formatDate(new Date(), 'h:mm:ss a, MM/dd/yyyy', 'en') + ']';
    log.Text = details;

    if (this.textLog.length > this.maxLogLength) {
      this.textLog.pop();
    }
    this.textLog.unshift(log);
  }
}
