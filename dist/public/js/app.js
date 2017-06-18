/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__h__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__app__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__router__["a"]; });







/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = Link;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function Link(props, children) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
    'a',
    _extends({}, props, {
      onclick: function (e) {
        e.preventDefault();
        props.go(props.href);
      }
    }),
    children
  );
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(22);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* harmony default export */ __webpack_exports__["a"] = (function (app) {
  return {
    state: {
      sync: {
        token: null,
        status: ''
      }
    },
    actions: {
      sync: {
        setToken: function (state, actions, data) {
          return { sync: { token: data } };
        },
        setStatus: function (state, actions, data) {
          return { sync: { status: data } };
        },
        createProfile: function (state, { setToken: setToken, setStatus: setStatus }, data) {
          return _asyncToGenerator(function* () {
            var res = yield fetch('/sync/create', { method: 'POST' });

            if (res.ok) {
              var token = yield res.text();

              setToken(token);
              setStatus('Created new profile');
            } else {
              setStatus('Unable to create profile');
            }
          })();
        },
        addDevice: function (state, { setStatus: setStatus }) {
          return _asyncToGenerator(function* () {
            var res = yield fetch('/sync/authorize', {
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + state.sync.token
              }
            });

            if (res.ok) {
              var _code = yield res.text();

              setStatus('Enter code on other device: ' + _code);
            } else {
              setStatus('Unable to get access code');
            }
          })();
        },
        connectDevice: function (state, { setToken: setToken, setStatus: setStatus }, data) {
          return _asyncToGenerator(function* () {
            var res = fetch('/sync/join', {
              method: 'POST',
              body: code
            });

            if (res.ok) {
              var token = yield res.text();

              setToken(token);
              setStatus('Successfully joined profile');
            } else {
              setStatus('Unable to join profile');
            }
          })();
        }
      }
    },
    events: {
      loaded: function (state, actions) {
        try {
          var token = localStorage.getItem('authToken');
          if (token) {
            actions.sync.setToken(token);
          }
        } catch (e) {}
      },
      update: function (state, actions, data, emit) {
        if (data.sync && data.sync.token) {
          localStorage.setItem('authToken', data.sync.token);
        }
      }
    }
  };
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initialState; });
var initialEpisodeInfo = {
  index: 0,
  size: 0,
  title: 'No Episode Loaded',
  imageUrl: '',
  audioUrl: '',
  cacheProgress: 0
};

var initialState = {
  episodeList: {
    episodes: []
  },
  episodes: [initialEpisodeInfo],
  index: 0,
  selectedIndex: 0,
  playing: false,
  uiShowsPlaying: false,
  seekToPosition: 0,
  uiPosition: 0,
  duration: 0,
  autoplay: true,
  volume: 1,
  showingBookmarks: false,
  showingEpisodes: false,
  bookmarks: [],
  cacheCommand: null,
  cacheSize: 0
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_link__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_play_pause_button__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__episodes_scss__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__episodes_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__episodes_scss__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






var Episode = function ({
  title: title,
  date: date,
  downloadProgress: downloadProgress,

  deleteEpisode: deleteEpisode,
  downloadEpisode: downloadEpisode,
  playEpisode: playEpisode
}) {
  var button = void 0;
  if (downloadProgress === 1) {
    button = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'button',
      { onclick: deleteEpisode, 'class': __WEBPACK_IMPORTED_MODULE_3__episodes_scss___default.a.leanRight },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])('span', { 'class': 'icon-trash-empty' })
    );
  } else if (downloadProgress === 0) {
    button = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'button',
      { onclick: downloadEpisode, 'class': __WEBPACK_IMPORTED_MODULE_3__episodes_scss___default.a.leanRight },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])('span', { 'class': 'icon-download-cloud' })
    );
  } else if (typeof downloadProgress !== 'number') {
    button = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'div',
      { 'class': __WEBPACK_IMPORTED_MODULE_3__episodes_scss___default.a.progress },
      downloadProgress
    );
  } else {
    button = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'div',
      { 'class': __WEBPACK_IMPORTED_MODULE_3__episodes_scss___default.a.progress },
      Math.round(downloadProgress * 100) + '%'
    );
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
    'div',
    { 'class': __WEBPACK_IMPORTED_MODULE_3__episodes_scss___default.a.episode },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'time',
      { datetime: formatDate(date) },
      formatHumanDate(date)
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'div',
      { 'class': __WEBPACK_IMPORTED_MODULE_3__episodes_scss___default.a.title },
      title
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(__WEBPACK_IMPORTED_MODULE_2__components_play_pause_button__["a" /* ProgressPlayPauseButton */], { progress: 1, playing: false, color: '#fff' }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'button',
      { onClick: playEpisode },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])('span', { 'class': 'icon-play' })
    ),
    button
  );
};

