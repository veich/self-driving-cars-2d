'use strict';

class Matrix {
	constructor(m, n, values, scale) {
		this.m = m || 0;
		this.n = n || 0;
		this.mx = values || [];
		this.scale = scale || 1;
		if (this.m * this.n !== this.mx.length) throw new Error();
	}

	_maxValue() { return Math.max(...this.mx.map(x => Math.abs(x))) };

	normalisedMatrix(scale) {
		const newScale = scale || this._maxValue();
		return new Matrix(
			this.m,
			this.n,
			this.mx.map(x => x / newScale),
			newScale);
	}

	sigmoid(x) { return 1 / (1 + Math.exp(-x)); }

	applySigmoid() {
		return new Matrix(
			this.m,
			this.n,
			this.mx.map(x => this.sigmoid(x)),
			this.scale);
	}

	static sigmoidDerivative(x) {
		const sigmoid = (x) => 1 / (1 + Math.exp(-x));
		return sigmoid(x) * (1 - sigmoid(x));
	}

	applyTanh() {
		return new Matrix(
			this.m,
			this.n,
			this.mx.map(x => Math.tanh(x)),
			this.scale);
	}

	static tanhDerivative(x){
		return 1 - Math.pow(Math.tanh(x), 2)
	}

	static transposeMultMatrix(m1, m2) {
		if (m1.m !== m2.m) throw new Error(`${m1.m} ${m1.n} ${m2.m} ${m2.n}`);
		const m = m1.m;
	  let result = [];
	  for (let col1 = 0; col1 < m1.n; col1++) {
	    for (let col2 = 0; col2 < m2.n; col2++) {
		    let sum = 0;
		    for (let row = 0; row < m; row++) {
			    sum += m1.mx[row*m1.n+col1] * m2.mx[row*m2.n+col2];
			  }
			  result[col1*m2.n+col2] = sum;
		  }
	  }
	  return new Matrix(m1.n, m2.n, result);
	}

	static transpose(matrix) {
		const result = [];
		for (var i = 0; i < matrix.m; i++) {
			for (var j = 0; j < matrix.n; j++) {
				result.push(matrix.mx[matrix.m*j + i])
			};
		};
		return new Matrix(matrix.n, matrix.m, result);
	}

	static multMatrix(m1, m2) {
		if (m1.n !== m2.m) throw new Error();
	  let result = [];
	  for (let col2 = 0; col2 < m2.n; col2++) {
	    for (let row1 = 0; row1 < m1.m; row1++) {
	      let sum = 0;
	      for (let col1 = 0; col1 < m1.n; col1++) {
	        sum += m1.mx[row1*m1.n+col1] * m2.mx[col1*m2.n+col2];
	  	  }
	      result[row1*m2.n+col2] = sum;
	    }
	  }
	  return new Matrix(m1.m, m2.n, result);
	}

	static randomMatrix(m, n) {
		const mx = [];
		for (let i = 0; i < m*n; i++) {
			mx[i] = (2 * Math.random()) - 1;
		}
		return new Matrix(m, n, mx);
	}

	static subtractMatrix(m1, m2) {
		if (m1.m !== m2.m || m1.n !== m2.n) throw new Error();
		const subtractedVals = [];
		for (var i = 0; i < m1.mx.length; i++) {
			subtractedVals.push(m1.mx[i] - m2.mx[i]);
		};
		return new Matrix(m1.m, m1.n, subtractedVals);
	}
}

module.exports = Matrix;
