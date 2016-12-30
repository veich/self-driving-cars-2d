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
}