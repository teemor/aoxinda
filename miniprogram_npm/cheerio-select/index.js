module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1545789478764, function(require, module, exports) {
exports = module.exports = require('./lib/select');

/*
  Export the version
*/
exports.version = (function() {
  var pkg = require('fs').readFileSync(__dirname + '/package.json', 'utf8');
  return JSON.parse(pkg).version;
})();

}, function(modId) {var map = {"./lib/select":1545789478765}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1545789478765, function(require, module, exports) {
/*
 * Module dependencies
 */
var CSSselect = require('CSSselect'),
    isArray = Array.isArray;

/*
 * Select function
 */
exports = module.exports = function(query, dom) {
  dom = normalize(dom);

  return CSSselect.iterate(query, dom);
};

/*
 * Normalize the dom
 */
var normalize = exports.normalize = function(dom) {
  dom = dom.cheerio ? dom.toArray() : dom;
  dom = isArray(dom) ? dom : [dom];

  var len = dom.length,
      out = [],
      elem;

  for(var i = 0; i < len; i++) {
    elem = dom[i];
    if(elem.type === 'root') {
      out = out.concat(elem.children || []);
    } else {
      out.push(elem);
    }
  }

  return out;
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1545789478764);
})()
//# sourceMappingURL=index.js.map