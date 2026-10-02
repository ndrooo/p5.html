import "./elements/capture";
import "./elements/circle";
import "./elements/ellipse";
import "./elements/image";
import "./elements/rect";
import "./elements/rotate";
import "./elements/scale";
import "./elements/translate";
import "./elements/text";
import P5Canvas from "./canvas";
import P5Element from "./element";
import type p5 from "p5";
import type { P5Html, P5HtmlExtension } from "./types";

declare global {
  interface Window {
    setup?: () => void;
    draw?: () => void;
    p5?: any;
    P5Element?: typeof P5Element;
  }
}

if (window.p5) {
  window.p5.registerAddon((p5: p5, fn: P5Html, lifecycles: any) => {
    fn.p5Root = null;
    lifecycles.presetup = function () {
      if (this.p5Root === null) {
        const canvases = document.getElementsByTagName("p5-canvas");
        if (canvases.length > 0) {
          this.p5Root = canvases[0];
          this._userNode = canvases[0];
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

window.P5Element = P5Element;

export { P5Element, P5Html, P5HtmlExtension };
