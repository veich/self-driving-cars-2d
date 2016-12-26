class Road {
  constructor(screenW, screenH) {
    this.width = screenW;
    this.height = screenH;
    this.roadW = 150 || Math.min(screenW, screenH) / 5;
    this.offset = 100;
    this.carStart = { w: screenW/2, h: this.offset + this.roadW/2 };
    this.boundaries = this.getRoadBoundaries();
  }

  getRoadBoundaries() {
    const outerTop = [
      this.offset, this.offset,
      this.width - this.offset, this.offset];
    const innerTop = [
      this.offset + this.roadW, this.offset + this.roadW,
      this.width - this.offset - this.roadW, this.offset + this.roadW];
    const outerRight = [
      this.width - this.offset, this.offset,
      this.width - this.offset, this.height - this.offset];
    const innerRight = [
      this.width - this.offset - this.roadW, this.offset + this.roadW,
      this.width - this.offset - this.roadW, this.height - this.offset - this.roadW];
    const outerBottom = [
      this.offset, this.height - this.offset,
      this.width - this.offset, this.height - this.offset];
    const innerBottom = [
      this.offset + this.roadW, this.height - this.offset - this.roadW,
      this.width - this.offset - this.roadW, this.height - this.offset - this.roadW];
    const outerLeft = [
      this.offset, this.offset,
      this.offset, this.height - this.offset];
    const innerLeft = [
      this.offset + this.roadW, this.offset + this.roadW,
      this.offset + this.roadW, this.height - this.offset - this.roadW];

    return [
      outerTop, innerTop,
      outerRight, innerRight,
      outerBottom, innerBottom,
      outerLeft, innerLeft];
  }

  show() {
    const offset = this.offset;
    push();
    stroke(50);
    fill(50);
    rect(offset, offset, this.width - 2*offset, this.roadW);
    rect(
      offset, offset, this.roadW, this.height - 2*offset);
    rect(
      this.width - offset - this.roadW,
      offset,
      this.roadW, this.height - 2*offset);
    rect(
      offset,
      this.height - offset - this.roadW,
      this.width - 2*offset,
      this.roadW);
    stroke(124,252,0)
    line(this.width/2, offset, this.width/2, offset + this.roadW);
    pop();
  }

  getCarCrashStatus(car) {
    // calculating absolute car corner positions
    // 25^2 = 20^2 + 15^2 // car dimensions
    const crashObject = { isCrashed: false };
    for (var i = 0; i < car.corners.length; i++) {
      const ang = Math.atan2(car.corners[i][1], car.corners[i][0]);
      const cornerX = car.x + Math.cos(ang + car.angle)*25;
      const cornerY = car.y + Math.sin(ang + car.angle)*25;
      for (var j = 0; j < this.boundaries.length; j++) {
        const intersection = this.getLineIntersection(car.x, car.y, cornerX, cornerY, ...this.boundaries[j]);
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
    fill(255,0,0);
    ellipse(x, y, 25);
    pop();
  }

  getSensorReadings(car) {
    const sensorIntersections = [];
    for (var i = 0; i < car.sensors.length; i++) {
      const maxDistance = 125;
      const bufferedIntersections = [];
      const ang = Math.atan2(car.sensors[i].y, car.sensors[i].x);
      const sensorTipX = car.x + Math.cos(ang + car.angle)*maxDistance;
      const sensorTipY = car.y + Math.sin(ang + car.angle)*maxDistance;
      for (var j = 0; j < this.boundaries.length; j++) {
        const intersection = this.getLineIntersection(car.x, car.y, sensorTipX, sensorTipY, ...this.boundaries[j]);
        if (intersection.isIntersecting) {
          if (bufferedIntersections.length === 0) {
            const distance = this.getTwoPointDistance(
              car.x, car.y, intersection.x, intersection.y);
            bufferedIntersections.push(Object.assign(intersection, { distance, value: distance/maxDistance }));
          } else {
            const distance = this.getTwoPointDistance(
              car.x, car.y, intersection.x, intersection.y);
            if (distance < bufferedIntersections[0].distance) {
              bufferedIntersections[0] = Object.assign(intersection, { distance, value: distance/maxDistance });
            }
          }
        }
      }
      if (bufferedIntersections.length > 0) {
        sensorIntersections[i] = bufferedIntersections[0];
      } else {
        const distance = this.getTwoPointDistance(car.x, car.y, sensorTipX, sensorTipY);
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

  // copied from net
  getLineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
    let a1, a2, b1, b2, c1, c2;
    let r1, r2 , r3, r4;
    let denom, offset, num;
    let intersectObject = {}
    // Compute a1, b1, c1, where line joining points 1 and 2
    // is "a1 x + b1 y + c1 = 0".
    a1 = y2 - y1;
    b1 = x1 - x2;
    c1 = (x2 * y1) - (x1 * y2);
    // Compute r3 and r4.
    r3 = ((a1 * x3) + (b1 * y3) + c1);
    r4 = ((a1 * x4) + (b1 * y4) + c1);
    // Check signs of r3 and r4. If both point 3 and point 4 lie on
    // same side of line 1, the line segments do not intersect.
    if ((r3 !== 0) && (r4 !== 0) && this.sameSign(r3, r4)){
      return Object.assign(intersectObject, { isIntersecting: false });
      // return false;
    }
    // Compute a2, b2, c2
    a2 = y4 - y3;
    b2 = x3 - x4;
    c2 = (x4 * y3) - (x3 * y4);
    // Compute r1 and r2
    r1 = (a2 * x1) + (b2 * y1) + c2;
    r2 = (a2 * x2) + (b2 * y2) + c2;
    // Check signs of r1 and r2. If both point 1 and point 2 lie
    // on same side of second line segment, the line segments do
    // not intersect.
    if ((r1 != 0) && (r2 != 0) && (this.sameSign(r1, r2))){
      return Object.assign(intersectObject, { isIntersecting: false });
      // return false;
    }
    //Line segments intersect: compute intersection point.
    denom = (a1 * b2) - (a2 * b1);
    if (denom === 0) {
      throw new Error('lines are colinear');
    }
    if (denom < 0){ 
      offset = -1*denom / 2; 
    } 
    else {
      offset = denom / 2 ;
    }
    // The denom/2 is to get rounding instead of truncating. It
    // is added or subtracted to the numerator, depending upon the
    // sign of the numerator.
    num = (b1 * c2) - (b2 * c1);
    if (num < 0){
      Object.assign(intersectObject, { x: (num - offset) / denom });
      // this.crashSite[0] = (num - offset) / denom;
    } 
    else {
      Object.assign(intersectObject, { x: (num + offset) / denom });
      // this.crashSite[0] = (num + offset) / denom;
    }

    num = (a2 * c1) - (a1 * c2);
    if (num < 0){
       Object.assign(intersectObject, { y: (num - offset) / denom });
      // this.crashSite[1] = ( num - offset) / denom;
    } 
    else {
      Object.assign(intersectObject, { y: (num + offset) / denom });
      // this.crashSite[1] = (num + offset) / denom;
    }

    // lines_intersect
    return Object.assign(intersectObject, { isIntersecting: true });
    // return true;
  }

  sameSign(a, b) {
    return ((a * b) >= 0);
  }

  getTwoPointDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2));
  }

  showRandLine() {
    let x = 100;
    let y = 400;
    push();
    stroke(255,255,0);
    for (var i = 0; i < 10; i++) {
      const newX = x + 50;
      const newY = y + (2*Math.random()-1)*30;
      line(x,y, newX, newY);
      x = newX;
      y = newY;
    };
    pop();
  }
}