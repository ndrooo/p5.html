import type p5 from "p5";
import P5Capture from "./capture";
import P5Element from "../element";

export default class P5Image extends P5Element {
  src: string = "";
  fromCapture: string = "";
  dirty = false;
  provider: p5.Image | p5.Element | null = null;

  static observedAttributes = ["src", "from-capture"];

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    if (oldVal !== newVal) {
      this.dirty = true;
      if (name === "from-capture") {
        this.fromCapture = newVal;
      } else if (name === "src") {
        this.src = newVal;
      }
    }
  }

  setup(p: p5) {
    this.updateProvider(p);
  }

  draw(p: p5) {
    if (this.dirty) {
      this.updateProvider(p);
      this.dirty = false;
    }
    if (this.provider !== null) {
      // Type assurance for callback
      let provider = this.provider;
      this.cssContext(p, () => {
        p.image(provider, 0, 0);
      });
    }
  }

  async updateProvider(p: p5) {
    let capture = document.getElementById(this.fromCapture);
    if (capture instanceof P5Capture) {
      this.provider = capture.video ?? null;
    } else if (this.src !== "") {
      this.provider = await p.loadImage(this.src);
    } else {
      this.provider = null;
    }
  }
}

customElements.define("p5-image", P5Image);