/* harmony default export */ __webpack_exports__["a"] = (function (state, actions) {
  // TODO: When showing this page, scroll to the currently playing episode if there is one
  var episodes = state.episodeList.episodes;
  var _actions$storage = actions.storage,
      downloadEpisode = _actions$storage.downloadEpisode,
      deleteEpisode = _actions$storage.deleteEpisode;

  // TODO: Show size of all cached episodes

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
    'div',
    null,
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'div',
      { 'class': __WEBPACK_IMPORTED_MODULE_3__episodes_scss___default.a.titlebar },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
        __WEBPACK_IMPORTED_MODULE_1__components_link__["a" /* default */],
        { 'class': __WEBPACK_IMPORTED_MODULE_3__episodes_scss___default.a.back, title: 'Back to Podcasts', href: '/', go: actions.router.go },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])('span', { 'class': 'icon-play' })
      )
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'div',
      { 'class': __WEBPACK_IMPORTED_MODULE_3__episodes_scss___default.a.episodes },
      episodes.map(function (episode) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(Episode, _extends({
          key: episode.index
        }, episode));
      })
    )
  );
});

function formatDate(time) {
  var d = new Date(time);

  return d.getYear() + 1900 + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

function formatHumanDate(time) {
  var d = new Date(time);

  return d.getMonth() + 1 + '/' + d.getDate();
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__podcast_entry__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dist_data_podcasts_hardcoded__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dist_data_podcasts_hardcoded___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__dist_data_podcasts_hardcoded__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_link__ = __webpack_require__(1);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






/* harmony default export */ __webpack_exports__["a"] = (function (state, actions) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
    'div',
    { 'class': 'podcast-app' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'div',
      { 'class': 'syncbar' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
        __WEBPACK_IMPORTED_MODULE_3__components_link__["a" /* default */],
        { 'class': 'syncbtn button', href: '/sync', go: actions.router.go },
        'Sync'
      )
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'div',
      { 'class': 'podcasts' },
      __WEBPACK_IMPORTED_MODULE_2__dist_data_podcasts_hardcoded__["podcasts"].map(function (podcast) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(__WEBPACK_IMPORTED_MODULE_1__podcast_entry__["a" /* default */], _extends({ go: actions.router.go }, podcast));
      })
    )
  );
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_scss__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__player_scss__);



var PlayButton = function () {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
    'button',
    { 'class': 'toggle-playing', onclick: togglePlaying, title: uiShowsPlaying ? 'Pause' : 'Play' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])('span', { 'class': uiShowsPlaying ? 'icon-pause' : 'icon-play' })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (function (state, actions) {
  var episode = state.player.episode;


  if (episode) {
    var title = episode.title;


    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'div',
      { 'class': __WEBPACK_IMPORTED_MODULE_1__player_scss__["appPlayer"] },
      title,
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
        'div',
        { 'class': __WEBPACK_IMPORTED_MODULE_1__player_scss__["seek_scrub"] },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(PlayButton, null),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])('input', {
          'class': 'scrubber',
          type: 'range',
          min: '0',
          max: Math.round(duration),
          value: Math.round(uiPosition),
          oninput: seekScrubbedTo
        }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
          'div',
          { 'class': 'time' },
          formatTime(uiPosition) + ' / ' + formatTime(duration)
        )
      )
    );
  } else {
    return null;
  }
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(0);


