import type p5 from "p5";
import P5Capture from "./capture";
import P5Element from "../element";

export default class P5Image extends P5Element {
  src: string = "";
  fromCapture: string = "";
  dirty = false;
  capture: P5Capture | null = null;
  image: p5.Image | null = null;

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
    if (this.capture && this.capture.video) {
      let video = this.capture.video;
      this.cssContext(p, () => {
        p.image(video, 0, 0);
      });
    } else if (this.image) {
      let image = this.image;
      this.cssContext(p, () => {
        p.image(image, 0, 0);
      });
    }
  }

  async updateProvider(p: p5) {
    let capture = document.getElementById(this.fromCapture);
    this.capture = null;
    this.image = null;
    if (capture instanceof P5Capture) {
      this.capture = capture;
    } else if (this.src !== "") {
      this.image = await p.loadImage(this.src);
    }
  }
}

customElements.define("p5-image", P5Image);
