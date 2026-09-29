import P5Element from "../element";
import type p5 from "p5";
import { P5Html } from "../types";

export default class P5Capture extends P5Element {
  video?: p5.Element;
  replaceVideo = false;
  flipped: boolean = Boolean(this.getAttribute("flipped"));

  static observedAttributes = ["flipped"];

  setup(p: P5Html) {
    this.initializeVideo(p);
    P5Element.setupChildren(this, p);
  }

  draw(p: P5Html) {
    if (this.replaceVideo) {
      this.initializeVideo(p);
      this.replaceVideo = false;
    }
    P5Element.drawChildren(this, p);
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string | null,
  ) {
    if (name === "flipped" && oldValue !== newValue) {
      this.flipped = newValue?.toLowerCase() === "true";
      this.replaceVideo = true;
    }
  }

  initializeVideo(p: P5Html) {
    this.video?.remove();
    // @ts-ignore
    this.video = p.createCapture("video", { flipped: this.flipped });
    if (p.p5Root) {
      this.video.size(p.p5Root.width, p.p5Root.height);
    }
    this.video.hide();
  }
}

customElements.define("p5-capture", P5Capture);
