class SpinThing extends P5Element {
  time = 0;

  draw(p) {
    p.push();
    p.rotate(this.time * this.getAttribute("speed"));
    P5Element.drawChildren(this, p);
    p.pop();
    this.time += 0.01;
  }
}

customElements.define("spin-thing", SpinThing);
