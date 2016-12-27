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

let previousError = 0;
let errorsArr = [];
for (var i = 0; i < 100; i++) {
  const j = i % 4;
  const yHat = nNet.forwardPropagate(XArr[j]);
  const errorMX = nNet.getOutputError(yArr[j]);
  // console.log('STEP - ' + i + ' - ERROR: ' + errorMX.mx[0]);
  const deltaHidden = nNet.backPropagate(errorMX);
  nNet.updateWeights();
  // calc errors
  errorsArr.push(errorMX.mx[0]);
  if (i % 10 === 0) {
    console.log('----------------------------------- STEP: ' + i);
    console.log('XOR: 0 - 0 => ' + nNet.forwardPropagate(XArr[0]).mx);
    console.log('XOR: 0 - 1 => ' + nNet.forwardPropagate(XArr[1]).mx);
    console.log('XOR: 1 - 0 => ' + nNet.forwardPropagate(XArr[2]).mx);
    console.log('XOR: 1 - 1 => ' + nNet.forwardPropagate(XArr[3]).mx);
  }
};

// console.log(nNet.W1);
// console.log(nNet.W2);