// TODO: Create sync plugin for this
/* harmony default export */ __webpack_exports__["a"] = (function (state, actions) {
  var _state$sync = state.sync,
      token = _state$sync.token,
      status = _state$sync.status;


  var firstBtn = null;

  if (!token) {
    firstBtn = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'button',
      { onclick: actions.sync.createProfile },
      'Create Sync Profile'
    );
  } else {
    firstBtn = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'button',
      { onclick: actions.sync.addDevice },
      'Add Another Device'
    );
  }

  var uuid = 'N/A';
  if (token) {
    uuid = JSON.parse(atob(token.split('.')[1])).data;
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
    'div',
    { 'class': 'sync' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'div',
      null,
      uuid
    ),
    firstBtn,
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])('input', { 'class': 'code-in', placeholder: 'Access Code' }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'button',
      { onclick: function (e) {
          return actions.sync.connectDevice(e.target.previousSibling.value);
        } },
      'Add to Existing Profile'
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'span',
      { 'class': 'status' },
      status
    )
  );
});

// TODO
function storePlace(podcastName, blob) {
  var token = localStorage.getItem('authToken');

  if (token) {
    return fetch('/sync/store/' + podcastName, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: blob
    }).then(okResponse);
  }
}

function getPlace(podcastName) {
  var token = localStorage.getItem('authToken');

  if (token) {
    return fetch('/sync/get/' + podcastName, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(okResponse);
  }
}

function okResponse(res) {
  if (res.ok) return res.text();
  return null;
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var podcasts = [{
  name: 'mbmbam',
  humanName: 'MBMBAM',
  feedUrl: 'https://feeds.feedburner.com/mbmbam',
  icon: 'mbmbam_300.jpg'
}, {
  name: 'rosebuddies',
  humanName: 'Rosebuddies',
  feedUrl: 'http://rosebuddies.libsyn.com/rss',
  icon: 'rosebuddies_300.jpg'
}, {
  name: 'adventurezone',
  humanName: 'The Adventure Zone',
  feedUrl: 'http://adventurezone.libsyn.com/rss',
  icon: 'adventurezone_300.jpg'
}, {
  name: 'throwingshade',
  humanName: 'Throwing Shade',
  feedUrl: 'http://throwingshade.libsyn.com/rss',
  icon: 'throwingshade_300.jpg'
}, {
  name: 'cipyd',
  humanName: 'Can I Pet Your Dog?',
  feedUrl: 'http://cipyd.libsyn.com/rss',
  icon: 'cipyd_300.jpg'
}, {
  name: 'ladytolady',
  humanName: 'Lady to Lady',
  feedUrl: 'http://ladytolady.libsyn.com/rss',
  icon: 'ladytolady_300.jpg'
}, {
  name: 'stoppodcastingyourself',
  humanName: 'Stop Podcasting Yourself',
  feedUrl: 'http://feeds.feedburner.com/stoppodcastingyourself',
  icon: 'stoppodcastingyourself_300.jpg'
}, {
  name: 'jordanjessego',
  humanName: 'Jordan, Jesse GO!',
  feedUrl: 'http://feeds.feedburner.com/thornmorris',
  icon: 'jordanjessego_300.jpg'
}, {
  name: 'bunkerbuddies',
  humanName: 'Bunker Buddies with Andie and Travis',
  feedUrl: 'http://bunkerbuddies.libsyn.com/rss',
  icon: 'bunkerbuddies_300.jpg'
}, {
  name: 'theflophouse',
  humanName: 'The Flop House',
  feedUrl: 'http://theflophouse.libsyn.com/rss',
  icon: 'theflophouse_300.jpg'
}, {
  name: 'judgejohnhodgman',
  humanName: 'Judge John Hodgman',
  feedUrl: 'http://feeds.feedburner.com/todayinthepast',
  icon: 'judgejohnhodgman_300.jpg'
}];

var podcastMap = {};
podcasts.forEach(function (podcast) {
  return podcastMap[podcast.name] = podcast;
});

function getPodcasts() {
  return podcasts;
}

function getPodcast(name) {
  if (!podcastMap.hasOwnProperty(name)) name = 'mbmbam';
  return podcastMap[name];
}

module.exports = {
  podcasts: podcasts,
  getPodcasts: getPodcasts,
  getPodcast: getPodcast
};

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_index__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_sync__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_episodes__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_bookmarks__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_bookmarks___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__views_bookmarks__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_player__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__plugins_sync__ = __webpack_require__(4);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }












var Logger = function (app) {
  return {
    events: {
      update: function (state, actions, data, emit) {
        console.log('update', data, state);
      },
      action: function (state, actions, data) {
        console.log('action', data);
      }
    }
  };
};

// https://www.html5rocks.com/en/tutorials/audio/scheduling/
var PlayerPlugin = function (app) {
  return {
    state: {
      podcastName: '',
      episodeIndex: 0,
      player: {
        episode: null
      }
    },
    events: {
      update: function (state, actions, data, emit) {
        // TODO: Control the audio player on changes from this
        return data;
      },
      render: function (state, actions, view, emit) {
        return function (state, actions) {
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
            'div',
            { 'class': 'app-holder' },
            view(state, actions),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__views_player__["a" /* default */])(state, actions)
          );
        };
      }
    }
  };
};

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["b" /* app */])({
  state: __WEBPACK_IMPORTED_MODULE_1__state__["a" /* initialState */],
  view: {
    '/': __WEBPACK_IMPORTED_MODULE_2__views_index__["a" /* default */],
    '/sync': __WEBPACK_IMPORTED_MODULE_3__views_sync__["a" /* default */],
    '/p/:podcastName': __WEBPACK_IMPORTED_MODULE_4__views_episodes__["a" /* default */],
    '/p/:podcastName/bookmarks': __WEBPACK_IMPORTED_MODULE_5__views_bookmarks___default.a
  },
  actions: {
    episodeList: {
      play: function (state, actions, episodeIndex) {
        return {
          player: {
            episode: state.episodeList.episodes[episodeIndex]
          }
        };
      },
      setEpisodes: function (state, actions, episodes) {
        return {
          episodeList: {
            episodes: episodes
          }
        };
      },
      load: function (state, actions) {
        return _asyncToGenerator(function* () {
          var podcastName = state.router.params.podcastName;


          var res = yield fetch('/p/' + podcastName + '/list');

          if (res.ok) {
            var episodes = yield res.json();

            actions.episodeList.setEpisodes(episodes);
          }
        })();
      }
    },
    storage: {
      downloadEpisode: function (state, actions, { podcastName: podcastName, episodeIndex: episodeIndex }) {
        // TODO

        return _asyncToGenerator(function* () {})();
      },
      deleteEpisode: function (state, actions, { podcastName: podcastName, episodeIndex: episodeIndex }) {
        // TODO

        return _asyncToGenerator(function* () {})();
      }
    }
  },
  events: {
    update: function (state, actions, data) {
      if (data.router && data.router.match) {
        var match = data.router.match;


        if (match === '/p/:podcastName') {
          actions.episodeList.load();
        } else if (match === '/p/:podcastName/bookmarks') {
          // TODO refresh bookmark data from server
        }
      }
    }
  },
  plugins: [__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* Router */], __WEBPACK_IMPORTED_MODULE_7__plugins_sync__["a" /* default */], PlayerPlugin, Logger],
  root: document.getElementById('mountpoint')
});

