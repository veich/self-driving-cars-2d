'use strict';
class Network {
  constructor() {
    this.N1 = 0;
    this.N2 = 0;
    this.N3 = 0;
    this.N4 = 0;
    this.N5 = 0;
    this.N6 = 0;

    this.B1 = 1;
    this.B2 = 1;

    this.w13 = this.rand();
    this.w14 = this.rand();
    this.w15 = this.rand();
    this.w23 = this.rand();
    this.w24 = this.rand();
    this.w25 = this.rand();
    this.w36 = this.rand();
    this.w46 = this.rand();
    this.w56 = this.rand();

    this.b13 = this.rand();
    this.b14 = this.rand();
    this.b15 = this.rand();
    this.b26 = this.rand();

    this.N3error = 0;
    this.N4error = 0;
    this.N5error = 0;
    this.N6error = 0;
  }

  forwardPropagate(n1, n2) {
    this.N1 = n1;
    this.N2 = n2;
    this.N3 = this.tanh(this.N1*this.w13 + this.N2*this.w23 + this.B1*this.b13);
    this.N4 = this.tanh(this.N1*this.w14 + this.N2*this.w24 + this.B1*this.b14);
    this.N5 = this.tanh(this.N1*this.w15 + this.N2*this.w25 + this.B1*this.b15);
    this.N6 = this.tanh(this.N3*this.w36 + this.N4*this.w46 + this.N5*this.w56 + this.B2*this.b26);
    return this.N6;
  }

  outputError(expectedN6) {
    this.N6error = (expectedN6 - this.N6) * this.tanhDerivative(this.N6);
    return this.N6error;
  }

  backPropagate(learningRate) {
    this.N5error = this.N6error * this.w56 * this.tanhDerivative(this.N5);
    this.N4error = this.N6error * this.w46 * this.tanhDerivative(this.N4);
    this.N3error = this.N6error * this.w36 * this.tanhDerivative(this.N3);

    const deltaW56 = this.N5 * this.N6error;
    const deltaW46 = this.N4 * this.N6error;
    const deltaW36 = this.N3 * this.N6error;
    const deltaW25 = this.N2 * this.N5error;
    const deltaW24 = this.N2 * this.N4error;
    const deltaW23 = this.N2 * this.N3error;
    const deltaW15 = this.N1 * this.N5error;
    const deltaW14 = this.N1 * this.N4error;
    const deltaW13 = this.N1 * this.N3error;

    const deltaB26 = this.B2 * this.N6error;
    const deltaB15 = this.B1 * this.N5error;
    const deltaB14 = this.B1 * this.N4error;
    const deltaB13 = this.B1 * this.N3error;

    this.w56 += deltaW56 * learningRate;
    this.w46 += deltaW46 * learningRate;
    this.w36 += deltaW36 * learningRate;
    this.w25 += deltaW25 * learningRate;
    this.w24 += deltaW24 * learningRate;
    this.w23 += deltaW23 * learningRate;
    this.w15 += deltaW15 * learningRate;
    this.w14 += deltaW14 * learningRate;
    this.w13 += deltaW13 * learningRate;

    this.b26 += deltaB26 * learningRate;
    this.b15 += deltaB15 * learningRate;
    this.b14 += deltaB14 * learningRate;
    this.b13 += deltaB13 * learningRate;
  }

  rand() { return 2*Math.random()-1; }

  sigmoid(x) { return 1 / (1 + Math.exp(-x)); }

  sigmoidDerivative(x) {
    return this.sigmoid(x) * (1 - this.sigmoid(x));
  }

  tanh(x) {
    return Math.tanh(x);
  }

  tanhDerivative(x){
    return 1 - Math.pow(Math.tanh(x), 2);
  }

}

module.exports = Network;