'use strict';
const Matrix = require('./lib/matrix');
const NeuralNetwork = require('./lib/neural_network');

const nNet = new NeuralNetwork();

let X = new Matrix(1, 2, [3, 5]);
let Xnorm = X.normalisedMatrix(10);

console.log(nNet.forwardPropagate(X));
