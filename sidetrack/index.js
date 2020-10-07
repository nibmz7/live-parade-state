const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin
});

let inputs = [];
let firstLine = true;
let isLengthInput = true;

rl.on('line', (chunk) => {
  if (firstLine) firstLine = false;
  else {
    if (isLengthInput) isLengthInput = false;
    else {
      isLengthInput = true;
      inputs.push(chunk);
    }
  }
});

rl.on('close', () => {
  processInput();
});

const MIN_CHAR_CODE = 65;
const MAX_CHAR_CODE = 122;

function getPrime(code) {
  let lowerTierPrime = 0;
  let upperTierPrime = 0;
  let startingPoint = code < MIN_CHAR_CODE ? MIN_CHAR_CODE : code;
  for (let i = startingPoint; i >= MIN_CHAR_CODE; i--) {
    if (isPrime(i)) {
      lowerTierPrime = i;
      break;
    }
  }
  for (let i = startingPoint; i <= MAX_CHAR_CODE; i++) {
    if (isPrime(i)) {
      upperTierPrime = i;
      break;
    }
  }
  if (!lowerTierPrime) return upperTierPrime;
  if (!upperTierPrime) return lowerTierPrime;
  const lowerTierDiff = code - lowerTierPrime;
  const upperTierDiff = upperTierPrime - code;
  if (lowerTierDiff === upperTierDiff) return lowerTierPrime;
  return lowerTierDiff < upperTierDiff ? lowerTierPrime : upperTierPrime;
}

function isPrime(num) {
  for (var i = 2; i < num; i++) if (num % i === 0) return false;
  return num > 1;
}

function processInput() {
  for (const input of inputs) {
    let magicWord = '';
    for (const i of input) {
      const code = i.charCodeAt(0);
      const newCode = getPrime(code);
      magicWord += String.fromCharCode(newCode);
    }
    console.log(magicWord);
  }
}
