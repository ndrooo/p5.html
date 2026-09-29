import * as esbuild from "esbuild";

export default function (config) {
  config.on("afterBuild", () => {
    return esbuild.build({
      entryPoints: ["src/index.ts"],
      bundle: true,
      sourcemap: true,
      outfile: "_site/p5.html.js",
    });
  });
  config.ignores.add("eleventy.config.js");
  config.addWatchTarget("src/");
  config.addPassthroughCopy("www/**/*.js");
  config.addPassthroughCopy("www/**/*.css");
  config.addPassthroughCopy("www/static/");
}
