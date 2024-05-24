import Card, { CardRawData, createCard } from "./card";
import Duel from "./duel";
import Player from "./player";

export class Deck {
  cards: Card[] = [];
  owner: Player;

  constructor(cards: CardRawData[], duel: Duel) {
    this.cards = cards.map(item => createCard(item, { duel }));
    this.owner = duel.self;
  }

  get num() {
    return this.cards.length;
  }

  pop(num: number, force = false) {
    if (this.num < num && force) {
      this.owner.duel.lose();
      return [];
    }
    const cards: Card[] = [];
    for (let i = 0; i < num; i += 1) {
      const card = this.cards.pop();
      if (!card) {
        break;
      }
      cards.push(card);
    }
    return cards;
  }

  shuffle() {}

  search() {}
}