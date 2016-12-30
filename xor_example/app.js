const Network = require('./network');

const net = new Network();
const learningRate = 0.1;

console.log('RANDOM NETWORK:');
console.log('OR: 0 - 0 => ' + net.forwardPropagate(0,0));
console.log('OR: 0 - 1 => ' + net.forwardPropagate(0,1));
console.log('OR: 1 - 0 => ' + net.forwardPropagate(1,0));
console.log('OR: 1 - 1 => ' + net.forwardPropagate(1,1));
console.log('----------------------------------\n');

for (var i = 0; i < 10000; i++) {
  net.forwardPropagate(0,0);
  net.outputError(0);
  net.backPropagate(learningRate);
  net.forwardPropagate(0,1);
  net.outputError(1);
  net.backPropagate(learningRate);
  net.forwardPropagate(1,0);
  net.outputError(1);
  net.backPropagate(learningRate);
  net.forwardPropagate(1,1);
  net.outputError(0);
  net.backPropagate(learningRate);
};

console.log('TRAINED NETWORK:');
console.log('XOR: 0 - 0 => ' + net.forwardPropagate(0,0));
console.log('XOR: 0 - 1 => ' + net.forwardPropagate(0,1));
console.log('XOR: 1 - 0 => ' + net.forwardPropagate(1,0));
console.log('XOR: 1 - 1 => ' + net.forwardPropagate(1,1));
console.log('----------------------------------\n');
