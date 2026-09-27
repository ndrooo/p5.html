export default class P5Element extends HTMLElement {
  setup(p) {
    P5Element.setupChildren(this, p);
  }

  draw(p) {
    P5Element.drawChildren(this, p);
  }

  static setupChildren(node, p) {
    Array.from(node.children).forEach((child) => {
      if (child instanceof P5Element) {
        child.setup(p);
      } else {
        if (child.children) {
          P5Element.setupChildren(child, p);
        }
      }
    });
  }

  static drawChildren(node, p) {
    Array.from(node.children).forEach((child) => {
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
