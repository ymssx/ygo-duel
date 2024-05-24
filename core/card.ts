import Duel from "./duel";
import Player from "./player";

export enum CARD_TYPE {
  MONSTER = 'monster',
  SPELL = 'spell',
  TRAP = 'trap',
}

export default class Card {
  id: string;
  name: string;
  desc: string;
  type: CARD_TYPE;

  player: Player;
  duel: Duel;
  rawData: CardRawData;

  // load into deck
  constructor({ duel, card }) {
    this.duel = duel;
    this.player = duel.player;
    this.rawData = card;
  }

  status: {
    data: {
      name: string;
      level?: number;
      rank?: number;
      attack?: number;
      defend?: number;
      type: CARD_TYPE;
    };
  };

  // reset card status
  reset() {}

  handleLifeHook(event: string) {}
}


export enum MONSTER_ATTR {
  LIGHT = 'light',
  DARK = 'dark',
  // ...
}

export enum MONSTER_TYPE {
  NORMAL = 'normal',
  EFFECT = 'effect',
  FUSION = 'fusion',
  RITUAL = 'ritial',
  SYNCHRO = 'synchro',
  XYZ = 'xyz',
  PENDULUM = 'pendulum',
  LINK = 'link',
}

export enum SUB_MONSTER_TYPE {
  EFFECT = 'effect',
  TUNER = 'tuner',
  // ...
}

export class Monster extends Card {
  attack: number;
  defend?: number;
  level?: number;
  rank?: number;
  attribute: MONSTER_ATTR;
  monsterType: MONSTER_TYPE;
  subTypes?: SUB_MONSTER_TYPE[];

  type = CARD_TYPE.MONSTER;
}


export enum SUB_SPELL_TYPE {
  NORMAL = 'normal',
  QUICK = 'quick',
  CONTINUOUS = 'continuous',
  EQUIP = 'equip',
  FIELD = 'field',
  RITUAL = 'ritual',
}

export class Spell extends Card {
  type = CARD_TYPE.SPELL;
  subTypes?: SUB_SPELL_TYPE[];
}


export enum SUB_TRAP_TYPE {
  NORMAL = 'normal',
  CONTINUOUS = 'continuous',
  COUNTER = 'counter',
}

export class Trap extends Card {
  type = CARD_TYPE.TRAP;
  subTypes?: SUB_TRAP_TYPE[];
}


export type SUB_CARD_TYPE = SUB_MONSTER_TYPE | SUB_SPELL_TYPE | SUB_TRAP_TYPE;


export interface CardRawData {
  data: {
    id: string;
    type: CARD_TYPE;
    monsterType?: MONSTER_TYPE;
    subTypes?: SUB_CARD_TYPE[];
    name: string;
    desc: string;
    attack?: number;
    defend?: number;
    level?: number;
    rank?: number;
  };
  // lifecycle: {
  //   [event: string]: () => Promise<void>
  // };
}

export function createCard(card: CardRawData, { duel }: { duel: Duel }) {
  if (card?.data?.type === CARD_TYPE.MONSTER) {
    return new Monster({ duel, card });
  } else if (card?.data?.type === CARD_TYPE.SPELL) {
    return new Spell({ duel, card });
  } else if (card?.data?.type === CARD_TYPE.TRAP) {
    return new Spell({ duel, card });
  } else {
    throw new Error(`unknown card type ${card?.data?.type}`);
  }
}