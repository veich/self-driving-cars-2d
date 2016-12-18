const Matrix = require('./matrix');
const NeuralNetwork = require('./neural_network');

const nNet = new NeuralNetwork();
const X = new Matrix(3, 2, [3, 5, 5, 1, 10, 2]);
const y = new Matrix(3, 1, [75, 82, 93]);

const Xnorm = X.normalisedMatrix();
const ynorm = y.normalisedMatrix(100);

console.log('----yHat----');
console.log(nNet.forwardPropagate(Xnorm));
console.log('----ynorm---');
console.log(ynorm);
