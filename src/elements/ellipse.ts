import P5Element from "../element";
import type p5 from "p5";

class P5Ellipse extends P5Element {
  observedAttributes = ["w", "h"];

  width: number = 0;
  height: number = 0;

  connectedCallback() {
    this.width = Number(this.getAttribute("w")) || 0;
    this.height = Number(this.getAttribute("h")) || 0;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "w") {
      this.width = Number(newValue) || 0;
    }
    if (name === "h") {
      this.height = Number(newValue) || 0;
    }
  }

  draw(p: p5) {
    this.cssContext(p, () => {
      p.ellipse(0, 0, this.width, this.height);
    });
  }
}

customElements.define("p5-ellipse", P5Ellipse);
