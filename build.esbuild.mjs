import * as esbuild from "esbuild";

const options = {
  bundle: true,
  entryPoints: ["src/index.ts"],
  sourcemap: true,
};

await esbuild.build({ ...options, outfile: "dist/p5.html.js" });
await esbuild.build({
  ...options,
  minify: true,
  outfile: "dist/p5.html.min.js",
});
