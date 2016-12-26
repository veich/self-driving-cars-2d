class Car {
	constructor(x, y, speed, angle) {
		this.x = x || 100;
		this.y = y || 100;
		this.speed = speed || 0;
		this.angle = angle || - Math.PI / 2;
		this.corners = [
			[20,-15],
			[20,15],
			[-20,-15],
			[-20,15]];
		// this.sensor = [{ x:  }]
	}

	updateLocation(){
		this.x += Math.cos(this.angle) * this.speed;
		this.y += Math.sin(this.angle) * this.speed;
	}

	throttle(acc){
		this.speed += acc;
	}

	steer(angle){
		this.angle += angle;
	}

	fullStop(){
		this.speed = 0;
	}

	show(){
		push();
		stroke(50);
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
		// corners
		fill(100,255,0);
		ellipse(this.corners[0][0], this.corners[0][1], 5);
		ellipse(this.corners[1][0], this.corners[1][1], 5);
		ellipse(this.corners[2][0], this.corners[2][1], 5);
		ellipse(this.corners[3][0], this.corners[3][1], 5);
		// sensors
		fill(255,255,0);
		stroke(255,255,0);
		line(0,0,100,-75);
		line(0,0,100,75);
		pop();
	}
}