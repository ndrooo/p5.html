import P5Element from "../element.js";

class P5Rect extends P5Element {
  draw(p) {
    p.fill("red");
    p.rect(0, 0, 20, 20);
    p.noFill();
  }
}

customElements.define("p5-rect", P5Rect);
