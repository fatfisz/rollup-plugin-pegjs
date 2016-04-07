import { buildParser } from "pegjs";
import { createFilter } from "rollup-pluginutils";

export default (options = {}) => ({
  transform(grammar, id) {
    const { target = "es6", include = ["*.pegjs", "**/*.pegjs"], exclude } = options;
    const filter = createFilter(include, exclude);
    const exporter = target == "es6" ? "" : "module.exports = ";
    const output = target == "es6" ? "es6-module" : "source";
    return filter(id) ?
      {
        code: `${exporter}${buildParser(grammar, { output })};`,
        map: { mappings: "" }
      } :
      null;
  }
})
