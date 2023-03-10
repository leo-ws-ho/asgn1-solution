const NUM_TRIALS = 100000;

const suits = "SHDC";
const numbers = "AKQJT98765432";

// Approach 1
function drawACard() {
  let suit = suits[Math.floor(Math.random() * suits.length)];
  let number = numbers[Math.floor(Math.random() * numbers.length)];
  return suit + number;
}

// Approach 2, draw a card NOT in hand.
function drawACard2(hand = []) {
  let card = "";
  while (true) {
    card =
      suits[Math.floor(Math.random() * suits.length)] +
      numbers[Math.floor(Math.random() * numbers.length)];
    if (!hand.includes(card)) return card;
  }
  return "";
}

// Approach 1, drawHand.  Returns a hand, with all the cards sorted according to rank.
function drawHand() {
  let hand = [];

  while (hand.length < 5) {
    let card = drawACard();
    if (!hand.includes(card)) hand.push(card);
  }

  sortHand(hand);
  return hand;
}

// Approach 2, drawHand2
function drawHand2() {
  let hand = [];
  for (let i = 0; i < 5; ++i) {
    hand.push(drawACard2(hand));
  }
  return hand;
}

/**
 * returns true if the poker hand is a flush.  false otherwise.
 * @param {Array} hand a poker hand, like ['SA', 'ST', 'S3', 'S8', 'S7']
 * @returns {Boolean}
 */
function isOfSameSuit(hand) {
  return (
    hand[0][0] === hand[1][0] &&
    hand[1][0] === hand[2][0] &&
    hand[2][0] === hand[3][0] &&
    hand[3][0] === hand[4][0]
  );
}

function isFlush(hand) {
  return isOfSameSuit(hand) && !isSequential(hand);
}

function sortHand(hand) {
  hand.sort((card1, card2) => {
    return numbers.indexOf(card1[1]) - numbers.indexOf(card2[1]);
  });
}

function isStraight(hand) {
  return isSequential(hand) && !isOfSameSuit(hand);
}

function isSequential(hand) {
  for (let i = 0; i < 4; i++) {
    if (numbers.indexOf(hand[i][1]) + 1 !== numbers.indexOf(hand[i + 1][1]))
      return false;
  }

  return true;

  // return (
  //   numbers.indexOf(hand[0][1]) === numbers.indexOf(hand[1][1]) - 1 &&
  //   numbers.indexOf(hand[1][1]) === numbers.indexOf(hand[2][1]) - 1 &&
  //   numbers.indexOf(hand[2][1]) === numbers.indexOf(hand[3][1]) - 1 &&
  //   numbers.indexOf(hand[3][1]) === numbers.indexOf(hand[4][1]) - 1
  // );
}

function isOnePair(hand) {
  if (hand[0][1] === hand[1][1]) {
    return (
      hand[1][1] !== hand[2][1] &&
      hand[2][1] !== hand[3][1] &&
      hand[3][1] !== hand[4][1]
    );
  }
  if (hand[1][1] === hand[2][1]) {
    return hand[2][1] !== hand[3][1] && hand[3][1] !== hand[4][1];
  }
  if (hand[2][1] === hand[3][1]) {
    return hand[3][1] !== hand[4][1];
  }
  return hand[3][1] === hand[4][1];
}

function isStraightFlush(hand) {
  return isSequential(hand) && isOfSameSuit(hand);
}

function isThreeOfAKind(hand) {
  if (hand[0][1] === hand[1][1] && hand[1][1] === hand[2][1]) {
    return hand[2][1] !== hand[3][1] && hand[3][1] !== hand[4][1];
  }
  if (hand[1][1] === hand[2][1] && hand[2][1] === hand[3][1]) {
    return hand[3][1] !== hand[4][1];
  }
  return hand[2][1] === hand[3][1] && hand[3][1] === hand[4][1];
}

function isFourOfAKind(hand) {
  if (
    hand[0][1] === hand[1][1] &&
    hand[1][1] === hand[2][1] &&
    hand[2][1] === hand[3][1]
  ) {
    return true;
  }
  return (
    hand[1][1] === hand[2][1] &&
    hand[2][1] === hand[3][1] &&
    hand[3][1] === hand[4][1]
  );
}

