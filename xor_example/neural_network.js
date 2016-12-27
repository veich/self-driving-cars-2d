'use strict';
const Matrix = require('./matrix');

class NeuralNetwork {
	constructor(input, hidden, output){
		this.inputLayerSize = input || 2;
		this.hiddenLayerSize = hidden || 3;
		this.outputLayerSize = output || 1;
		this.alpha = 0.1;

		this.W1 = Matrix.randomMatrix(
			this.inputLayerSize, 
			this.hiddenLayerSize);

		this.W2 = Matrix.randomMatrix(
			this.hiddenLayerSize, 
			this.outputLayerSize);
	}

	forwardPropagate(matrix) {
		this.a1 = matrix;
		this.z2 = Matrix.multMatrix(matrix, this.W1);
		this.a2 = this.z2.applyTanh();
		this.z3 = Matrix.multMatrix(this.a2, this.W2);
		this.yHat = this.z3.applyTanh();
		return this.yHat;
	}

	backPropagate(matrix) {
		this.delta3 = matrix;
		const W2T = Matrix.transpose(this.W2);
		this.delta2 = Matrix.multMatrix(this.delta3, W2T);
		return this.delta2;
	}

	updateWeights() {
		const newWeights1 = [];
		for (let i = 0; i < this.W1.m; i++) {
			for (let j = 0; j < this.W1.n; j++) {
				const w = this.W1.mx[j + this.W1.n*i];
				const delta = this.delta2.mx[j];
				const changeRate = Matrix.tanhDerivative(this.a1.mx[i]);
				const wNew = w + this.alpha * delta * changeRate;
				newWeights1.push(wNew);
			};
		};
		this.W1.mx = newWeights1;

		const newWeights2 = [];
		for (let i = 0; i < this.W2.m; i++) {
			for (let j = 0; j < this.W2.n; j++) {
				const w = this.W2.mx[j + this.W2.n*i];
				const delta = this.delta3.mx[j];
				const changeRate = Matrix.tanhDerivative(this.a2.mx[i]);
				const wNew = w + this.alpha * delta * changeRate;
				newWeights2.push(wNew);
			};
		};
		this.W2.mx = newWeights2;
	}

	getOutputError(targetMX) {
		return Matrix.subtractMatrix(targetMX, this.yHat);
	}
}

module.exports = NeuralNetwork;
