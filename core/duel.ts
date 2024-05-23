import Player from "./player";

export default class Duel {
  self: Player;
  opponent: Player;

  constructor({
    self,
    opponent,
  }: {
    self: Player;
    opponent: Player;
  }) {
    this.self = self;
    this.opponent = opponent;
  }

  lose() {
    console.log('game lose');
    throw new Error('lose');
  }

  selfTurn: boolean;

  get currentPlayer() {
    return this.selfTurn ? this.self : this.opponent;
  }

  switchPlayer() {
    this.selfTurn = !this.selfTurn;
  }

  phase = {
    m1() {},
    battle() {},
    m2() {},
    end() {},
  }

  start(first: boolean) {
    this.selfTurn = first;
  }
}