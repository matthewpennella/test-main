import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hersir',
  templateUrl: './hersir.component.html',
  styleUrls: ['./hersir.component.scss']
})
export class HersirComponent implements OnInit {

  FirstNames: string = 'Agnar, An, Alfr, Alvi, Ari, Arinbjorn, Arngeir, Arngrim, Arnfinn, Asgeirr, Askell, Asvald, Bard, Baror, Bersi, Borkr, Bjarni, Bjorn, Brand, Brandr, Cairn, Canute, Dar, Einarr, Eirik, Egill, Engli, Eyvindr, Erik, Eyvind, Finnr, Floki, Fromund, Geirmundr, Geirr, Geri, Gisli, Gizzur, Gjafvaldr, Glumr, Gorm, Grmir, Gunnarr, Guomundr, Hak, Halbjorn, Halfdan, Hallvard, Hamal, Hamundr, Harald, Harek, Hedinn, Helgi, Henrik, Herbjorn, Herjolfr, Hildir, Hogni, Hrani, Hrolf, Ivarr, Jimmy, Jon, Jorund, Kalf, Ketil, Kheldar, Klaengr, Knut, Kolbeinn, Kolli, Kollr, Lambi, Magnus, Moldof, Mursi, Njall, Oddr, Olaf, Orlyg, Ormr, Ornolf, Osvald, Ozurr, Poror, Prondir, Ragi, Ragnvald, Refr, Runolf, Saemund, Siegfried, Sigmundr, Sigurd, Sigvat, Skeggi, Skomlr, Slode, Snorri, Sokkolf, Solvi, Surt, Sven, Thangbrand, Thjodoft, Thorod, Thorgest, Thorvald, Thrain, Throst, Torfi, Torix, Tryfing, Ulf, Valgaror, Vali, Vifil, Vigfus, Vika, Waltheof';
  FirstNamesArray: string[] = [];
  MiddleNames: string = 'Aesir, Axe, Bear, Berg, Biscuit, Blade, Blood, Blue, Boar, Board, Bone, Cage, Cave, Cheese, Code, Coffee, Death, Dragon, Dwarf, Eel, Elk, Fjord, Flame, Flour, Forge, Fork, Fox, Frost, Furnace, Goat, God, Gold, Granite, Griffon, Grim, Haggis, Hall, Hamarr, Helm, Horn, Horse, House, Huskarl, Ice, Iceberg, Jarl, Kelp, Kettle, Kraken, Lake, Long, Mace, Maelstrom, Mail, Mammoth, Man, Many, Mead, Mountain, Noun, Oath, Owl, Pain, Peak, Pot, Rat, Raven, Red, Refreshingbeverage, Ring, Rock, Root, Rune, Salmon, Sap, Sea, Shield, Ship, Sky, Slush, Smoke, Snow, Spear, Squid, Steam, Stone, Swine, Three, Tongue, Torch, Tree, Troll, Ulfsark, Unsightly, Valkyrie, Wave, White, Woman, Worm, Wyvern';
  MiddleNamesArray: string[] = [];
  LastNames: string = 'Admirer, Arm, Back, Baker, Basher, Beard, Bearer, Bender, Blade, Blender, Blood, Boiler, Bone, Boot, Borer, Born, Bow, Breaker, Breeder, Bringer, Brow, Builder, Chaser, Chiller, Collar, Counter, Clubber, Curser, Dancer, Dottir, Dreamer, Drinker, Drowner, Ear, Eater, Face, Fearer, Foot, Friend, Fury, Gorer, Grim, Grinder, Grower, Growth, Hacker, Hall, Ham, Hammer, Hand, Hands, Head, Hilt, Hunter, Killer, Leg, Licker, Liker, Lost, Lover, Masher, Mender, Minder, Miner, Mocker, Monger, Neck, Rage, Rhyme, Rider, Ringer, Roarer, Roller, Sailor, Screamer, Sequel, Server, Shield, Shoe, Singer, Skinner, Slinger, Slugger, Smasher, Sniffer, Stinker, Sucker, Sword, Tail, Tamer, Taster, Thigh, Tongue, Tracker, Washer, Wielder, Wing, Wisher, Wrath';
  LastNamesArray: string[] = [];
  Name = {
    First: '',
    Middle: '',
    Last: ''
  }

  constructor() { }

  ngOnInit() {
    this.FirstNamesArray = this.FirstNames.split(',');
    this.MiddleNamesArray = this.MiddleNames.split(',');
    this.LastNamesArray = this.LastNames.split(',');
  }

  generate() {
    this.Name.First = this.FirstNamesArray[Math.floor(Math.random() * this.FirstNamesArray.length)].trim();
    this.Name.Middle = this.MiddleNamesArray[Math.floor(Math.random() * this.MiddleNamesArray.length)].trim();
    this.Name.Last = this.LastNamesArray[Math.floor(Math.random() * this.LastNamesArray.length)].trim();
  }

}
