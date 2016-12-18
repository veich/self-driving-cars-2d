'use strict';
const Matrix = require('./matrix');

class NeuralNetwork {
	constructor(input, hidden, output){
		this.inputLayerSize = input || 2;
		this.hiddenLayerSize = hidden || 3;
		this.outputLayerSize = output || 1;

		this.W1 = Matrix.randomMatrix(
			this.inputLayerSize, 
			this.hiddenLayerSize);

		this.W2 = Matrix.randomMatrix(
			this.hiddenLayerSize, 
			this.outputLayerSize);
	}

	forwardPropagate(matrix) {
		this.z2 = Matrix.multMatrix(matrix, this.W1);
		this.a2 = this.z2.applySigmoid();
		this.z3 = Matrix.multMatrix(this.a2, this.W2);
		this.yHat = this.z3.applySigmoid();
		return this.yHat;
	}
}

module.exports = NeuralNetwork;
