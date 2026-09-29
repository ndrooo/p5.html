import P5Element from "../element";
import type p5 from "p5";

class P5Circle extends P5Element {
  observedAttributes = ["d"];

  diameter: number = 0;

  connectedCallback() {
    this.diameter = Number(this.getAttribute("d")) || 0;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "d") {
      this.diameter = Number(newValue) || 0;
    }
  }

  draw(p: p5) {
    p.fill("red");
    p.circle(0, 0, this.diameter);
    p.noFill();
  }
}

customElements.define("p5-circle", P5Circle);
