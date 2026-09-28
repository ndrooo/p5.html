import P5Element from "../element.js";

class P5Rect extends P5Element {
  observedAttributes = ["w", "h"];

  connectedCallback() {
    this.width = Number(this.getAttribute("w")) || 0;
    this.height = Number(this.getAttribute("h")) || 0;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "w") {
      this.width = Number(newValue) || 0;
    }
    if (name === "h") {
      this.height = Number(newValue) || 0;
    }
  }

  draw(p) {
    p.fill("red");
    p.rect(0, 0, this.width, this.height);
    p.noFill();
  }
}

customElements.define("p5-rect", P5Rect);
