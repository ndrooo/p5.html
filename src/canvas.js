import P5Element from "./element.js";

if (window.p5) {
  window.p5.registerAddon((p5, fn, lifecycles) => {
    fn.p5Root = null;
    lifecycles.presetup = function () {
      if (this.p5Root === null) {
        const canvases = document.getElementsByTagName("p5-canvas");
        if (canvases.length > 0) {
          this.p5Root = canvases[0];
        }
      }
      if (this.p5Root !== null) {
        this.p5Root.presetup(this);
      }
    };
    lifecycles.postsetup = function () {
      if (this.p5Root !== null) {
        this.p5Root.setup(this);
      }
    };
    lifecycles.predraw = function () {
      if (this.p5Root !== null) {
        this.p5Root.predraw(this);
      }
    };
    lifecycles.postdraw = function () {
      if (this.p5Root !== null) {
        this.p5Root.draw(this);
      }
    };
    lifecycles.remove = function () {
      if (this.p5Root !== null) {
        this.p5Root.remove();
        this.p5Root = null;
      }
    };
  });
}

export default class P5Canvas extends P5Element {
  p5 = null;

  connectedCallback() {
    const globalMode =
      (window.setup && typeof window.setup === "function") ||
      (window.draw && typeof window.draw === "function");
    if (!("p5" in window) || globalMode) {
      return;
    }
    let p5Inst = new window.p5((p) => {
      p.setup = () => {};
      p.draw = () => {};
    }, this);
    p5Inst.p5Root = this;
  }

  presetup(p) {
    p.createCanvas(200, 200);
  }

  setup(p) {
    P5Element.setupChildren(this, p);
  }

  predraw(p) {
    p.background(220);
  }

  draw(p) {
    P5Element.drawChildren(this, p);
  }
}

customElements.define("p5-canvas", P5Canvas);
