let car;
let road;
let isGameOver = false;

setup = () => {
	createCanvas(window.innerWidth , window.innerHeight);
	// background(50);
	frameRate(0);
	road = new Road(width, height);
	car = new Car(road.carStart.w, road.carStart.h, 3, 2*Math.PI);
}

draw = () => {
	if(!isGameOver){
		background(0,90,0);
		road.show();

		if(keyIsDown(LEFT_ARROW)) car.steer(-0.05);
		if(keyIsDown(RIGHT_ARROW)) car.steer(0.05);

		car.updateLocation();
		car.show();

		textSize(14);
		fill(255, 100, 100);
		text('ANGLE_' + car.angle.toFixed(3), 0, 0, 100, 20);
		text('SPEED_' + car.speed.toFixed(3), 0, 20, 100, 20);
		text('FRAMES_' + frameRate().toFixed(3), 0, 40, 100, 20);

		if (road.isCarOffRoad(car)) {
			isGameOver = true;
			car.fullStop();
			road.showCrashSite();
			text('GAME  OVER', width/2-50, height/2-10, 100, 20);
		};
	}
}

keyPressed = () => {
	if (keyCode === UP_ARROW) car.throttle(1);
	if (keyCode === DOWN_ARROW) car.throttle(-1);
}

keyTyped = () => {
	if (key === ' ') car.fullStop();
}