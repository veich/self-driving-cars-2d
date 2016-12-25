'use strict';
const Matrix = require('./matrix');

class NeuralNetwork {
	constructor(input, hidden, output){
		this.inputLayerSize = input || 2;
		this.hiddenLayerSize = hidden || 3;
		this.outputLayerSize = output || 1;
		this.alpha = 0.1;

		this.W1 = new Matrix(2, 3,
			[	0.10332379303872585,
	     -0.11365544237196445,
	     0.3104037004522979,
	     0.2846097149886191,
	     -0.6527335322462022,
	     -0.2860003877431154]);

		this.W2 = new Matrix(3, 1,
			[ 0.6810245243832469,
			-0.37796673690900207,
			0.28975819842889905 ]);

		// this.W1 = new Matrix(2, 3,
		// 	[ 0.7723862091030899,
  // -0.269090587657622,
  // 0.6833884246965428,
  // 0.8595866225722179,
  // -0.7863109340256458,
  // 0.034534136649069846 ]);

		// this.W2 = new Matrix(3, 1,
		// 	[ 1.4605619217679566, 0.34476613864610484, 1.1256762872378365 ]);

		// this.W1 = Matrix.randomMatrix(
		// 	this.inputLayerSize, 
		// 	this.hiddenLayerSize);

		// this.W2 = Matrix.randomMatrix(
		// 	this.hiddenLayerSize, 
		// 	this.outputLayerSize);
	}

	forwardPropagate(matrix) {
		this.a1 = matrix;
		// console.log('matrix:');
		// console.log(matrix);
		this.z2 = Matrix.multMatrix(matrix, this.W1);
		// console.log('z2:');
		// console.log(this.z2);
		// this.a2 = this.z2.applySigmoid();
		this.a2 = this.z2.applyTanh();
		// console.log('a2:');
		// console.log(this.a2);
		this.z3 = Matrix.multMatrix(this.a2, this.W2);
		// console.log('z3:');
		// console.log(this.z3);
		// this.yHat = this.z3.applySigmoid();
		this.yHat = this.z3.applyTanh();
		// console.log('yHat:');
		// console.log(this.yHat);
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
				// const changeRate = Matrix.sigmoidDerivative(this.a1.mx[i]);
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
				// const changeRate = Matrix.sigmoidDerivative(this.a2.mx[i]);
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
