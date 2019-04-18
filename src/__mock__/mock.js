export function dgtestmachine(a, b) {
  var types = ["straight-flush", "four-of-a-kind", "full house", "flush", "straight", "three-of-a-kind", "two pair", "pair", "nothing"];
  var ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  function getRank(card) {
    return ranks.indexOf(card.substring(0, card.length - 1));
  }

  function getSuit(card) {
    return card.substring(card.length - 1, card.length);
  }

  function isFlush(cards) {
    for (var i = 1; i < cards.length; i++) {
      if (getSuit(cards[i - 1]) != getSuit(cards[i])) return false;
    }
    return true;
  }

  function isStraight(cards) {
    for (var i = 1; i < cards.length; i++) {
      if (getRank(cards[i - 1]) != getRank(cards[i]) + 1) return false;
    }
    return true
  }

  function getRankText(card) {
    return card.substring(0, card.length - 1);
  }

  function makeHand(cards) {
    if (isStraight(cards) && isFlush(cards))
      return {
        type: "straight-flush",
        ranks: cards.map(getRankText)
      };
    if (getRank(cards[0]) == getRank(cards[3]))
      return {
        type: "four-of-a-kind",
        ranks: [getRankText(cards[0]), getRankText(cards[4])]
      };
    if (getRank(cards[1]) == getRank(cards[4]))
      return {
        type: "four-of-a-kind",
        ranks: [getRankText(cards[4]), getRankText(cards[0])]
      };
    if (getRank(cards[0]) == getRank(cards[2]) && getRank(cards[3]) == getRank(cards[4]))
      return {
        type: "full house",
        ranks: [getRankText(cards[0]), getRankText(cards[4])]
      };
    if (getRank(cards[0]) == getRank(cards[1]) && getRank(cards[2]) == getRank(cards[4]))
      return {
        type: "full house",
        ranks: [getRankText(cards[4]), getRankText(cards[0])]
      };
    if (isFlush(cards))
      return {
        type: "flush",
        ranks: cards.map(getRankText)
      };
    if (isStraight(cards))
      return {
        type: "straight",
        ranks: cards.map(getRankText)
      };
    if (getRank(cards[0]) == getRank(cards[2]))
      return {
        type: "three-of-a-kind",
        ranks: [getRankText(cards[0]), getRankText(cards[3]), getRankText(cards[4])]
      };
    if (getRank(cards[1]) == getRank(cards[3]))
      return {
        type: "three-of-a-kind",
        ranks: [getRankText(cards[1]), getRankText(cards[0]), getRankText(cards[4])]
      };
    if (getRank(cards[2]) == getRank(cards[4]))
      return {
        type: "three-of-a-kind",
        ranks: [getRankText(cards[2]), getRankText(cards[0]), getRankText(cards[1])]
      };
    if (getRank(cards[0]) == getRank(cards[1]) && getRank(cards[2]) == getRank(cards[3]))
      return {
        type: "two pair",
        ranks: [getRankText(cards[0]), getRankText(cards[2]), getRankText(cards[4])]
      };
    if (getRank(cards[0]) == getRank(cards[1]) && getRank(cards[3]) == getRank(cards[4]))
      return {
        type: "two pair",
        ranks: [getRankText(cards[0]), getRankText(cards[3]), getRankText(cards[2])]
      };
    if (getRank(cards[1]) == getRank(cards[2]) && getRank(cards[3]) == getRank(cards[4]))
      return {
        type: "two pair",
        ranks: [getRankText(cards[1]), getRankText(cards[3]), getRankText(cards[0])]
      };
    for (var i = 1; i < 5; i++) {
      if (getRank(cards[i - 1]) == getRank(cards[i]))
        return {
          type: "pair",
          ranks: [cards[i]].concat(cards.slice(0, i - 1)).concat(cards.slice(i + 1, 5)).map(getRankText)
        }
    }
    return {
      type: "nothing",
      ranks: cards.map(getRankText)
    };
  }

  function compareHands(a, b) {
    if (types.indexOf(a.type) < types.indexOf(b.type)) return -1;
    if (types.indexOf(a.type) > types.indexOf(b.type)) return 1;
    for (var i = 0; i < a.ranks.length; i++) {
      if (ranks.indexOf(a.ranks[i]) > ranks.indexOf(b.ranks[i])) return -1;
      if (ranks.indexOf(a.ranks[i]) < ranks.indexOf(b.ranks[i])) return 1;
    }
    return 0;
  }

  function hand(holeCards, communityCards) {
    var cards = holeCards.concat(communityCards).sort(function(a, b) {
      return getRank(b) - getRank(a);
    });
    var bestHand = {
      type: "nothing",
      ranks: ["2", "2", "2", "2", "2"]
    };
    for (var i = 0; i < 6; i++) {
      for (var j = i + 1; j < 7; j++) {
        var hand = makeHand(cards.slice(0, i).concat(cards.slice(i + 1, j)).concat(cards.slice(j + 1, 7)));
        if (compareHands(bestHand, hand) > 0) bestHand = hand;
      }
    }
    return bestHand;
  }
  return hand(a, b);
}

