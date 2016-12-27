'use strict';
// use Node.js to run this example

const Matrix = require('./matrix');
const NeuralNetwork = require('./neural_network');

const nNet = new NeuralNetwork();
// const X = new Matrix(3, 2, [3, 5, 5, 1, 10, 2]);
// const y = new Matrix(3, 1, [75, 82, 93]);

const XArr = [];
const yArr = [];

let X = new Matrix(1, 2, [0, 0]);
let y = new Matrix(1, 1, [0]);
XArr.push(X);
yArr.push(y);

X = new Matrix(1, 2, [0, 1]);
y = new Matrix(1, 1, [1]);
XArr.push(X);
yArr.push(y);

X = new Matrix(1, 2, [1, 0]);
y = new Matrix(1, 1, [1]);
XArr.push(X);
yArr.push(y);

X = new Matrix(1, 2, [1, 1]);
y = new Matrix(1, 1, [0]);
XArr.push(X);
yArr.push(y);

// ------------------------------------------------

console.log('FIRST EXAMPLE ---------------------------');
let previousError = 0;
let errorsArr = [];
for (var i = 0; i < 3000; i++) {
  const j = i % 4;
  const yHat = nNet.forwardPropagate(XArr[j]);
  const errorMX = nNet.getOutputError(yArr[j]);
  console.log('STEP - ' + i + ' - ERROR: ' + errorMX.mx[0]);
  const deltaHidden = nNet.backPropagate(errorMX);
  nNet.updateWeights();
  // calc errors
  errorsArr.push(errorMX.mx[0]);
  if (j === 0 && i > 0) {
    const sqErrArr = errorsArr.map(x => Math.pow(x, 2));
    const currentError = sqErrArr.reduce((a, b) => a + b, 0);
    console.log('CURRENT SQUARE ERROR: ' + currentError);
    if (i === 4) { previousError = currentError; }
    else if (currentError > previousError) {
      break;
    }
    previousError = currentError;
    errorsArr = [];
  }
};

console.log('XOR: 0 - 0 => ' + nNet.forwardPropagate(XArr[0]).mx);
console.log('XOR: 0 - 1 => ' + nNet.forwardPropagate(XArr[1]).mx);
console.log('XOR: 1 - 0 => ' + nNet.forwardPropagate(XArr[2]).mx);
console.log('XOR: 1 - 1 => ' + nNet.forwardPropagate(XArr[3]).mx);
    

// console.log(nNet.W1);
// console.log(nNet.W2);