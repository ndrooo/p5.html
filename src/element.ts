import type p5 from "p5";

export default class P5Element extends HTMLElement {
  setup(p: p5) {
    P5Element.setupChildren(this, p);
  }

  draw(p: p5) {
    P5Element.drawChildren(this, p);
  }

  cssContext(p: p5, callback: (p?: p5) => void) {
    p.stroke(getComputedStyle(this).getPropertyValue("color"));
    p.fill(getComputedStyle(this).getPropertyValue("background"));
    let opacity = Number(getComputedStyle(this).getPropertyValue("opacity"));
    p.tint(255, opacity * 255);

    callback(p);

    p.noStroke();
    p.noFill();
    p.noTint();
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
