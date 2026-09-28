import P5Element from "../element";
import type p5 from "p5";

class P5Text extends P5Element {
  content = this.innerText;

  connectedCallback() {
    this.style.display = "none";
  }

  draw(p: p5) {
    p.fill("grey");
    p.stroke("black");
    p.text(this.content, 0, 0);
    p.noFill();
    p.noStroke();
  }
}

customElements.define("p5-text", P5Text);
