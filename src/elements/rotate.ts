import P5Element from "../element";
import p5 from "p5";

class P5Rotate extends P5Element {
  angle: number = Number(this.getAttribute("angle") ?? 0);
  static observedAttributes = ["angle"];

  draw(p: p5) {
    p.push();
    p.rotate(this.angle);
    P5Element.drawChildren(this, p);
    p.pop();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "angle") {
      this.angle = Number(newValue) ?? 0;
    }
  }
}

customElements.define("p5-rotate", P5Rotate);
