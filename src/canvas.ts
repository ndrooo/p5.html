import P5Element from "./element";
import type p5 from "p5";

export default class P5Canvas extends P5Element {
  p5: p5 | null = null;
  width: number = Number(this.getAttribute("width")) ?? 0;
  height: number = Number(this.getAttribute("height")) ?? 0;
  dimensionsChanged: boolean = false;
  paused = this.getAttribute("paused")?.toLowerCase() === "true";
  ranFrameOne = false;

  static observedAttributes = ["width", "height", "paused"];

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

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string | null,
  ) {
    if (name === "width") {
      this.width = Number(newValue) ?? 0;
    }
    if (name === "height") {
      this.height = Number(newValue) ?? 0;
    }
    if (name === "width" || name === "height") {
      this.dimensionsChanged = true;
    }
    if (name === "paused") {
      this.paused = newValue?.toLowerCase() === "true";
      if (this.p5 && !this.paused) {
        this.p5.loop();
      }
    }
  }

  presetup(p: p5) {
    this.p5 = p;
    p.createCanvas(this.width, this.height);
    this.drawBackground(p);
  }

  setup(p: p5) {
    P5Element.setupChildren(this, p);
  }

  predraw(p: p5) {
    if (this.paused && this.ranFrameOne) {
      p.noLoop();
    } else {
      p.loop();
      this.ranFrameOne = true;
    }
    this.drawBackground(p);
  }

  draw(p: p5) {
    if (this.dimensionsChanged) {
      p.resizeCanvas(this.width, this.height);
      this.dimensionsChanged = false;
    }
    P5Element.drawChildren(this, p);
  }

  drawBackground(p: p5) {
    let background = getComputedStyle(this).background;
    if (background && background !== "none" && background !== "transparent") {
      p.background(background);
    }
  }
}
