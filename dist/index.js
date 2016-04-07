'use strict';

var pegjs = require('pegjs');
var rollupPluginutils = require('rollup-pluginutils');

var index = (function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  return {
    transform: function transform(grammar, id) {
      var _options$target = options.target;
      var target = _options$target === undefined ? "es6" : _options$target;
      var _options$include = options.include;
      var include = _options$include === undefined ? ["*.pegjs", "**/*.pegjs"] : _options$include;
      var exclude = options.exclude;

      var filter = rollupPluginutils.createFilter(include, exclude);
      var exporter = target == "es6" ? "" : "module.exports = ";
      var output = target == "es6" ? "es6-module" : "source";
      return filter(id) ? {
        code: "" + exporter + pegjs.buildParser(grammar, { output: output }) + ";",
        map: { mappings: "" }
      } : null;
    }
  };
})

module.exports = index;