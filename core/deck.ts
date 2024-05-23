import Card, { CardRawData, createCard } from "./card";
import Duel from "./duel";
import Player from "./player";

export class Deck {
  deck: Card[] = [];
  owner: Player;

  constructor(deck: CardRawData[], duel: Duel) {
    this.deck = deck.map(item => createCard(item, { duel }));
    this.owner = duel.self;
  }

  get num() {
    return this.deck.length;
  }

  pop(num: number, force = false) {
    if (this.num < num && force) {
      this.owner.duel.lose();
      return [];
    }
    const cards: Card[] = [];
    for (let i = 0; i < num; i += 1) {
      const card = this.deck.pop();
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