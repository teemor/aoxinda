module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = { exports: {} }; __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); if(typeof m.exports === "object") { Object.keys(m.exports).forEach(function(k) { __MODS__[modId].m.exports[k] = m.exports[k]; }); if(m.exports.__esModule) Object.defineProperty(__MODS__[modId].m.exports, "__esModule", { value: true }); } else { __MODS__[modId].m.exports = m.exports; } } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1545789478793, function(require, module, exports) {
var defineProp = Object.defineProperty;

module.exports = {
	get Parser(){
		defineProp(this, "Parser", {value:require("./Parser.js")});
		return this.Parser;
	},
	get DomHandler(){
		defineProp(this, "DomHandler", {value:require("domhandler")});
		return this.DomHandler;
	},
	get FeedHandler(){
		defineProp(this, "FeedHandler", {value:require("./FeedHandler.js")});
		return this.FeedHandler;
	},
	get ElementType(){
		defineProp(this, "ElementType", {value:require("domelementtype")});
		return this.ElementType;
	},
	get Stream(){
		defineProp(this, "Stream", {value:require("./Stream.js")});
		return this.Stream;
	},
	get WritableStream(){
		defineProp(this, "WritableStream", {value:require("./WritableStream.js")});
		return this.WritableStream;
	},
	get ProxyHandler(){
		defineProp(this, "ProxyHandler", {value:require("./ProxyHandler.js")});
		return this.ProxyHandler;
	},
	get DomUtils(){
		defineProp(this, "DomUtils", {value:require("domutils")});
		return this.DomUtils;
	},
	// For legacy support
	get DefaultHandler(){
		defineProp(this, "DefaultHandler", {value: this.DomHandler});
		return this.DefaultHandler;
	},
	get RssHandler(){
		defineProp(this, "RssHandler", {value: this.FeedHandler});
		return this.FeedHandler;
	},
	// List of all events that the parser emits
	EVENTS: { /* Format: eventname: number of arguments */
		attribute: 2,
		cdatastart: 0,
		cdataend: 0,
		text: 1,
		processinginstruction: 2,
		comment: 1,
		commentend: 0,
		closetag: 1,
		opentag: 2,
		opentagname: 1,
		error: 1,
		end: 0
	}
}
}, function(modId) {var map = {"./Parser.js":1545789478794,"./FeedHandler.js":1545789478796,"./Stream.js":1545789478797,"./WritableStream.js":1545789478798,"./ProxyHandler.js":1545789478800}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1545789478794, function(require, module, exports) {
var ElementType = require("./ElementType.js");

function Parser(cbs, options){
	this._options = options || defaultOpts;
	this._cbs = cbs || defaultCbs;
	this._buffer = "";
	this._tagSep = ">";
	this._stack = [];
	this._wroteSpecial = false;
	this._contentFlags = 0;
	this._done = false;
	this._running = true; //false if paused
}

//Regular expressions used for cleaning up and parsing (stateless)

/* http://dev.w3.org/html5/html-author/#attributes
 * - Whitespace is permitted after the tag name, but it is not permitted before the tag name.
 * - Attribute names must consist of one or more characters other than the space characters,
 *   control characters, NULL, one of the characters: double quote ("), single quote ('),
 *   greater-than sign (>), solidus (/), equals sign (=), nor any characters that are not defined by Unicode.
 * - An empty attribute is one where the value has been omitted. (<input disabled>...</input>
 * - An unquoted attribute value must not contain any literal space characters, any of the characters:
 *   double quote ("), apostrophe ('), equals sign (=), less-than sign (<), greater-than sign (>),
 *   or grave accent (`), and the value must not be the empty string.
 * - There may be space characters between the attribute name and the equals sign (=),
 *   and between that and the attribute value.
 * - Double-quoted attributes must not contain any double-quote characters or ambiguous ampersands.
 * - Single-quoted attributes must not contain any single-quote characters or ambiguous ampersands.
 */
// element name:	(<[^<& ]+)
// attribute name:	( [^"'=>\/]+)
// attribute value:	(\s*=\s*(?:
//						"([^"]*)"|
//						'([^']*)'|
//						[^\s"'=<>`]+)
// tag end: (?=\s|\/|$)

var _reAttrib = /\s+([^"'=>\/\s]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))|(?=\s)|\/|$)/g,
    _reTail = /\s|\/|$/;

var defaultOpts = {
	xmlMode: false, //Special behavior for script/style tags by default
	lowerCaseAttributeNames: false, //call .toLowerCase for each attribute name
	lowerCaseTags: false //call .toLowerCase for each tag name
};

var defaultCbs = {
	/*
		This is just a plain object
		so that the parser doesn't
		throw if no arguments were
		provided.
	*/
	/*
		oncdataend,
		oncdatastart,
		onclosetag,
		oncomment,
		oncommentend,
		onerror,
		onopentag,
		onopentagend,
		onprocessinginstruction,
		onreset,
		ontext
	*/
};

var formTags = {
	input: true,
	option: true,
	optgroup: true,
	select: true,
	button: true,
	datalist: true,
	textarea: true
};
var openImpliesClose = {
	tr      : { tr:true, th:true, td:true },
	th      : { th:true },
	td      : { thead:true, td:true },
	body    : { head:true, link:true, script:true },
	li      : { li:true },
	p       : { p:true },
	select  : formTags,
	input   : formTags,
	output  : formTags,
	button  : formTags,
	datalist: formTags,
	textarea: formTags,
	option  : { option:true },
	optgroup: { optgroup:true }
};

//Parses a complete HTML and pushes it to the handler
Parser.prototype.parseComplete = function(data){
	this.reset();
	this.end(data);
};

//Parses a piece of an HTML document
Parser.prototype.parseChunk =
Parser.prototype.write = function(data){
	if(this._done) this._handleError("Attempted to parse chunk after parsing already done");
	this._buffer += data; //FIXME: this can be a bottleneck
	if(this._running) this._parseTags();
};

//Tells the parser that the HTML being parsed is complete
Parser.prototype.done =
Parser.prototype.end = function(chunk){
	if(this._done) return;

	if(chunk) this.write(chunk);
	this._done = true;
	
	if(this._running) this._finishParsing();
};

Parser.prototype._finishParsing = function(){
	//Parse the buffer to its end
	if(this._buffer) this._parseTags(true);
	
	if(this._cbs.onclosetag){
		while(this._stack.length) this._cbs.onclosetag(this._stack.pop());
	}
	
	if(this._cbs.onend) this._cbs.onend();
};

Parser.prototype.pause = function(){
	if(!this._done) this._running = false;
};

Parser.prototype.resume = function(){
	if(this._running) return;
	this._running = true;
	this._parseTags();
	if(this._done) this._finishParsing();
};

//Resets the parser to a blank state, ready to parse a new HTML document
Parser.prototype.reset = function(){
	Parser.call(this, this._cbs, this._options);
	if(this._cbs.onreset) this._cbs.onreset();
};

//Extracts the base tag name from the data value of an element
Parser.prototype._parseTagName = function(data){
	var match = data.substr(0, data.search(_reTail));
	if(!this._options.lowerCaseTags) return match;
	return match.toLowerCase();
};

//Special tags that are treated differently
var SpecialTags = {};
//SpecialTags[ElementType.Tag]   = 0x0;
SpecialTags[ElementType.Style]   = 0x1; //2^0
SpecialTags[ElementType.Script]  = 0x2; //2^1
SpecialTags[ElementType.Comment] = 0x4; //2^2
SpecialTags[ElementType.CDATA]   = 0x8; //2^3

var TagValues = {
	style: 1,
	script: 2
};

//Parses through HTML text and returns an array of found elements
Parser.prototype._parseTags = function(force){
	var current = 0,
	    opening = this._buffer.indexOf("<"),
	    closing = this._buffer.indexOf(">"),
	    next, rawData, elementData, lastTagSep;

	//if force is true, parse everything
	if(force) opening = Infinity;

	//opening !== closing is just false if both are -1
	while(opening !== closing && this._running){
		lastTagSep = this._tagSep;
		
		if((opening !== -1 && opening < closing) || closing === -1){
			next = opening;
			this._tagSep = "<";
			opening = this._buffer.indexOf("<", next + 1);
		}
		else{
			next = closing;
			this._tagSep = ">";
			closing = this._buffer.indexOf(">", next + 1);
		}
		rawData = this._buffer.substring(current, next); //The next chunk of data to parse
		
		//set elements for next run
		current = next + 1;
		
		if(this._contentFlags >= SpecialTags[ElementType.CDATA]){
			// We're inside a CDATA section
			this._writeCDATA(rawData);

		}
		else if(this._contentFlags >= SpecialTags[ElementType.Comment]){
			//We're in a comment tag
			this._writeComment(rawData);
		}
		else if(lastTagSep === "<"){
			elementData = rawData.trimLeft();
			if(elementData.charAt(0) === "/"){
				//elementData = elementData.substr(1).trim();
				elementData = this._parseTagName(elementData.substr(1));
				if(this._contentFlags !== 0){
					//if it's a closing tag, remove the flag
					if(this._contentFlags & TagValues[elementData]){
						//remove the flag
						this._contentFlags ^= TagValues[elementData];
					} else {
						this._writeSpecial(rawData, lastTagSep);
						continue;
					}
				}
				this._processCloseTag(elementData);
			}
			else if(this._contentFlags !== 0) this._writeSpecial(rawData, lastTagSep);
			else if(elementData.charAt(0) === "!"){
				if(elementData.substr(1, 7) === "[CDATA["){
					this._contentFlags |= SpecialTags[ElementType.CDATA];
					if(this._cbs.oncdatastart) this._cbs.oncdatastart();
					this._writeCDATA(elementData.substr(8));
				}
				else if(this._contentFlags !== 0) this._writeSpecial(rawData, lastTagSep);
				else if(elementData.substr(1, 2) === "--"){
					//This tag is a comment
					this._contentFlags |= SpecialTags[ElementType.Comment];
					this._writeComment(rawData.substr(3));
				}
				//TODO: This isn't a processing instruction, needs a new name
				else if(this._cbs.onprocessinginstruction){
					this._cbs.onprocessinginstruction(
						"!" + this._parseTagName(elementData.substr(1)),
						elementData
					);
				}
			}
			else if(elementData.charAt(0) === "?"){
				if(this._cbs.onprocessinginstruction){
					this._cbs.onprocessinginstruction(
						"?" + this._parseTagName(elementData.substr(1)),
						elementData
					);
				}
			}
			else this._processOpenTag(elementData);
		}
		else{
			if(this._contentFlags !== 0){
				this._writeSpecial(rawData, ">");
			}
			else if(this._cbs.ontext){
				if(this._tagSep === ">") rawData += ">"; //it's the second > in a row
				if(rawData !== "") this._cbs.ontext(rawData);
			}
		}
	}

	this._buffer = this._buffer.substr(current);
};

Parser.prototype._writeCDATA = function(data){
	if(this._tagSep === ">" && data.substr(-2) === "]]"){
		// CDATA ends
		if(data.length !== 2 && this._cbs.ontext){
			this._cbs.ontext(data.slice(0,-2));
		}
		this._contentFlags ^= SpecialTags[ElementType.CDATA];
		if(this._cbs.oncdataend) this._cbs.oncdataend();
		this._wroteSpecial = false;
    }
    else if(this._cbs.ontext) this._cbs.ontext(data + this._tagSep);
};

Parser.prototype._writeComment = function(rawData){
	if(this._tagSep === ">" && rawData.substr(-2) === "--"){ //comment ends
		//remove the written flag (also removes the comment flag)
		this._contentFlags ^= SpecialTags[ElementType.Comment];
		this._wroteSpecial = false;
		if(this._cbs.oncomment) this._cbs.oncomment(rawData.slice(0, -2));
		if(this._cbs.oncommentend) this._cbs.oncommentend();
	}
	else if(this._cbs.oncomment) this._cbs.oncomment(rawData + this._tagSep);
};

Parser.prototype._writeSpecial = function(rawData, lastTagSep){
	//if the previous element is text, append the last tag sep to element
	if(this._wroteSpecial){
		if(this._cbs.ontext) this._cbs.ontext(lastTagSep + rawData);
	}
	else{ //The previous element was not text
		this._wroteSpecial = true;
		if(rawData !== "" && this._cbs.ontext) this._cbs.ontext(rawData);
	}
};

var emptyTags = {
	__proto__: null,
	area: true,
	base: true,
	basefont: true,
	br: true,
	col: true,
	frame: true,
	hr: true,
	img: true,
	input: true,
	isindex: true,
	link: true,
	meta: true,
	param: true,
	embed: true
};

Parser.prototype._processCloseTag = function(name){
	if(this._stack && (!(name in emptyTags) || this._options.xmlMode)){
		var pos = this._stack.lastIndexOf(name);
		if(pos !== -1)
			if(this._cbs.onclosetag){
				pos = this._stack.length - pos;
				while(pos--) this._cbs.onclosetag(this._stack.pop());
			}
			else this._stack.splice(pos);
	}
	//many browsers (eg. Safari, Chrome) convert </br> to <br>
	else if(name === "br" && !this._options.xmlMode){
		this._processOpenTag(name + "/");
	}
};

Parser.prototype._parseAttributes = function(data, lcNames){
	for(var match; match = _reAttrib.exec(data);){
		this._cbs.onattribute(lcNames ? match[1].toLowerCase() : match[1], match[2] || match[3] || match[4] || "");
	}
};

//parses the attribute string
var parseAttributes = function(data, lcNames){
	var attrs = {};
	for(var match; match = _reAttrib.exec(data);){
		attrs[lcNames ? match[1].toLowerCase() : match[1]] = match[2] || match[3] || match[4] || "";
	}
	return attrs;
};

Parser.prototype._processOpenTag = function(data){
	var name = this._parseTagName(data),
		attributes = parseAttributes(data, this._options.lowerCaseAttributeNames),
		type = ElementType.Tag;
	
	if(this._options.xmlMode){ /*do nothing*/ }
	else if(name === "script") type = ElementType.Script;
	else if(name === "style")  type = ElementType.Style;
	if (!this._options.xmlMode && name in openImpliesClose) {
		var el;
		while ((el = this._stack[this._stack.length-1]) in openImpliesClose[name]) {
			this._processCloseTag(el);
		}
	}
	if(this._cbs.onopentagname) this._cbs.onopentagname(name);
	if(this._cbs.onopentag) this._cbs.onopentag(name, attributes);
	if(this._cbs.onattribute){
		this._parseAttributes(data, this._options.lowerCaseAttributeNames);
	}
	
	//If tag self-terminates, add an explicit, separate closing tag
	/* http://dev.w3.org/html5/html-author/#tags
	 * In XHTML, self-closing tags are valid but attribute values must be quoted.
	 * In HTML, self-closing tags must be either void elements or foreign elements.
	 * Invalid HTML self-closing tag syntax is ignored (treated as an opening tag).
	 * Foreign elements use XML rules
	 */
	if((!this._options.xmlMode && name in emptyTags) || (data.substr(-1) === "/" && data.replace(_reAttrib, "").substr(-1) === "/")){
		if(this._cbs.onclosetag) this._cbs.onclosetag(name);
	} else {
		if(type !== ElementType.Tag){
			this._contentFlags |= SpecialTags[type];
			this._wroteSpecial = false;
		}
		this._stack.push(name);
	}
};

Parser.prototype._handleError = function(error){
	error = new Error(error);
	if(this._cbs.onerror) this._cbs.onerror(error);
	else throw error;
};

module.exports = Parser;

}, function(modId) { var map = {"./ElementType.js":1545789478795}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1545789478795, function(require, module, exports) {
//Types of elements found in the DOM
module.exports = {
	Text: 0, //Text
	Directive: 1, //<? ... ?>
	Comment: 2, //<!-- ... -->
	Script: 3, //<script> tags
	Style: 4, //<style> tags
	Tag: 5, //Any tag
	CDATA: 6 //<![CDATA[ ... ]]>
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1545789478796, function(require, module, exports) {
var index = require("./index.js"),
    DomHandler = index.DomHandler,
	DomUtils = index.DomUtils;

//TODO: make this a streamable handler
function FeedHandler(callback){
	this.init(callback, { ignoreWhitespace: true });
}

require("util").inherits(FeedHandler, DomHandler);

FeedHandler.prototype.init = DomHandler;

function getElements(what, where, one, recurse){
	if(one) return DomUtils.getElementsByTagName(what, where, recurse, 1)[0];
	return DomUtils.getElementsByTagName(what, where, recurse);
}
function fetch(what, where, recurse){
	var ret = DomUtils.getElementsByTagName(what, where, recurse, 1);
	return ret.length > 0 && ret[0].children.length > 0 && ret[0].children[0].data;
}

var isValidFeed = function(value) {
	return value === "rss" || value === "feed" || value === "rdf:RDF";
};

FeedHandler.prototype.onend = function() {
	var feed = {},
		feedRoot = getElements(isValidFeed, this.dom, true),
		tmp, childs;

	if (feedRoot) {
		if(feedRoot.name === "feed"){
			childs = feedRoot.children;

			feed.type = "atom";
			if(tmp = fetch("id", childs)) feed.id = tmp;
			if(tmp = fetch("title", childs)) feed.title = tmp;
			if((tmp = getElements("link", childs, true)) && (tmp = tmp.attribs) && (tmp = tmp.href)) feed.link = tmp;
			if(tmp = fetch("subtitle", childs)) feed.description = tmp;
			if(tmp = fetch("updated", childs)) feed.updated = new Date(tmp);
			if(tmp = fetch("email", childs, true)) feed.author = tmp;

			feed.items = getElements("entry", childs).map(function(item){
				var entry = {}, tmp;

				item = item.children;

				if(tmp = fetch("id", item)) entry.id = tmp;
				if(tmp = fetch("title", item)) entry.title = tmp;
				if((tmp = getElements("link", item, true)) && (tmp = tmp.attribs) && (tmp = tmp.href)) entry.link = tmp;
				if(tmp = fetch("summary", item)) entry.description = tmp;
				if(tmp = fetch("updated", item)) entry.pubDate = new Date(tmp);
				return entry;
			});
		} else{
			childs = getElements("channel", feedRoot.children, true).children;

			feed.type = feedRoot.name.substr(0, 3);
			feed.id = "";
			if(tmp = fetch("title", childs)) feed.title = tmp;
			if(tmp = fetch("link", childs)) feed.link = tmp;
			if(tmp = fetch("description", childs)) feed.description = tmp;
			if(tmp = fetch("lastBuildDate", childs)) feed.updated = new Date(tmp);
			if(tmp = fetch("managingEditor", childs)) feed.author = tmp;

			feed.items = getElements("item", feedRoot.children).map(function(item){
				var entry = {}, tmp;

				item = item.children;

				if(tmp = fetch("guid", item)) entry.id = tmp;
				if(tmp = fetch("title", item)) entry.title = tmp;
				if(tmp = fetch("link", item)) entry.link = tmp;
				if(tmp = fetch("description", item)) entry.description = tmp;
				if(tmp = fetch("pubDate", item)) entry.pubDate = new Date(tmp);
				return entry;
			});
		}
	}
	this.dom = feed;
	DomHandler.prototype._handleCallback.call(
		this, feedRoot ? null : Error("couldn't find root of feed")
	);
};

module.exports = FeedHandler;
}, function(modId) { var map = {"./index.js":1545789478793}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1545789478797, function(require, module, exports) {
var WritableStream = require("./WritableStream.js");

var Stream = function(options){
	WritableStream.call(this, new cbs(this), options);
};

require("util").inherits(Stream, WritableStream);

Stream.prototype.readable = true;

var cbs = function(scope){
	this.scope = scope;
};

var EVENTS = require("../").EVENTS;

Object.keys(EVENTS).forEach(function(name){
	if(EVENTS[name] === 0){
		cbs.prototype["on" + name] = function(){
			this.scope.emit(name);
		};
	} else if(EVENTS[name] === 1){
		cbs.prototype["on" + name] = function(a){
			this.scope.emit(name, a);
		};
	} else if(EVENTS[name] === 2){
		cbs.prototype["on" + name] = function(a, b){
			this.scope.emit(name, a, b);
		};
	} else {
		throw Error("wrong number of arguments!");
	}
});

module.exports = Stream;
}, function(modId) { var map = {"./WritableStream.js":1545789478798}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1545789478798, function(require, module, exports) {
var Parser = require("./Parser.js");

var WritableStream = function(cbs, options){
	Parser.call(this, cbs, options);
};

require("util").inherits(WritableStream, require("stream").Stream);

//util.inherits would overwrite the prototype when called twice,
//so we need a different approach
Object.getOwnPropertyNames(Parser.prototype).forEach(function(name){
	WritableStream.prototype[name] = Parser.prototype[name];
});

WritableStream.prototype.writable = true;

// TODO improve support for Parser#pause and Parser#continue

module.exports = WritableStream;
}, function(modId) { var map = {"./Parser.js":1545789478794,"stream":1545789478799}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1545789478799, function(require, module, exports) {
var WritableStream = require("./WritableStream.js");

var Stream = function(options){
	WritableStream.call(this, new cbs(this), options);
};

require("util").inherits(Stream, WritableStream);

Stream.prototype.readable = true;

var cbs = function(scope){
	this.scope = scope;
};

var EVENTS = require("../").EVENTS;

Object.keys(EVENTS).forEach(function(name){
	if(EVENTS[name] === 0){
		cbs.prototype["on" + name] = function(){
			this.scope.emit(name);
		};
	} else if(EVENTS[name] === 1){
		cbs.prototype["on" + name] = function(a){
			this.scope.emit(name, a);
		};
	} else if(EVENTS[name] === 2){
		cbs.prototype["on" + name] = function(a, b){
			this.scope.emit(name, a, b);
		};
	} else {
		throw Error("wrong number of arguments!");
	}
});

module.exports = Stream;
}, function(modId) { var map = {"./WritableStream.js":1545789478798}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1545789478800, function(require, module, exports) {
var ProxyHandler = function(cbs){
	if(cbs) this._cbs = cbs;
};

ProxyHandler.prototype._cbs = {};

Object.keys(require("./").EVENTS).forEach(function(name){
	name = "on" + name;
	Object.defineProperty(ProxyHandler.prototype, name, {
		enumerable:true, configurable:true,
		get: function(){ return this._cbs[name]; },
		set: function(value){
			//allow functions to be overwritten
			Object.defineProperty(this, name, {value: value});
		}
	});
});

module.exports = ProxyHandler;
}, function(modId) { var map = {"./":1545789478793}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1545789478793);
})()
//# sourceMappingURL=index.js.map