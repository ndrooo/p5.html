import type p5 from "p5";
import type P5Canvas from "./canvas";

export type P5HtmlExtension = {
  p5Root: P5Canvas | null;
};

export type P5Html = p5 & P5HtmlExtension;
