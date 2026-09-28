import P5Element from "./element";
import type p5 from "p5";

export default class P5Canvas extends P5Element {
  p5 = null;

  connectedCallback() {
    const globalMode =
      (window.setup && typeof window.setup === "function") ||
      (window.draw && typeof window.draw === "function");
    if (!("p5" in window) || globalMode) {
      return;
    }
    let p5Inst = new window.p5((p: p5) => {
      p.setup = () => {};
      p.draw = () => {};
    }, this);
    p5Inst.p5Root = this;
  }

  presetup(p: p5) {
    p.createCanvas(200, 200);
  }

  setup(p: p5) {
    P5Element.setupChildren(this, p);
  }

  predraw(p: p5) {
    p.background(220);
  }

  draw(p: p5) {
    P5Element.drawChildren(this, p);
  }
}
