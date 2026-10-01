import npmPackage from "../../package.json" with { type: "json" };

export default function () {
  return {
    version: npmPackage.version,
  };
}
