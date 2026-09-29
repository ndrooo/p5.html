import "./elements/circle";
import "./elements/ellipse";
import "./elements/rect";
import "./elements/rotate";
import "./elements/scale";
import "./elements/translate";
import "./elements/text";
import P5Canvas from "./canvas";
import P5Element from "./element";
import type p5 from "p5";

declare global {
  interface Window {
    setup?: () => void;
    draw?: () => void;
    p5?: any;
  }
}

if (window.p5) {
  window.p5.registerAddon((p5: p5, fn: any, lifecycles: any) => {
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

// This must be defined after the addon is set up
customElements.define("p5-canvas", P5Canvas);

export { P5Element };
