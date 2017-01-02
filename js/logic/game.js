class Game {
  constructor() {
    this.isGameOver = false;
  }

  initGame(loadTrainedCar, manualControl) {
    this.manualControl = manualControl;
    this.nNet = new Network(loadTrainedCar);
    this.road = new Road(width, height);
    this.car = new Car(this.road.carStart.w, this.road.carStart.h, 3, 2*Math.PI);
  }

  drawGameElements() {
    background(0,90,0);
    this.road.show();
    this.car.updateLocation();
    this.car.show();
    textSize(14);
    fill(255, 100, 100);
    text('ANGLE_' + this.car.angle.toFixed(3), 0, 0, 100, 20);
    text('SPEED_' + this.car.speed.toFixed(3), 0, 20, 100, 20);
    text('FRAMES_' + frameRate().toFixed(3), 0, 40, 100, 20);
  }

  handleGameOver(crashInfo) {
    this.isGameOver = true;
    this.car.fullStop();
    this.showCrashSite(crashInfo.x, crashInfo.y);
    text('GAME  OVER', width/2-50, height/2-10, 100, 20);
  }

  updateGameState() {
    if (this.manualControl) {
      // MANUAL CONTROL
      if(keyIsDown(LEFT_ARROW)) this.car.steer(-0.06);
      if(keyIsDown(RIGHT_ARROW)) this.car.steer(0.06);
    } else {
      // AI CONTROL
      const sensorData = this.getSensorReadings();
      this.showSensorIntersections(sensorData);
      const yHat = this.nNet.forwardPropagate(sensorData[0].value, sensorData[1].value)

      if (yHat < 0) {
        this.car.steer(-0.06);
      } else {
        this.car.steer(0.06);
      }
    }
  }

  handleKeyPressedInputs() {
    if (keyCode === UP_ARROW) this.car.throttle(1);
    if (keyCode === DOWN_ARROW) this.car.throttle(-1);
  }

  handleKeyTypedInputs() {
    if (key === ' ') this.car.fullStop();
  }

  getCarCrashStatus() {
    // calculating absolute car corner positions
    // 25^2 = 20^2 + 15^2 // car dimensions
    const centerToCornerDistance = 25;
    const crashObject = { isCrashed: false };
    for (var i = 0; i < this.car.corners.length; i++) {
      const ang = Math.atan2(this.car.corners[i][1], this.car.corners[i][0]);
      const cornerX = this.car.x + Math.cos(ang + this.car.angle) * centerToCornerDistance;
      const cornerY = this.car.y + Math.sin(ang + this.car.angle) * centerToCornerDistance;
      for (var j = 0; j < this.road.boundaries.length; j++) {
        const intersection = getLineIntersection(
          this.car.x, this.car.y, cornerX, cornerY,
          ...this.road.boundaries[j]);
        if (intersection.isIntersecting) {
          return Object.assign(crashObject, {
            x: intersection.x,
            y: intersection.y,
            isCrashed: true
          });
        }
      }
    }
    return crashObject;
  }

  showCrashSite(x, y) {
    push();
    fill(0);
    ellipse(x, y, 25);
    fill(255);
    ellipse(x, y, 22);
    fill(0)
    ellipse(x, y, 15);
    fill(255)
    ellipse(x, y, 9);
    fill(0)
    ellipse(x, y, 3);
    pop();
  }

  getSensorReadings() {
    const sensorIntersections = [];
    for (var i = 0; i < this.car.sensors.length; i++) {
      const maxDistance = 125;
      const bufferedIntersections = [];
      const ang = Math.atan2(this.car.sensors[i].y, this.car.sensors[i].x);
      const sensorTipX = this.car.x + Math.cos(ang + this.car.angle)*maxDistance;
      const sensorTipY = this.car.y + Math.sin(ang + this.car.angle)*maxDistance;
      for (var j = 0; j < this.road.boundaries.length; j++) {
        const intersection = getLineIntersection(this.car.x, this.car.y, sensorTipX, sensorTipY, ...this.road.boundaries[j]);
        if (intersection.isIntersecting) {
          if (bufferedIntersections.length === 0) {
            const distance = getTwoPointDistance(
              this.car.x, this.car.y, intersection.x, intersection.y);
            bufferedIntersections.push(Object.assign(intersection, { distance, value: distance/maxDistance }));
          } else {
            const distance = getTwoPointDistance(
              this.car.x, this.car.y, intersection.x, intersection.y);
            if (distance < bufferedIntersections[0].distance) {
              bufferedIntersections[0] = Object.assign(intersection, { distance, value: distance/maxDistance });
            }
          }
        }
      }
      if (bufferedIntersections.length > 0) {
        sensorIntersections[i] = bufferedIntersections[0];
      } else {
        const distance = getTwoPointDistance(this.car.x, this.car.y, sensorTipX, sensorTipY);
        sensorIntersections[i] = {
          isIntersecting: false,
          x: sensorTipX,
          y: sensorTipY,
          distance,
          value: 1
        }
      }
    }
    return sensorIntersections;
  }

  showSensorIntersections(intersections) {
    push();
    fill(255,255,0);
    intersections.forEach((intersection) => {
      if (intersection.isIntersecting) ellipse(intersection.x, intersection.y, 10);
    });
    pop();
  }
}