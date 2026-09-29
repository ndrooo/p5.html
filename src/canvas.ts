import P5Element from "./element";
import type p5 from "p5";

export default class P5Canvas extends P5Element {
  p5 = null;
  width: number = Number(this.getAttribute("width")) ?? 0;
  height: number = Number(this.getAttribute("height")) ?? 0;
  dimensionsChanged: boolean = false;

  static observedAttributes = ["width", "height"];

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

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "width") {
      this.width = Number(newValue) ?? 0;
    }
    if (name === "height") {
      this.height = Number(newValue) ?? 0;
    }
    if (name === "width" || name === "height") {
      this.dimensionsChanged = true;
    }
  }

  presetup(p: p5) {
    p.createCanvas(this.width, this.height);
  }

  setup(p: p5) {
    P5Element.setupChildren(this, p);
  }

  predraw(p: p5) {
    p.background(220);
  }

  draw(p: p5) {
    if (this.dimensionsChanged) {
      p.resizeCanvas(this.width, this.height);
      this.dimensionsChanged = false;
    }
    P5Element.drawChildren(this, p);
  }
}