let flushCount = 0;
let straightCount = 0;
let threeOfAKindCount = 0;
let fourOfAKindCount = 0;
let onePairCount = 0;
let straightFlushCount = 0;

for (let i = 0; i < NUM_TRIALS; ++i) {
  let hand = drawHand();

  if (isFlush(hand)) ++flushCount;
  if (isStraight(hand)) ++straightCount;
  if (isThreeOfAKind(hand)) ++threeOfAKindCount;
  if (isFourOfAKind(hand)) ++fourOfAKindCount;
  if (isOnePair(hand)) ++onePairCount;
  if (isStraightFlush(hand)) ++straightFlushCount;
}

console.log("Flush: ", flushCount / NUM_TRIALS);
console.log("Straight: ", straightCount / NUM_TRIALS);
console.log("Three: ", threeOfAKindCount / NUM_TRIALS);
console.log("Four: ", fourOfAKindCount / NUM_TRIALS);
console.log("Pair: ", onePairCount / NUM_TRIALS);
console.log("SF: ", straightFlushCount / NUM_TRIALS);

// const NUM_TRIALS = 100000;

// const suits = "SHDC".split("");
// const numbers = "AKQJT98765432".split("");

// function drawACard() {
//   return (
//     suits[Math.floor(Math.random() * suits.length)] +
//     numbers[Math.floor(Math.random() * numbers.length)]
//   );
// }

// /**
//  * Draw a 5 card hand, in an array.
//  * e.g., ['HA', 'HK', 'HQ', 'HJ', 'HT']
//  */
// function drawHand() {
//   let hand = [];
//   while (hand.length < 5) {
//     let card = drawACard();
//     if (!hand.includes(card)) hand.push(card);
//   }
//   return hand;
// }

// function getSuits(hand) {
//   let suitsOfHand = [];
//   for (card of hand) {
//     suitsOfHand.push(card[0]);
//   }
//   return suitsOfHand;
// }

// function getNumbers(hand) {
//   let numsOfHand = [];
//   for (card of hand) {
//     numsOfHand.push(card[1]);
//   }
//   return numsOfHand;
// }

// function isSameSuit(hand) {
//   let s = getSuits(hand);
//   return s[0] === s[1] && s[1] === s[2] && s[2] === s[3] && s[3] === s[4];
// }

// function sortHand(hand) {
//   hand.sort(
//     (card1, card2) => numbers.indexOf(card1[1]) - numbers.indexOf(card2[1])
//   );
// }

// function isInSequence(hand) {
//   sortHand(hand);
//   return (
//     numbers.indexOf(hand[0][1]) === numbers.indexOf(hand[1][1]) - 1 &&
//     numbers.indexOf(hand[1][1]) === numbers.indexOf(hand[2][1]) - 1 &&
//     numbers.indexOf(hand[2][1]) === numbers.indexOf(hand[3][1]) - 1 &&
//     numbers.indexOf(hand[3][1]) === numbers.indexOf(hand[4][1]) - 1
//   );
// }

// function isStraight(hand) {
//   //   let indices = [];
//   //   for (let card of hand) {
//   //     indices.push(numbers.indexOf(card[1]));
//   //   }
//   //   indices.sort();
//   //   console.log(indices);

//   return isInSequence(hand) && !isSameSuit(hand);
// }

// function isFlush(hand) {
//   return isSameSuit(hand) && !isInSequence(hand);
// }

// function isStraightFlush(hand) {
//   return isSameSuit(hand) && isInSequence(hand);
// }

// function isPair(hand) {
//   sortHand(hand);

//   let same = 0;
//   for (let i = 0; i < hand.length - 1; ++i) {
//     if (same === 0) {
//       if (hand[i][1] === hand[i + 1][1]) same++;
//     } else {
//       if (hand[i][1] === hand[i + 1][1]) return false;
//     }
//   }
//   return same === 1;
// }

// //let hand = drawHand();
// let hand = ["HA", "HK", "HQ", "HT", "DT"];

// console.log(hand);
// console.log(isStraight(hand));
// console.log(isPair(hand));

// // let flushCount = 0;
// // for (let i = 0; i < NUM_TRIALS; ++i) {
// //   let hand = drawHand();
// //   //  console.log(hand);
// //   //  console.log(getSuits(hand));
// //   if (isFlush(hand)) flushCount++;
// // }

// // console.log(flushCount);
