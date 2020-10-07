const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin
});

let inputs = new Array<String>();
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

function isPrime(num) {
  for (var i = 2; i < num; i++) if (num % i === 0) return false;
  return num > 1;
}

function processInput() {
  for (const input of inputs) {
    let magicWord = '';
    for (const i of input) {
        console.log(i);
      console.log(i.charCodeAt(0));
    }
  }
}
