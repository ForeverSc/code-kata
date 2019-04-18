import {
  hand
} from '../answer'
import {
  dgtestmachine,
  finalRandomList
} from '../__mock__/mock'

describe('run spec hands', () => {
  it('should be nothing', () => {
    expect({
      type: "nothing",
      ranks: ["A", "K", "Q", "J", "9"]
    }).toMatchObject(hand(["K♠", "A♦"], ["J♣", "Q♥", "9♥", "2♥", "3♦"]))
  })

  it('should be pair', () => {
    expect({
      type: "pair",
      ranks: ["Q", "K", "J", "9"]
    }).toMatchObject(hand(["K♠", "Q♦"], ["J♣", "Q♥", "9♥", "2♥", "3♦"]))
  })

  it('should be two pair', () => {
    expect({
      type: "two pair",
      ranks: ["K", "J", "9"]
    }).toMatchObject(hand(["K♠", "J♦"], ["J♣", "K♥", "9♥", "2♥", "3♦"]))
  })

  it('should be three-of-a-kind', () => {
    expect({
      type: "three-of-a-kind",
      ranks: ["Q", "J", "9"]
    }).toMatchObject(hand(["4♠", "9♦"], ["J♣", "Q♥", "Q♠", "2♥", "Q♦"]))
  })

  it('should be straight', () => {
    expect({
      type: "straight",
      ranks: ["K", "Q", "J", "10", "9"]
    }).toMatchObject(hand(["Q♠", "2♦"], ["J♣", "10♥", "9♥", "K♥", "3♦"]))
  })

  it('should be straight', () => {
    expect({
      type: "straight",
      ranks: ["K", "Q", "J", "10", "9"]
    }).toMatchObject(hand(["Q♠", "K♦"], ["J♣", "10♥", "9♥", "K♥", "K♦"]))
  })

  it('should be flush', () => {
    expect({
      type: "flush",
      ranks: ["Q", "J", "10", "5", "3"]
    }).toMatchObject(hand(["A♠", "K♦"], ["J♥", "5♥", "10♥", "Q♥", "3♥"]))
  })

  it('should be full house', () => {
    expect({
      type: "full house",
      ranks: ["A", "K"]
    }).toMatchObject(hand(["A♠", "A♦"], ["K♣", "K♥", "A♥", "Q♥", "3♦"]))
  });

  it('should be full house', () => {
    expect({
      type: "full house",
      ranks: ["10", "K"]
    }).toMatchObject(hand(["10♠", "10♦"], ["K♣", "K♥", "10♥", "Q♥", "3♦"]))
  })

  it('should be four-of-a-kind', () => {
    expect({
      type: "four-of-a-kind",
      ranks: ["2", "3"]
    }).toMatchObject(hand(["2♠", "3♦"], ["2♣", "2♥", "3♠", "3♥", "2♦"]))
  })

  it('should be straight-flush', () => {
    expect({
      type: "straight-flush",
      ranks: ["J", "10", "9", "8", "7"]
    }).toMatchObject(hand(["8♠", "6♠"], ["7♠", "5♠", "9♠", "J♠", "10♠"]))
  })
})

describe('run random hands', () => {
  for (let i = 0; i < finalRandomList.length; i++) {
    const r = dgtestmachine(finalRandomList[i][0], finalRandomList[i][1]);

    it(`should be ${r.type}`, () => {
      expect(r).toMatchObject(hand(finalRandomList[i][0], finalRandomList[i][1]));
    });
  }
})