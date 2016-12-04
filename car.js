function Car(x, y, speed, angle) {
	this.x = x || 100;
	this.y = y || 100;
	this.speed = speed || 0;
	this.angle = angle || - Math.PI / 2;

	this.updateLocation = () => {
		this.x += Math.cos(this.angle) * this.speed;
		this.y += Math.sin(this.angle) * this.speed;
	}

	this.throttle = (acc) => {
		this.speed += acc;
	}

	this.steer = (angle) => {
		this.angle += angle;
	}

	this.fullStop = () => {
		this.speed = 0;
	}

	this.show = () => {
		push();
		stroke(50)
		translate(this.x, this.y);
		fill(220, 0, 0);
		rectMode(CENTER);
		rotate(this.angle);
		// body
		rect(0, 0, 40, 30);
		// lights
		fill(255);
		stroke(255);
		rect(17,-11, 4, 6);
		rect(17,11, 4, 6);
		// wheels
		fill(0);
		stroke(0);
		rect(-12, -12, 8, 4);
		rect(-12, 12, 8, 4);
		rect(6, -12, 8, 4);
		rect(6, 12, 8, 4);
		pop();
	}
}