// TODO: import {syncStoreToStorage} from './plugins/storage';
// TODO: import {bootServiceWorker} from '../common';

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__play_pause_button_scss__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__play_pause_button_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__play_pause_button_scss__);
/* harmony export (immutable) */ __webpack_exports__["a"] = ProgressPlayPauseButton;



function ProgressPlayPauseButton({ onclick: onclick, playing: playing, progress: progress, color = '#000' }) {
  var symbol = playing ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])('path', { fill: color, 'class': 'pause', d: 'M30,20 L40,20 40,80 30,80 Z M60,20 70,20 70,80 60,80 Z' }) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])('path', { fill: color, 'class': 'play', d: 'M30,20 L80,50 30,80' });

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
    'button',
    { 'class': __WEBPACK_IMPORTED_MODULE_1__play_pause_button_scss___default.a.progressPlayPauseButton, onclick: onclick },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      'svg',
      { width: '100', height: '100', viewBox: '0 0 100 100' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])('path', { 'class': 'progress', stroke: color, 'stroke-width': '4', fill: 'transparent', d: describeArc(50, 50, 45, 0, progress * 359.9) }),
      symbol
    )
  );
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");

  return d;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_link__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = (function ({ name: name, humanName: humanName, go: go }) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
    'section',
    { 'class': 'podcast-card' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
      __WEBPACK_IMPORTED_MODULE_1__components_link__["a" /* default */],
      { href: '/p/' + name, go: go },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])('img', { 'class': 'card-image', src: '/p/' + name + '/icon' }),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* h */])(
        'h1',
        { 'class': 'card-title' },
        humanName
      )
    )
  );
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "._1SY1Z4is_Pe4ytvrURwH-z {\n  margin-left: auto; }\n\n.JpVTKRYn2rgkfIGasOKXU {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  max-width: 412px;\n  display: flex;\n  align-items: center;\n  background-color: #f92977;\n  color: white; }\n\n._84ChEq1YdRcJ7OGxSYaG7 {\n  transform: rotateZ(180deg);\n  display: flex;\n  align-items: center;\n  padding: 0 15px; }\n\n._1Ca5axjCOf5N-Qz0UTaZzB {\n  margin-top: 48px;\n  max-height: 100v; }\n\n._2qmrxNmK5PJXTcAyZRq9l2 {\n  display: flex;\n  align-items: center; }\n\n._2d0BZheedVaV1GHS1j2VB- {\n  flex: 1 1 auto;\n  font-size: 1em;\n  margin: 0;\n  padding: 0.7em 10px; }\n\n.H0YYxO6K0S-YK01qW_bC4 {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 48px;\n  min-width: 48px;\n  background-color: #f92977;\n  font-weight: bold;\n  color: white; }\n", ""]);

