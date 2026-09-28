import P5Element from "../element";
import p5 from "p5";

class P5Translate extends P5Element {
  x: number = Number(this.getAttribute("x") ?? 0);
  y: number = Number(this.getAttribute("y") ?? 0);
  static observedAttributes = ["x", "y"];

  draw(p: p5) {
    p.push();
    p.translate(this.x, this.y);
    P5Element.drawChildren(this, p);
    p.pop();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "x") {
      this.x = Number(newValue) ?? 0;
    }
    if (name === "y") {
      this.y = Number(newValue) ?? 0;
    }
  }
}

customElements.define("p5-translate", P5Translate);
