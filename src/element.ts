import type p5 from "p5";

export default class P5Element extends HTMLElement {
  setup(p: p5) {
    P5Element.setupChildren(this, p);
  }

  draw(p: p5) {
    P5Element.drawChildren(this, p);
  }

  static setupChildren(node: Element, p: p5) {
    Array.from(node.children).forEach((child: Element) => {
      if (child instanceof P5Element) {
        child.setup(p);
      } else {
        if (child.children) {
          P5Element.setupChildren(child, p);
        }
      }
    });
  }

  static drawChildren(node: Element, p: p5) {
    Array.from(node.children).forEach((child: Element) => {
      if (child instanceof P5Element) {
        child.draw(p);
      } else {
        if (child.children) {
          P5Element.drawChildren(child, p);
        }
      }
    });
  }
}
