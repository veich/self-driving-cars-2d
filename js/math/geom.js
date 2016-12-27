// copied from net
function getLineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
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
  if ((r3 !== 0) && (r4 !== 0) && sameSign(r3, r4)){
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
  if ((r1 != 0) && (r2 != 0) && (sameSign(r1, r2))){
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

function sameSign(a, b) {
  return ((a * b) >= 0);
}

function getTwoPointDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2));
}