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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__h__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__router__["a"]; });







/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = Link;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function Link(props, children) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* harmony default export */ __webpack_exports__["a"] = function (app) {
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
};

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports) {



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components__ = __webpack_require__(1);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




var Episode = function ({
  cacheProgress: cacheProgress,
  title: title,

  deleteEpisode: deleteEpisode,
  cacheEpisode: cacheEpisode,
  playEpisode: playEpisode
}) {
  var button = void 0;
  if (cacheProgress === 1) {
    button = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
      'button',
      { onClick: deleteEpisode, 'class': 'lean-right' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])('span', { 'class': 'icon-trash-empty' })
    );
  } else if (cacheProgress === 0) {
    button = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
      'button',
      { onClick: cacheEpisode, 'class': 'lean-right' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])('span', { 'class': 'icon-download-cloud' })
    );
  } else if (typeof cacheProgress !== 'number') {
    button = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
      'div',
      { 'class': 'episode-progress' },
      cacheProgress
    );
  } else {
    button = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
      'div',
      { 'class': 'episode-progress' },
      Math.round(cacheProgress * 100) + '%'
    );
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
    'div',
    { 'class': 'episode' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
      'div',
      { 'class': 'episode-title' },
      title
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
      'button',
      { onClick: playEpisode },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])('span', { 'class': 'icon-play' })
    ),
    button
  );
};

class Episodes {
  render({
    index: index,

    hideEpisodes: hideEpisodes,
    deleteEpisode: deleteEpisode,
    cacheEpisode: cacheEpisode,
    playEpisode: playEpisode
  }) {}
}

/* harmony default export */ __webpack_exports__["a"] = function (state, actions) {
  // TODO: When showing this page, scroll to the currently playing episode if there is one
  actions.episodeList.load(state.router.params.podcastName);

  var episodes = state.episodeList.episodes;
  var _actions$storage = actions.storage,
      downloadEpisode = _actions$storage.downloadEpisode,
      deleteEpisode = _actions$storage.deleteEpisode;

  // TODO: Show size of all cached episodes

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
    'div',
    null,
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
      'div',
      { 'class': 'titlebar' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
        __WEBPACK_IMPORTED_MODULE_1__components__["a" /* Link */],
        { 'class': 'back', title: 'Back to Podcasts', href: '/', go: actions.router.go },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])('span', { 'class': 'icon-play' })
      )
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
      'div',
      { 'class': 'episodes' },
      episodes.map(function (episode) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(Episode, _extends({
          key: episode.index
        }, episode));
      })
    )
  );
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__podcast_entry__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dist_data_podcasts_hardcoded__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dist_data_podcasts_hardcoded___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__dist_data_podcasts_hardcoded__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components__ = __webpack_require__(1);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






/* harmony default export */ __webpack_exports__["a"] = function (state, actions) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
    'div',
    { 'class': 'podcast-app' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
      'div',
      { 'class': 'syncbar' },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
        __WEBPACK_IMPORTED_MODULE_3__components__["a" /* Link */],
        { 'class': 'syncbtn button', href: '/sync', go: actions.router.go },
        'Sync'
      )
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
      'div',
      { 'class': 'podcasts' },
      __WEBPACK_IMPORTED_MODULE_2__dist_data_podcasts_hardcoded__["podcasts"].map(function (podcast) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(__WEBPACK_IMPORTED_MODULE_1__podcast_entry__["a" /* default */], _extends({ go: actions.router.go }, podcast));
      })
    )
  );
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(0);


// TODO: Create sync plugin for this
/* harmony default export */ __webpack_exports__["a"] = function (state, actions) {
  var _state$sync = state.sync,
      token = _state$sync.token,
      status = _state$sync.status;


  var firstBtn = null;

  if (!token) {
    firstBtn = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
      'button',
      { onclick: actions.sync.createProfile },
      'Create Sync Profile'
    );
  } else {
    firstBtn = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
      'button',
      { onclick: actions.sync.addDevice },
      'Add Another Device'
    );
  }

  var uuid = 'N/A';
  if (token) {
    uuid = JSON.parse(atob(token.split('.')[1])).data;
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
    'div',
    { 'class': 'sync' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
      'div',
      null,
      uuid
    ),
    firstBtn,
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])('input', { 'class': 'code-in', placeholder: 'Access Code' }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
      'button',
      { onclick: function (e) {
          return actions.sync.connectDevice(e.target.previousSibling.value);
        } },
      'Add to Existing Profile'
    ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
      'span',
      { 'class': 'status' },
      status
    )
  );
};

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
/* 8 */
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = function ({ name: name, humanName: humanName, go: go }) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
    'section',
    { 'class': 'podcast-card' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
      __WEBPACK_IMPORTED_MODULE_1__components__["a" /* Link */],
      { href: '/p/' + name, go: go },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])('img', { 'class': 'card-image', src: '/p/' + name + '/icon' }),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["c" /* h */])(
        'h1',
        { 'class': 'card-title' },
        humanName
      )
    )
  );
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(app) {
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
};


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(tag, data) {
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
};


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(app) {
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
};


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hyperapp__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_index__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_sync__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_episodes__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_bookmarks__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_bookmarks___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__views_bookmarks__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__plugins_sync__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
      episodeIndex: 0
    },
    events: {
      update: function (state, actions, data, emit) {
        // TODO: Control the audio player on changes from this
        return data;
      }
    }
  };
};

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_hyperapp__["a" /* app */])({
  state: __WEBPACK_IMPORTED_MODULE_1__state__["a" /* initialState */],
  view: {
    '/': __WEBPACK_IMPORTED_MODULE_2__views_index__["a" /* default */],
    '/sync': __WEBPACK_IMPORTED_MODULE_3__views_sync__["a" /* default */],
    '/p/:podcastName': __WEBPACK_IMPORTED_MODULE_4__views_episodes__["a" /* default */],
    '/p/:podcastName/bookmarks': __WEBPACK_IMPORTED_MODULE_5__views_bookmarks___default.a
  },
  actions: {
    selectView: function (state, actions, { view: view, podcastName: podcastName }) {
      // view should be one of ['index', 'sync', 'episodes', 'bookmarks']
    },

    episodeList: {
      play: function (state, actions, episodeIndex) {
        return _extends({}, state, {
          episodeList: {
            playing: episodeIndex
          },
          player: {
            url: state.episodeList.episodes[episodeIndex].url
          }
        });
      },
      load: function (state, actions, podcastName) {
        // TODO load from server or local cache

        return _asyncToGenerator(function* () {})();
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
        var _data$router = data.router,
            match = _data$router.match,
            params = _data$router.params;


        if (match === '/') {
          actions.selectView({ view: 'index' });
        } else if (match === '/sync') {
          actions.selectView({ view: 'sync' });
        } else if (match === '/p/:podcastName') {
          actions.selectView({ view: 'episodes', podcastName: params.podcastName });
        } else if (match === '/p/:podcastName/bookmarks') {
          actions.selectView({ view: 'bookmarks', podcastName: params.podcastName });
        }
      }
    }
  },
  plugins: [__WEBPACK_IMPORTED_MODULE_0_hyperapp__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_6__plugins_sync__["a" /* default */], PlayerPlugin, Logger],
  root: document.getElementById('mountpoint')
});

// TODO: import {syncStoreToStorage} from './plugins/storage';
// TODO: import {bootServiceWorker} from '../common';

/***/ })
/******/ ]);