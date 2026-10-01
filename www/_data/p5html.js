import npmPackage from "../../package.json" with { type: "json" };

export default function () {
  return {
    version: npmPackage.version,
    scriptTag: `<script src="https://cdn.jsdelivr.net/npm/p5.html@${npmPackage.version}/dist/p5.html.min.js" type="module"></script>`,
  };
}
