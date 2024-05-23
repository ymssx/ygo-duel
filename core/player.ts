import Card, { CardRawData } from "./card";
import { Deck } from "./deck";
import Duel from "./duel";
import Hand from "./hand";

export default class Player {
  _LP = 8000;
  Deck: Deck;
  Hand: Hand;
  GY: Card[] = [];
  Banished: Card[] = [];
  MonsterField: Card[] = [];
  SpellField: Card[] = [];

  duel: Duel;

  constructor({ duel, deck, LP = 8000 }: { duel: Duel, deck: CardRawData[], LP?: number }) {
    this.duel = duel;
    this._LP = LP;
    this.Deck = new Deck(deck, duel);
    this.Hand = new Hand([], duel);
  }

  summonRemains = 1;

  summon(card: Card) {
    if (this.summonRemains <= 0) {
      throw new Error('you dont have summon times');
    }
    if (card.player === this && this.Hand.has(card)) {
      this.MonsterField.push(card); // TODO: player should select monster field
      this.summonRemains -= 1;
    }
  }

  get LP() {
    return this._LP;
  }

  set LP(value: number) {
    this._LP = value;
    if (this._LP <=0) {
      this.duel.lose();
    }
  }

  draw(num: number = 1) {
    // TODO: 补充action
    const cards = this.Deck.pop(num, true);
    this.Hand.add(cards);
  }
}