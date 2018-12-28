module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1545789478766, function(require, module, exports) {
/**
 * Export cheerio (with )
 */

exports = module.exports = process.env.CHEERIO_COV
  ? require('./lib-cov/cheerio')
  : require('./lib/cheerio');

/*
  Export the version
*/

exports.version = require('./package').version;

}, function(modId) {var map = {"./lib/cheerio":1545789478767}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1545789478767, function(require, module, exports) {
/*
  Module dependencies
*/

var path = require('path'),
    select = require('cheerio-select'),
    parse = require('./parse'),
    evaluate = parse.evaluate,
    updateDOM = parse.update,
    isArray = Array.isArray,
    _ = require('underscore');

/*
 * The API
 */

var api = ['attributes', 'traversing', 'manipulation'];

/*
 * A simple way to check for HTML strings or ID strings
 */

var quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;

/**
 * Static Methods
 */

var $ = require('./static');

/*
 * Instance of cheerio
 */

var Cheerio = module.exports = function(selector, context, root) {
  if(!(this instanceof Cheerio)) return new Cheerio(selector, context, root);

  // $(), $(null), $(undefined), $(false)
  if(!selector) return this;

  if(root) {
    if(typeof root === 'string') root = parse(root);
    this._root = this.make(root, this);
  }

  // $($)
  if(selector.cheerio) return selector;

  // $(dom)
  if(selector.name || isArray(selector))
    return this.make(selector, this);

  // $(<html>)
  if(typeof selector === 'string' && isHtml(selector)) {
    return this.make(parse(selector).children);
  }

  // If we don't have a context, maybe we have a root, from loading
  if(!context) {
    context = this._root;
  } else if(typeof context === 'string') {
    if(isHtml(context)) {
      // $('li', '<ul>...</ul>')
      context = parse(context).children;
      context = this.make(context, this);
    } else {
      // $('li', 'ul')
      selector = [context, selector].join(' ');
      context = this._root;
    }
  }

  // If we still don't have a context, return
  if(!context) return this;

  // #id, .class, tag
  return context.find(selector);
};

/**
 * Inherit from `static`
 */

Cheerio.__proto__ = require('./static');

/*
 * Set a signature of the object
 */

Cheerio.prototype.cheerio = '[cheerio object]';

/*
 * Cheerio default options
 */

Cheerio.prototype.options = {
  ignoreWhitespace : false,
  xmlMode : false,
  lowerCaseTags : false
};

/*
 * Make cheerio an array-like object
 */

Cheerio.prototype.length = 0;
Cheerio.prototype.sort = [].splice;

/*
 * Check if string is HTML
 */
function isHtml(str) {
  // Faster than running regex, if str starts with `<` and ends with `>`, assume it's HTML
  if ( str.charAt(0) === "<" && str.charAt( str.length - 1 ) === ">" && str.length >= 3 ) return true;

  // Run the regex
  var match = quickExpr.exec(str);
  return (match && match[1]) ? true : false;
}

/*
 * Make a cheerio object
 */

Cheerio.prototype.make = function(dom, context) {
  if(dom.cheerio) return dom;
  dom = (_.isArray(dom)) ? dom : [dom];
  return _.extend(context || new Cheerio(), dom, { length : dom.length });
};

/**
 * Turn a cheerio object into an array
 */

Cheerio.prototype.toArray = function() {
  return [].slice.call(this, 0);
};

/**
 * Plug in the API
 */
api.forEach(function(mod) {
  _.extend(Cheerio.prototype, require('./api/' + mod));
});

}, function(modId) { var map = {"./parse":1545789478768,"./static":1545789478770}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1545789478768, function(require, module, exports) {
/*
  Module Dependencies
*/
var htmlparser = require('htmlparser2'),
    _ = require('underscore'),
    isTag = require('./utils').isTag,
    isArray = Array.isArray;

/*
  Parser
*/
exports = module.exports = function(content, options) {
  var dom = evaluate(content, options);

  // Generic root element
  var root = {
    type : 'root',
    name : 'root',
    parent : null,
    prev : null,
    next : null,
    children : []
  };

  // Update the dom using the root
  update(dom, root);

  return root;
};

var evaluate = exports.evaluate = function(content, options) {
  // options = options || $.fn.options;

  var handler = new htmlparser.DomHandler(options),
      parser = new htmlparser.Parser(handler, options);

  parser.write(content);
  parser.done();

  return connect(handler.dom);
};

var connect = exports.connect = function(dom, parent) {
  parent = parent || null;

  var prevElem = null;

  _.each(dom, function(elem) {
    // If tag and no attributes, add empty object
    if (isTag(elem.type) && elem.attribs === undefined)
      elem.attribs = {};

    // Set parent
    elem.parent = parent;

    // Previous Sibling
    elem.prev = prevElem;

    // Next sibling
    elem.next = null;
    if (prevElem) prevElem.next = elem;

    // Run through the children
    if (elem.children)
      connect(elem.children, elem);
    else if (isTag(elem.type))
      elem.children = [];

    // Get ready for next element
    prevElem = elem;
  });

  return dom;
};

/*
  Update the dom structure, for one changed layer

  * Much faster than reconnecting
*/
var update = exports.update = function(arr, parent) {
  // normalize
  arr = isArray(arr) ? arr : [arr];

  // Update neighbors
  for (var i = 0; i < arr.length; i++) {
    arr[i].prev = arr[i-1] || null;
    arr[i].next = arr[i+1] || null;
    arr[i].parent = parent || null;
  }

  // Update parent
  parent.children = arr;

  return parent;
};

// module.exports = $.extend(exports);

}, function(modId) { var map = {"./utils":1545789478769}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1545789478769, function(require, module, exports) {
/**
 * Module Dependencies
 */
var entities = require('entities');

/**
 * HTML Tags
 */

var tags = { tag : true, script : true, style : true };

/**
 * Check if the DOM element is a tag
 *
 * isTag(type) includes <script> and <style> tags
 */

exports.isTag = function(type) {
  if (type.type) type = type.type;
  return tags[type] || false;
};

/**
 * Expose encode and decode methods from FB55's node-entities library
 *
 * 0 = XML, 1 = HTML4 and 2 = HTML5
 */

exports.encode = function(str) { return entities.encode(String(str), 0); };
exports.decode = function(str) { return entities.decode(str, 2); };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1545789478770, function(require, module, exports) {
/**
 * Module dependencies
 */

var select = require('cheerio-select'),
    parse = require('./parse'),
    render = require('./render'),
    decode = require('./utils').decode;

/**
 * $.load(str)
 */

var load = exports.load = function(str, options) {
  var Cheerio = require('./cheerio'),
      root = parse(str, options);

  function initialize(selector, context, r) {
    return new Cheerio(selector, context, r || root);
  }

  // Add in the static methods
  initialize.__proto__ = exports;

  // Add in the root
  initialize._root = root;

  return initialize;
};

/**
 * $.html([selector | dom])
 */

var html = exports.html = function(dom) {
  if (dom) {
    dom = (typeof dom === 'string') ? select(dom, this._root) : dom;
    return render(dom);
  } else if (this._root && this._root.children) {
    return render(this._root.children);
  } else {
    return '';
  }
};

/**
 * $.text(dom)
 */

var text = exports.text = function(elems) {
  if (!elems) return '';

  var ret = '',
      len = elems.length,
      elem;

  for (var i = 0; i < len; i ++) {
    elem = elems[i];
    if (elem.type === 'text') ret += decode(elem.data);
    else if (elem.children && elem.type !== 'comment') {
      ret += text(elem.children);
    }
  }

  return ret;
};

/**
 * $.root()
 */
var root = exports.root = function() {
  return this(this._root);
};

}, function(modId) { var map = {"./parse":1545789478768,"./render":1545789478771,"./utils":1545789478769,"./cheerio":1545789478767}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1545789478771, function(require, module, exports) {
/*
  Module dependencies
*/
var _ = require('underscore'),
    isArray = Array.isArray;

/*
  Boolean Attributes
*/
var rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i;

/*
  Format attributes
*/
var formatAttrs = function(attributes) {
  if (!attributes) return '';

  var output = [],
      value;

  // Loop through the attributes
  for (var key in attributes) {
    value = attributes[key];
    if (!value && (rboolean.test(key) || key === '/')) {
      output.push(key);
    } else {
      output.push(key + '="' + value + '"');
    }
  }

  return output.join(' ');
};

/*
  Self-enclosing tags (stolen from node-htmlparser)
*/
var singleTag = {
  area: 1,
  base: 1,
  basefont: 1,
  br: 1,
  col: 1,
  frame: 1,
  hr: 1,
  img: 1,
  input: 1,
  isindex: 1,
  link: 1,
  meta: 1,
  param: 1,
  embed: 1,
  include: 1,
  'yield': 1
};

/*
  Tag types from htmlparser
*/
var tagType = {
  tag : 1,
  script : 1,
  link : 1,
  style : 1,
  template : 1
};

render = module.exports = function(dom, opts) {
  dom = (isArray(dom) || dom.cheerio) ? dom : [dom];
  opts = opts || {};

  var output = [],
      xmlMode = opts.xmlMode || false,
      ignoreWhitespace = opts.ignoreWhitespace || false;

  _.each(dom, function(elem) {
    var pushVal;

    if (tagType[elem.type])
      pushVal = renderTag(elem);
    else if (elem.type === 'directive')
      pushVal = renderDirective(elem);
    else if (elem.type === 'comment')
      pushVal = renderComment(elem);
    else
      pushVal = renderText(elem);

    // Push rendered DOM node
    output.push(pushVal);

    if (elem.children)
      output.push(render(elem.children, opts));

    if ((!singleTag[elem.name] || xmlMode) && tagType[elem.type])
      output.push('</' + elem.name + '>');
  });

  return output.join('');
};

var renderTag = function(elem) {
  var tag = '<' + elem.name;

  if (elem.attribs && _.size(elem.attribs)) {
    tag += ' ' + formatAttrs(elem.attribs);
  }
  
  return tag + '>';
};

var renderDirective = function(elem) {
  return '<' + elem.data + '>';
};

var renderText = function(elem) {
  return elem.data;
};

var renderComment = function(elem) {
  return '<!--' + elem.data + '-->';
};

// module.exports = $.extend(exports);

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1545789478766);
})()
//# sourceMappingURL=index.js.map