// exports
exports.locals = {
	"leanRight": "_1SY1Z4is_Pe4ytvrURwH-z",
	"titlebar": "JpVTKRYn2rgkfIGasOKXU",
	"back": "_84ChEq1YdRcJ7OGxSYaG7",
	"episodes": "_1Ca5axjCOf5N-Qz0UTaZzB",
	"episode": "_2qmrxNmK5PJXTcAyZRq9l2",
	"title": "_2d0BZheedVaV1GHS1j2VB-",
	"progress": "H0YYxO6K0S-YK01qW_bC4"
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "._19F3wvTyHUSQRdbx7DDWjz {\n  margin-left: auto; }\n\n.iHEiw0tfjT7effroIy46K {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  max-width: 412px;\n  display: flex;\n  align-items: center;\n  background-color: #f92977;\n  color: white; }\n\n._2FVM9QC1jfIiIiFZhY38Wr {\n  transform: rotateZ(180deg);\n  display: flex;\n  align-items: center;\n  padding: 0 15px; }\n\n._3xbLo3mrujhfuQ8Qd0q7vE {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: #f92977;\n  height: 64px; }\n\n._1vWgbUFazc4h4NT0lP9-9b {\n  margin: 0 auto;\n  width: 100%;\n  max-width: 412px;\n  display: flex;\n  flex-direction: column; }\n\n._2QLZCsXf59kZ3LJWm1xnR1 {\n  padding-top: 48px; }\n\n@media (min-width: 412px) {\n  ._2QLZCsXf59kZ3LJWm1xnR1 > .TPYd66cD-7f_PnWMjm7wv {\n    font-size: 1.1em; } }\n\n.JMVBLoP87seZRcU7x3hSV > img {\n  width: 100%;\n  vertical-align: bottom; }\n\n._7wWc6ixLJ9pWG-CCoVPpK, .iKIv-bJjRhuVE4bS_stOx {\n  height: 48px;\n  width: 100%;\n  display: flex;\n  border: solid 2px #f92977;\n  background-color: #f92977;\n  align-items: center; }\n\n._3EUwnSP2eQhKoTUOdaxXNk {\n  padding: 0 15px; }\n\n._1QTdEE384bP-qfXMkEVUJu {\n  -webkit-appearance: none;\n  outline: none;\n  width: 100%;\n  background-color: #f92977; }\n\n._1QTdEE384bP-qfXMkEVUJu::-webkit-slider-runnable-track {\n  height: 8px;\n  width: 100%;\n  border-radius: 4px;\n  background-color: white; }\n\n._1QTdEE384bP-qfXMkEVUJu::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  background-color: #772443;\n  height: 20px;\n  width: 20px;\n  border-radius: 10px;\n  margin-top: -6px; }\n\n._1uoMWyJl5YNLdZ05UQkqRP {\n  line-height: 48px;\n  height: 100%;\n  color: white;\n  background-color: #f92977;\n  font-size: 20px;\n  white-space: nowrap;\n  padding: 0 5px 0 15px; }\n\n._14HxcxZpsMZusN-lpMNdO3 {\n  display: flex; }\n\n._14HxcxZpsMZusN-lpMNdO3 > button {\n  flex: 1 0 auto; }\n\n._2KtJhyIkIlppLN71kZWBlK {\n  display: flex;\n  background-color: #f92977;\n  border: solid 2px #f92977;\n  justify-content: space-around; }\n\n._2KtJhyIkIlppLN71kZWBlK > button {\n  flex: 1 0 auto; }\n\n._2KtJhyIkIlppLN71kZWBlK > input {\n  flex: 1 1 auto;\n  text-align: center;\n  font-size: 20px;\n  max-width: 125px;\n  border: 0;\n  outline: 0; }\n\n.r64UH0W90XmOcc5vj9Rmq {\n  display: flex;\n  justify-content: space-around;\n  margin-top: 20px; }\n\n.lZVofaUFGsd4D50hb2Jvc, ._1DaO5XVaLf7XL-zOV2Rdl_ {\n  margin-top: 48px;\n  max-height: 100v; }\n\n.-TwJxKnRRoFt6U8bSX_yc, ._1wJkf-h2VIQ850l5urgHYR {\n  display: flex;\n  align-items: center; }\n\n._1JwKh_PczI_h6fye9lHKXN {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 48px;\n  min-width: 48px;\n  background-color: #f92977;\n  font-weight: bold;\n  color: white; }\n\n._2WzoWLofcEZcC11dQEyR8A, ._3xgK0BnGazp-2VNC-83c8t {\n  flex: 1 1 auto;\n  padding: 0px 0 0px 6px; }\n\n._3xgK0BnGazp-2VNC-83c8t {\n  font-size: 1.1em;\n  font-weight: bold; }\n", ""]);

