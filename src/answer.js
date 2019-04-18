/**
 * @example
 * hand(["A♠", "A♦"], ["J♣", "5♥", "10♥", "2♥", "3♦"])
 * // ...should return {type: "pair", ranks: ["A", "J", "10", "5"]}
 * hand(["A♠", "K♦"], ["J♥", "5♥", "10♥", "Q♥", "3♥"])
 * // ...should return {type: "flush", ranks: ["Q", "J", "10", "5", "3"]}
 */

const nums = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
const suits = ['♠', '♦', '♥', '♣']
const handList = [
  'straight-flush', // 同花顺
  'four-of-a-kind', // 四条
  'full house',     // 葫芦
  'flush',          // 同花
  'straight',       // 顺子
  'three-of-a-kind',// 三条
  'two pair',       // 两对
  'pair',           // 一对
  'nothing'         // 高牌
]

export function hand(holeCards, communityCards) {
  // TODO
  return {
    type: 'nothing',
    ranks: ['J', '10', '9', '8', '7']
  }
}