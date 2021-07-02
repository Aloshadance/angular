import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Pudge', power: 20, skill: [{ id: 1, name: 'Meat Hook'}], level: 30 },
      { id: 2, name: 'Mirana', power: 19, skill: [{ id: 2, name: 'Sacred Arrow'}], level: 29 },
      { id: 3, name: 'Techies', power: 18, skill: [{ id: 3, name: 'Remote Mines'}], level: 28  },
      { id: 4, name: 'Magnus', power: 17, skill: [{ id: 4, name: 'Skewer'}], level: 27  },
      { id: 5, name: 'Anti-Mage', power: 16, skill: [{ id: 5, name: 'Mana Void'}], level: 26  },
      { id: 6, name: 'Lifestealer', power: 15, skill: [{ id: 6, name: 'Infest'}], level: 25  },
      { id: 7, name: 'Rubick', power: 14, skill: [{ id: 7, name: 'Fade Bolt'}], level: 24  },
      { id: 8, name: 'Io', power: 13, skill: [{ id: 8, name: 'Relocate'}], level: 23  },
      { id: 9, name: 'Lina', power: 12, skill: [{ id: 9, name: 'Laguna Blade'}], level: 22  },
      { id: 10, name: 'Mars', power: 11, skill: [{ id: 10, name: 'Arena of Blood'}], level: 21  }
    ];
    return {heroes};
  }

  constructor() { }
}
