let car;

setup = () => {
	createCanvas(window.innerWidth , window.innerHeight);
	background(50);
	// frameRate(5);
	car = new Car(width/2, height/2);
	car.show();
}

draw = () => {
	background(50);

	if(keyIsDown(LEFT_ARROW)) car.steer(-0.05);
	if(keyIsDown(RIGHT_ARROW)) car.steer(0.05);

	car.updateLocation();
	car.show();

	textSize(14);
	fill(255, 100, 100);
	text('ANGLE_' + car.angle.toFixed(3), 0, 0, 100, 20);
	text('SPEED_' + car.speed.toFixed(3), 0, 20, 100, 20);
	text('FRAMES_' + frameRate().toFixed(3), 0, 40, 100, 20);
}

keyPressed = () => {
	if (keyCode === UP_ARROW) car.throttle(1);
	if (keyCode === DOWN_ARROW) car.throttle(-1);
}

keyTyped = () => {
	if (key === ' ') car.fullStop();
}