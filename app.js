let car;
let road;
let isGameOver = false;
let nNet;

setup = () => {
	createCanvas(window.innerWidth , window.innerHeight);
	// background(50);
	frameRate(0);
	nNet = new NeuralNetwork();
	road = new Road(width, height);
	car = new Car(road.carStart.w, road.carStart.h, 3, 2*Math.PI);
}

draw = () => {
	if(!isGameOver) {
		background(0,90,0);
		road.show();
		car.updateLocation();
		car.show();

		textSize(14);
		fill(255, 100, 100);
		text('ANGLE_' + car.angle.toFixed(3), 0, 0, 100, 20);
		text('SPEED_' + car.speed.toFixed(3), 0, 20, 100, 20);
		text('FRAMES_' + frameRate().toFixed(3), 0, 40, 100, 20);

		const crashStatus = road.getCarCrashStatus(car);

		const sensorData = road.getSensorReadings(car);
		road.showSensorIntersections(sensorData);
		const X = new Matrix(1, 2, [sensorData[0].value, sensorData[1].value]);
		const yHat = nNet.forwardPropagate(X)

		if (yHat.mx[0] < 0) {
			car.steer(-0.06);
		} else {
			car.steer(0.06);
		}
		// if(keyIsDown(LEFT_ARROW)) car.steer(-0.05);
		// if(keyIsDown(RIGHT_ARROW)) car.steer(0.05);

		if (crashStatus.isCrashed) {
			isGameOver = true;
			car.fullStop();
			road.showCrashSite(crashStatus.x, crashStatus.y);
			text('GAME  OVER', width/2-50, height/2-10, 100, 20);
		}
	}
}

keyPressed = () => {
	if (keyCode === UP_ARROW) car.throttle(1);
	if (keyCode === DOWN_ARROW) car.throttle(-1);
}

keyTyped = () => {
	if (key === ' ') car.fullStop();
}