//54 RANDOM TESTS
let nums = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'],
  suits = ['♠', '♦', '♥', '♣', '♠', '♦', '♥'],
  handList = ['straight-flush', 'four-of-a-kind', 'full house', 'flush', 'straight', 'three-of-a-kind', 'two pair', 'pair', 'nothing'];
const randomMaker = n => (Math.random() * n) | 0;
const randomSort = r => r.sort((a, b) => [0, 1][(Math.random() * 2) | 0]);
const makeRandomCard = n => `${nums[n ? n : randomMaker(13)]}${suits[randomMaker(4)]}`;

function makeStraights(b) {
  let z = randomMaker(9),
    zs = Array.from({
      length: 5
    }, (_, c) => z + c);
  if (b) { //boolean for straight flush
    let jk = suits[randomMaker(4)];
    zs = zs.map(e => `${nums[e]}${jk}`)
  } else { //not flush
    let cgr = [2, 2, 2, 2];
    let mixed = [];
    while (mixed.length < 5) {
      let zk = randomMaker(4);
      while (!cgr[zk]) {
        zk = randomMaker(4)
      }
      mixed.push(zk);
      cgr[zk]--
    }
    zs = zs.map((e, i) => `${nums[e]}${suits[mixed[i]]}`)
  }
  while (zs.length < 7) {
    let gz = makeRandomCard();
    while (zs.includes(gz)) {
      gz = makeRandomCard()
    }
    zs.push(gz)
  }
  return zs;
}
//6 tests for straights, 6 tests for straight flushes
let straightOnly = Array.from({
    length: 6
  }, e => makeStraights()),
  straightFlush = Array.from({
    length: 6
  }, e => makeStraights(true));

//pairs,2pairs,trips,4kind,fullhouse
function make234(r) {
  let usedList = [];
  let zs = r.reduce((a, e) => {
    let g = randomMaker(13);
    while (usedList[g]) {
      g = randomMaker(13)
    }
    usedList[g] = true;
    let rsuit = suits.slice(randomMaker(4));
    return a.concat(Array(e).fill(g).map((v, c) => `${nums[v]}${rsuit[c]}`));
  }, []);
  while (zs.length < 7) {
    let rz = randomMaker(13);
    while (usedList[rz]) {
      rz = randomMaker(13)
    }
    usedList[rz] = true;
    let gz = makeRandomCard(rz);
    while (zs.includes(gz)) {
      gz = makeRandomCard(rz)
    }
    zs.push(gz)
  }
  return zs;
}
//6 tests each for pairs, two pairs, triples, 4-of-a-kind, and full house
let [pairT, twopairT, tripleT, fourT, fullhouseT] = [
  [2],
  [2, 2],
  [3],
  [4],
  [2, 3]
]
.map(e => Array.from({
  length: 6
}, v => make234(e)));

function flushMaker() {
  let usedList = [];
  let difSet = [];
  let g = randomMaker(4);
  while (difSet.length < 5) {
    let z = randomMaker(13);
    while (usedList[z]) {
      z = randomMaker(13)
    }
    usedList[z] = true;
    difSet.push(z)
  }
  difSet = difSet.map(e => `${nums[e]}${suits[g]}`);
  while (difSet.length < 7) {
    let zz = makeRandomCard();
    while (difSet.includes(zz)) {
      zz = makeRandomCard()
    }
    difSet.push(zz)
  }
  return difSet;
}

function highhand() {
  let usedList = [];
  let usedSuits = [4, 4, 4, 4];
  let ar = [];
  let suitsar = [];
  while (ar.length < 7) {
    let g = randomMaker(13);
    while (usedList[g]) {
      g = randomMaker(13)
    }
    usedList[g] = true;
    ar.push(g)
  }
  while (suitsar.length < 7) {
    let g = randomMaker(4);
    while (!usedSuits[g]) {
      g = randomMaker(4)
    }
    usedSuits[g]--;
    suitsar.push(g)
  }
  return ar.map((e, i) => `${nums[e]}${suits[suitsar[i]]}`);
}

//6 tests for flushes and high-card hands
let flushtests = Array.from({
  length: 6
}, e => flushMaker());
let highhandtests = Array.from({
  length: 6
}, e => highhand());

let aggregateList = [straightOnly, straightFlush, pairT, twopairT, tripleT, fourT, fullhouseT, flushtests, highhandtests]
  .map(e => e.map(v => {
    let cc = randomMaker(7),
      gc = randomSort(v.slice(cc).concat(v.slice(0, cc)));
    return [gc.slice(0, 2), gc.slice(2)]
  }));

let finalRandomList = [];
while (finalRandomList.length < 54) {
  let n = randomMaker(aggregateList.length);
  if (!aggregateList[n].length) {
    aggregateList.splice(n, 1);
    continue
  }
  finalRandomList.push(aggregateList[n].pop());
}

export { finalRandomList };