'use strict';
const Matrix = require('./lib/matrix');
const NeuralNetwork = require('./lib/neural_network');

const nNet = new NeuralNetwork();
// const X = new Matrix(3, 2, [3, 5, 5, 1, 10, 2]);
// const y = new Matrix(3, 1, [75, 82, 93]);

const XnormArr = [];
const ynormArr = [];

let X = new Matrix(1, 2, [3, 5]);
let y = new Matrix(1, 1, [75]);
let Xnorm = X.normalisedMatrix(10);
let ynorm = y.normalisedMatrix(100);
XnormArr.push(Xnorm);
ynormArr.push(ynorm);

X = new Matrix(1, 2, [5, 1]);
y = new Matrix(1, 1, [82]);
Xnorm = X.normalisedMatrix(10);
ynorm = y.normalisedMatrix(100);
XnormArr.push(Xnorm);
ynormArr.push(ynorm);

X = new Matrix(1, 2, [10, 2]);
y = new Matrix(1, 1, [93]);
Xnorm = X.normalisedMatrix(10);
ynorm = y.normalisedMatrix(100);
XnormArr.push(Xnorm);
ynormArr.push(ynorm);

// ------------------------------------------------

console.log('FIRST EXAMPLE ---------------------------');
let previousError = 0;
let errorsArr = [];
for (var i = 0; i < 900; i++) {
  const j = i % 3;
  const yHat = nNet.forwardPropagate(XnormArr[j]);
  const errorMX = nNet.getOutputError(ynormArr[j]);
  console.log('STEP - ' + i + ' - ERROR: ' + errorMX.mx[0]);
  const deltaHidden = nNet.backPropagate(errorMX);
  nNet.updateWeights();
  // calc errors
  errorsArr.push(errorMX.mx[0]);
  if (j === 0 && i > 0) {
    const sqErrArr = errorsArr.map(x => Math.pow(x, 2));
    const currentError = sqErrArr.reduce((a, b) => a + b, 0);
    console.log('CURRENT SQ ERROR: ' + currentError);
    if (i === 3) { previousError = currentError; }
    else if (currentError > previousError) {
      break;
    }
    previousError = currentError;
    errorsArr = [];
  }
};

console.log(nNet.W1);
console.log(nNet.W2);

// console.log('SECOND EXAMPLE --------------------------');
// for (var i = 0; i < 10; i++) {
//   const yHat = nNet.forwardPropagate(Xnorm);
//   const errorMX = nNet.getOutputError(ynorm);
//   console.log('STEP - ' + i + ' - ERROR: ' + errorMX.mx);
//   const deltaHidden = nNet.backPropagate(errorMX);
//   nNet.updateWeights();
// };



// let errorSum = 0
// for (var i = 0; i < 3; i++) {
//   const expected =
//   [
//     -0.35486908857423166,
//     0.19695136758803855,
//     -0.15098755492909277
//   ];
//   errorSum += Math.abs(deltaHidden.mx[i] - expected[i]);
// };

// console.log('errorSum: ' + errorSum);

// // if(errorSum > 0.00000001) throw new Error();