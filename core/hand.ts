import Card, { CardRawData, createCard } from "./card";
import Duel from "./duel";
import Player from "./player";

export default class Deck {
  maxLen = 6;
  cards: Card[] = [];
  owner: Player;

  constructor(cards: Card[], duel: Duel) {
    this.cards = cards;
    this.owner = duel.self;
  }

  get num() {
    return this.cards.length;
  }

  shuffle() {}

  add(cards: Card[]) {
    this.cards = [
      ...this.cards,
      ...cards,
    ];
    // TODO: 补充action
    this.shuffle();
  }

  has(card: Card) {
    return this.cards.includes(card);
  }
}