// exports
exports.locals = {
	"leanRight": "_19F3wvTyHUSQRdbx7DDWjz",
	"titlebar": "iHEiw0tfjT7effroIy46K",
	"back": "_2FVM9QC1jfIiIiFZhY38Wr",
	"appPlayer": "_3xbLo3mrujhfuQ8Qd0q7vE",
	"holder": "_1vWgbUFazc4h4NT0lP9-9b",
	"player": "_2QLZCsXf59kZ3LJWm1xnR1",
	"title": "TPYd66cD-7f_PnWMjm7wv",
	"podcastImage": "JMVBLoP87seZRcU7x3hSV",
	"seek_scrub": "_7wWc6ixLJ9pWG-CCoVPpK",
	"volume": "iKIv-bJjRhuVE4bS_stOx",
	"togglePlaying": "_3EUwnSP2eQhKoTUOdaxXNk",
	"scrubber": "_1QTdEE384bP-qfXMkEVUJu",
	"time": "_1uoMWyJl5YNLdZ05UQkqRP",
	"seek": "_14HxcxZpsMZusN-lpMNdO3",
	"nav": "_2KtJhyIkIlppLN71kZWBlK",
	"options": "r64UH0W90XmOcc5vj9Rmq",
	"episodes": "lZVofaUFGsd4D50hb2Jvc",
	"bookmarks": "_1DaO5XVaLf7XL-zOV2Rdl_",
	"episode": "-TwJxKnRRoFt6U8bSX_yc",
	"bookmark": "_1wJkf-h2VIQ850l5urgHYR",
	"episodeProgress": "_1JwKh_PczI_h6fye9lHKXN",
	"episodeTitle": "_2WzoWLofcEZcC11dQEyR8A",
	"bookmarkTitle": "_3xgK0BnGazp-2VNC-83c8t"
};

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(app) {
  var state = {}
  var view = app.view
  var actions = {}
  var events = {}
  var node
  var element

  for (var i = -1, plugins = app.plugins || []; i < plugins.length; i++) {
    var plugin = plugins[i] ? plugins[i](app) : app

    if (plugin.state != null) {
      state = merge(state, plugin.state)
    }

    init(actions, plugin.actions)

    Object.keys(plugin.events || []).map(function(key) {
      events[key] = (events[key] || []).concat(plugin.events[key])
    })
  }

  if (document.readyState[0] !== "l") {
    load()
  } else {
    addEventListener("DOMContentLoaded", load)
  }

  function init(namespace, children, lastName) {
    Object.keys(children || []).map(function(key) {
      var action = children[key]
      var name = lastName ? lastName + "." + key : key

      if (typeof action === "function") {
        namespace[key] = function(data) {
          var result = action(
            state,
            actions,
            emit("action", {
              name: name,
              data: data
            }).data,
            emit
          )

          if (result == null || typeof result.then === "function") {
            return result
          }

          render((state = merge(state, emit("update", result))), view)
        }
      } else {
        init(namespace[key] || (namespace[key] = {}), action, name)
      }
    })
  }

  function load() {
    render(state, view)
    emit("loaded")
  }

  function emit(name, data) {
    ;(events[name] || []).map(function(cb) {
      var result = cb(state, actions, data, emit)
      if (result != null) {
        data = result
      }
    })

    return data
  }

  function render(state, view) {
    element = patch(
      app.root || (app.root = document.body),
      element,
      node,
      (node = emit("render", view)(state, actions))
    )
  }

  function merge(a, b) {
    var obj = {}

    if (typeof b !== "object" || Array.isArray(b)) {
      return b
    }

    for (var i in a) {
      obj[i] = a[i]
    }
    for (var i in b) {
      obj[i] = b[i]
    }

    return obj
  }

  function createElementFrom(node, isSVG) {
    if (typeof node === "string") {
      var element = document.createTextNode(node)
    } else {
      var element = (isSVG = isSVG || node.tag === "svg")
        ? document.createElementNS("http://www.w3.org/2000/svg", node.tag)
        : document.createElement(node.tag)

      for (var i = 0; i < node.children.length; ) {
        element.appendChild(createElementFrom(node.children[i++], isSVG))
      }

      for (var i in node.data) {
        if (i === "oncreate") {
          node.data[i](element)
        } else {
          setElementData(element, i, node.data[i])
        }
      }
    }

    return element
  }

  function setElementData(element, name, value, oldValue) {
    if (name === "key") {
    } else if (name === "style") {
      for (var i in merge(oldValue, (value = value || {}))) {
        element.style[i] = value[i] || ""
      }
    } else {
      try {
        element[name] = value
      } catch (_) {}

      if (typeof value !== "function") {
        if (value) {
          element.setAttribute(name, value)
        } else {
          element.removeAttribute(name)
        }
      }
    }
  }

  function updateElementData(element, oldData, data) {
    for (var name in merge(oldData, data)) {
      var value = data[name]
      var oldValue = name === "value" || name === "checked"
        ? element[name]
        : oldData[name]

      if (name === "onupdate" && value) {
        value(element)
      } else if (value !== oldValue) {
        setElementData(element, name, value, oldValue)
      }
    }
  }

  function getKeyFrom(node) {
    if (node && (node = node.data)) {
      return node.key
    }
  }

  function removeElement(parent, element, node) {
    ;((node.data && node.data.onremove) || removeChild)(element, removeChild)
    function removeChild() {
      parent.removeChild(element)
    }
  }

  function patch(parent, element, oldNode, node) {
    if (oldNode == null) {
      element = parent.insertBefore(createElementFrom(node), element)
    } else if (node.tag && node.tag === oldNode.tag) {
      updateElementData(element, oldNode.data, node.data)

      var len = node.children.length
      var oldLen = oldNode.children.length
      var reusableChildren = {}
      var oldElements = []
      var newKeys = {}

      for (var i = 0; i < oldLen; i++) {
        var oldElement = element.childNodes[i]
        oldElements[i] = oldElement

        var oldChild = oldNode.children[i]
        var oldKey = getKeyFrom(oldChild)

        if (null != oldKey) {
          reusableChildren[oldKey] = [oldElement, oldChild]
        }
      }

      var i = 0
      var j = 0

      while (j < len) {
        var oldElement = oldElements[i]
        var oldChild = oldNode.children[i]
        var newChild = node.children[j]

        var oldKey = getKeyFrom(oldChild)
        if (newKeys[oldKey]) {
          i++
          continue
        }

        var newKey = getKeyFrom(newChild)

        var reusableChild = reusableChildren[newKey] || []

        if (null == newKey) {
          if (null == oldKey) {
            patch(element, oldElement, oldChild, newChild)
            j++
          }
          i++
        } else {
          if (oldKey === newKey) {
            patch(element, reusableChild[0], reusableChild[1], newChild)
            i++
          } else if (reusableChild[0]) {
            element.insertBefore(reusableChild[0], oldElement)
            patch(element, reusableChild[0], reusableChild[1], newChild)
          } else {
            patch(element, oldElement, null, newChild)
          }

          j++
          newKeys[newKey] = newChild
        }
      }

      while (i < oldLen) {
        var oldChild = oldNode.children[i]
        var oldKey = getKeyFrom(oldChild)
        if (null == oldKey) {
          removeElement(element, oldElements[i], oldChild)
        }
        i++
      }

      for (var i in reusableChildren) {
        var reusableChild = reusableChildren[i]
        var reusableNode = reusableChild[1]
        if (!newKeys[reusableNode.data.key]) {
          removeElement(element, reusableChild[0], reusableNode)
        }
      }
    } else if (node !== oldNode) {
      var i = element
      parent.replaceChild((element = createElementFrom(node)), i)
    }

    return element
  }
});


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(tag, data) {
  var node
  var stack = []
  var children = []

  for (var i = arguments.length; i-- > 2; ) {
    stack[stack.length] = arguments[i]
  }

  while (stack.length) {
    if (Array.isArray((node = stack.pop()))) {
      for (var i = node.length; i--; ) {
        stack[stack.length] = node[i]
      }
    } else if (node != null && node !== true && node !== false) {
      if (typeof node === "number") {
        node = node + ""
      }
      children[children.length] = node
    }
  }

  return typeof tag === "string"
    ? {
        tag: tag,
        data: data || {},
        children: children
      }
    : tag(data, children)
});


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(app) {
  return {
    state: {
      router: match(location.pathname)
    },
    actions: {
      router: {
        match: function(state, actions, data, emit) {
          return {
            router: emit("route", match(data))
          }
        },
        go: function(state, actions, data) {
          history.pushState({}, "", data)
          actions.router.match(data.split("?")[0])
        }
      }
    },
    events: {
      loaded: function(state, actions) {
        match()
        addEventListener("popstate", match)
        function match() {
          actions.router.match(location.pathname)
        }
      },
      render: function(state, actions, view) {
        return view[state.router.match]
      }
    }
  }

  function match(data) {
    var match
    var params = {}

    for (var route in app.view) {
      var keys = []

      if (!match && route !== "*") {
        data.replace(
          RegExp(
            "^" +
              route
                .replace(/\//g, "\\/")
                .replace(/:([\w]+)/g, function(_, key) {
                  keys.push(key)
                  return "([-\\w]+)"
                }) +
              "/?$",
            "g"
          ),
          function() {
            for (var i = 1; i < arguments.length - 2; ) {
              params[keys.shift()] = arguments[i++]
            }
            match = route
          }
        )
      }
    }

    return {
      match: match || "*",
      params: params
    }
  }
});


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/sass-loader/lib/loader.js!./episodes.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/sass-loader/lib/loader.js!./episodes.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/sass-loader/lib/loader.js!./player.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/sass-loader/lib/loader.js!./player.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 22 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 23 */,
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "._1FdLJ9-HH4J_NP4xzpLwt4 {\n  position: relative;\n  display: inline-block;\n  text-align: center; }\n", ""]);

// exports
exports.locals = {
	"progressPlayPauseButton": "_1FdLJ9-HH4J_NP4xzpLwt4"
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/sass-loader/lib/loader.js!./play-pause-button.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/sass-loader/lib/loader.js!./play-pause-button.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })
/******/ ]);