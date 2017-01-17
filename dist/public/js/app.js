/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

!function(global, factory) {
     true ? factory(exports) : 'function' == typeof define && define.amd ? define([ 'exports' ], factory) : factory(global.preact = global.preact || {});
}(this, function(exports) {
    function VNode(nodeName, attributes, children) {
        this.nodeName = nodeName;
        this.attributes = attributes;
        this.children = children;
        this.key = attributes && attributes.key;
    }
    function h(nodeName, attributes) {
        var lastSimple, child, simple, i, children = [];
        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
        if (attributes && attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) if ((child = stack.pop()) instanceof Array) for (i = child.length; i--; ) stack.push(child[i]); else if (null != child && child !== !1) {
            if ('number' == typeof child || child === !0) child = String(child);
            simple = 'string' == typeof child;
            if (simple && lastSimple) children[children.length - 1] += child; else {
                children.push(child);
                lastSimple = simple;
            }
        }
        var p = new VNode(nodeName, attributes || void 0, children);
        if (options.vnode) options.vnode(p);
        return p;
    }
    function extend(obj, props) {
        if (props) for (var i in props) obj[i] = props[i];
        return obj;
    }
    function clone(obj) {
        return extend({}, obj);
    }
    function delve(obj, key) {
        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
        return obj;
    }
    function isFunction(obj) {
        return 'function' == typeof obj;
    }
    function isString(obj) {
        return 'string' == typeof obj;
    }
    function hashToClassName(c) {
        var str = '';
        for (var prop in c) if (c[prop]) {
            if (str) str += ' ';
            str += prop;
        }
        return str;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(clone(vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }
    function createLinkedState(component, key, eventPath) {
        var path = key.split('.');
        return function(e) {
            var t = e && e.target || this, state = {}, obj = state, v = isString(eventPath) ? delve(e, eventPath) : t.nodeName ? t.type.match(/^che|rad/) ? t.checked : t.value : e, i = 0;
            for (;i < path.length - 1; i++) obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
            obj[path[i]] = v;
            component.setState(state);
        };
    }
    function enqueueRender(component) {
        if (!component._dirty && (component._dirty = !0) && 1 == items.push(component)) (options.debounceRendering || defer)(rerender);
    }
    function rerender() {
        var p, list = items;
        items = [];
        while (p = list.pop()) if (p._dirty) renderComponent(p);
    }
    function isFunctionalComponent(vnode) {
        var nodeName = vnode && vnode.nodeName;
        return nodeName && isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
    }
    function buildFunctionalComponent(vnode, context) {
        return vnode.nodeName(getNodeProps(vnode), context || EMPTY);
    }
    function isSameNodeType(node, vnode) {
        if (isString(vnode)) return node instanceof Text;
        if (isString(vnode.nodeName)) return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
        if (isFunction(vnode.nodeName)) return (node._componentConstructor ? node._componentConstructor === vnode.nodeName : !0) || isFunctionalComponent(vnode); else ;
    }
    function isNamedNode(node, nodeName) {
        return node.normalizedNodeName === nodeName || toLowerCase(node.nodeName) === toLowerCase(nodeName);
    }
    function getNodeProps(vnode) {
        var props = clone(vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
        return props;
    }
    function removeNode(node) {
        var p = node.parentNode;
        if (p) p.removeChild(node);
    }
    function setAccessor(node, name, old, value, isSvg) {
        if ('className' === name) name = 'class';
        if ('class' === name && value && 'object' == typeof value) value = hashToClassName(value);
        if ('key' === name) ; else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
            if (!value || isString(value) || isString(old)) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if (!isString(old)) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && !NON_DIMENSION_PROPS[i] ? value[i] + 'px' : value[i];
            }
        } else if ('dangerouslySetInnerHTML' === name) node.innerHTML = value && value.__html || ''; else if ('o' == name[0] && 'n' == name[1]) {
            var l = node._listeners || (node._listeners = {});
            name = toLowerCase(name.substring(2));
            if (value) {
                if (!l[name]) node.addEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            } else if (l[name]) node.removeEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            l[name] = value;
        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            setProperty(node, name, null == value ? '' : value);
            if (null == value || value === !1) node.removeAttribute(name);
        } else {
            var ns = isSvg && name.match(/^xlink\:?(.+)/);
            if (null == value || value === !1) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1])); else node.removeAttribute(name); else if ('object' != typeof value && !isFunction(value)) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]), value); else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this._listeners[e.type](options.event && options.event(e) || e);
    }
    function collectNode(node) {
        removeNode(node);
        if (node instanceof Element) {
            node._component = node._componentConstructor = null;
            var _name = node.normalizedNodeName || toLowerCase(node.nodeName);
            (nodes[_name] || (nodes[_name] = [])).push(node);
        }
    }
    function createNode(nodeName, isSvg) {
        var name = toLowerCase(nodeName), node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
        node.normalizedNodeName = name;
        return node;
    }
    function flushMounts() {
        var c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = parent instanceof SVGElement;
            hydrating = dom && !(ATTR_KEY in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (!--diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }
    function idiff(dom, vnode, context, mountAll) {
        var originalAttributes = vnode && vnode.attributes;
        while (isFunctionalComponent(vnode)) vnode = buildFunctionalComponent(vnode, context);
        if (null == vnode) vnode = '';
        if (isString(vnode)) {
            if (dom && dom instanceof Text) {
                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
                if (dom) recollectNodeTree(dom);
                dom = document.createTextNode(vnode);
            }
            dom[ATTR_KEY] = !0;
            return dom;
        }
        if (isFunction(vnode.nodeName)) return buildComponentFromVNode(dom, vnode, context, mountAll);
        var out = dom, nodeName = String(vnode.nodeName), prevSvgMode = isSvgMode, vchildren = vnode.children;
        isSvgMode = 'svg' === nodeName ? !0 : 'foreignObject' === nodeName ? !1 : isSvgMode;
        if (!dom) out = createNode(nodeName, isSvgMode); else if (!isNamedNode(dom, nodeName)) {
            out = createNode(nodeName, isSvgMode);
            while (dom.firstChild) out.appendChild(dom.firstChild);
            if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
            recollectNodeTree(dom);
        }
        var fc = out.firstChild, props = out[ATTR_KEY];
        if (!props) {
            out[ATTR_KEY] = props = {};
            for (var a = out.attributes, i = a.length; i--; ) props[a[i].name] = a[i].value;
        }
        diffAttributes(out, vnode.attributes, props);
        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && fc && fc instanceof Text && !fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
        } else if (vchildren && vchildren.length || fc) innerDiffNode(out, vchildren, context, mountAll);
        if (originalAttributes && 'function' == typeof originalAttributes.ref) (props.ref = originalAttributes.ref)(out);
        isSvgMode = prevSvgMode;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll) {
        var j, c, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren && vchildren.length;
        if (len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i], props = _child[ATTR_KEY], key = vlen ? (c = _child._component) ? c.__key : props ? props.key : null : null;
            if (null != key) {
                keyedLen++;
                keyed[key] = _child;
            } else if (hydrating || props) children[childrenLen++] = _child;
        }
        if (vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;
            if (null != key) {
                if (keyedLen && key in keyed) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) {
                c = children[j];
                if (c && isSameNodeType(c, vchild)) {
                    child = c;
                    children[j] = void 0;
                    if (j === childrenLen - 1) childrenLen--;
                    if (j === min) min++;
                    break;
                }
            }
            child = idiff(child, vchild, context, mountAll);
            if (child && child !== dom) if (i >= len) dom.appendChild(child); else if (child !== originalChildren[i]) {
                if (child === originalChildren[i + 1]) removeNode(originalChildren[i]);
                dom.insertBefore(child, originalChildren[i] || null);
            }
        }
        if (keyedLen) for (var i in keyed) if (keyed[i]) recollectNodeTree(keyed[i]);
        while (min <= childrenLen) {
            child = children[childrenLen--];
            if (child) recollectNodeTree(child);
        }
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) unmountComponent(component, !unmountOnly); else {
            if (node[ATTR_KEY] && node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);
            if (!unmountOnly) collectNode(node);
            var c;
            while (c = node.lastChild) recollectNodeTree(c, unmountOnly);
        }
    }
    function diffAttributes(dom, attrs, old) {
        for (var _name in old) if (!(attrs && _name in attrs) && null != old[_name]) setAccessor(dom, _name, old[_name], old[_name] = void 0, isSvgMode);
        if (attrs) for (var _name2 in attrs) if (!('children' === _name2 || 'innerHTML' === _name2 || _name2 in old && attrs[_name2] === ('value' === _name2 || 'checked' === _name2 ? dom[_name2] : old[_name2]))) setAccessor(dom, _name2, old[_name2], old[_name2] = attrs[_name2], isSvgMode);
    }
    function collectComponent(component) {
        var name = component.constructor.name, list = components[name];
        if (list) list.push(component); else components[name] = [ component ];
    }
    function createComponent(Ctor, props, context) {
        var inst = new Ctor(props, context), list = components[Ctor.name];
        Component.call(inst, props, context);
        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
            inst.nextBase = list[i].nextBase;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        if (!component._disable) {
            component._disable = !0;
            if (component.__ref = props.ref) delete props.ref;
            if (component.__key = props.key) delete props.key;
            if (!component.base || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.prevContext) component.prevContext = component.context;
                component.context = context;
            }
            if (!component.prevProps) component.prevProps = component.props;
            component.props = props;
            component._disable = !1;
            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
            if (component.__ref) component.__ref(component);
        }
    }
    function renderComponent(component, opts, mountAll, isChild) {
        if (!component._disable) {
            var skip, rendered, inst, cbase, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, nextBase = component.nextBase, initialBase = isUpdate || nextBase, initialChildComponent = component._component;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
            component._dirty = !1;
            if (!skip) {
                if (component.render) rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(clone(context), component.getChildContext());
                while (isFunctionalComponent(rendered)) rendered = buildFunctionalComponent(rendered, context);
                var toUnmount, base, childComponent = rendered && rendered.nodeName;
                if (isFunction(childComponent)) {
                    var childProps = getNodeProps(rendered);
                    inst = initialChildComponent;
                    if (inst && inst.constructor === childComponent && childProps.key == inst.__key) setComponentProps(inst, childProps, 1, context); else {
                        toUnmount = inst;
                        inst = createComponent(childComponent, childProps, context);
                        inst.nextBase = inst.nextBase || nextBase;
                        inst._parentComponent = component;
                        component._component = inst;
                        setComponentProps(inst, childProps, 0, context);
                        renderComponent(inst, 1, mountAll, !0);
                    }
                    base = inst.base;
                } else {
                    cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                    }
                }
                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                    var baseParent = initialBase.parentNode;
                    if (baseParent && base !== baseParent) {
                        baseParent.replaceChild(base, initialBase);
                        if (!toUnmount) {
                            initialBase._component = null;
                            recollectNodeTree(initialBase);
                        }
                    }
                }
                if (toUnmount) unmountComponent(toUnmount, base !== initialBase);
                component.base = base;
                if (base && !isChild) {
                    var componentRef = component, t = component;
                    while (t = t._parentComponent) (componentRef = t).base = base;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }
            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
                if (options.afterUpdate) options.afterUpdate(component);
            }
            var fn, cb = component._renderCallbacks;
            if (cb) while (fn = cb.pop()) fn.call(component);
            if (!diffLevel && !isChild) flushMounts();
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
        while (c && !isOwner && (c = c._parentComponent)) isOwner = c.constructor === vnode.nodeName;
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (c && !isDirectOwner) {
                unmountComponent(c, !0);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.nextBase) {
                c.nextBase = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom);
            }
        }
        return dom;
    }
    function unmountComponent(component, remove) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        var base = component.base;
        component._disable = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) unmountComponent(inner, remove); else if (base) {
            if (base[ATTR_KEY] && base[ATTR_KEY].ref) base[ATTR_KEY].ref(null);
            component.nextBase = base;
            if (remove) {
                removeNode(base);
                collectComponent(component);
            }
            var c;
            while (c = base.lastChild) recollectNodeTree(c, !remove);
        }
        if (component.__ref) component.__ref(null);
        if (component.componentDidUnmount) component.componentDidUnmount();
    }
    function Component(props, context) {
        this._dirty = !0;
        this.context = context;
        this.props = props;
        if (!this.state) this.state = {};
    }
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent);
    }
    var options = {};
    var stack = [];
    var lcCache = {};
    var toLowerCase = function(s) {
        return lcCache[s] || (lcCache[s] = s.toLowerCase());
    };
    var resolved = 'undefined' != typeof Promise && Promise.resolve();
    var defer = resolved ? function(f) {
        resolved.then(f);
    } : setTimeout;
    var EMPTY = {};
    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol.for('preactattr') : '__preactattr_';
    var NON_DIMENSION_PROPS = {
        boxFlex: 1,
        boxFlexGroup: 1,
        columnCount: 1,
        fillOpacity: 1,
        flex: 1,
        flexGrow: 1,
        flexPositive: 1,
        flexShrink: 1,
        flexNegative: 1,
        fontWeight: 1,
        lineClamp: 1,
        lineHeight: 1,
        opacity: 1,
        order: 1,
        orphans: 1,
        strokeOpacity: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1
    };
    var NON_BUBBLING_EVENTS = {
        blur: 1,
        error: 1,
        focus: 1,
        load: 1,
        resize: 1,
        scroll: 1
    };
    var items = [];
    var nodes = {};
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var hydrating = !1;
    var components = {};
    extend(Component.prototype, {
        linkState: function(key, eventPath) {
            var c = this._linkedStates || (this._linkedStates = {});
            return c[key + eventPath] || (c[key + eventPath] = createLinkedState(this, key, eventPath));
        },
        setState: function(state, callback) {
            var s = this.state;
            if (!this.prevState) this.prevState = clone(s);
            extend(s, isFunction(state) ? state(s, this.props) : state);
            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate: function() {
            renderComponent(this, 2);
        },
        render: function() {}
    });
    exports.h = h;
    exports.cloneElement = cloneElement;
    exports.Component = Component;
    exports.render = render;
    exports.rerender = rerender;
    exports.options = options;
});
//# sourceMappingURL=preact.js.map

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["b"] = getRemoteFile;
/* harmony export (immutable) */ exports["a"] = getBlob;
function getRemoteFile(url, onProgress) {
  return new Promise(function (resolve, reject) {
    var x = new XMLHttpRequest();
    x.responseType = 'arraybuffer';
    if (onProgress) {
      x.onprogress = function (e) {
        return onProgress(Math.floor(e.loaded / e.total));
      };
    }
    x.onerror = reject;
    x.onload = function () {
      if (x.status === 200) {
        resolve(x.response);
      } else {
        reject(new Error('Got ' + x.status + ' from ' + url));
      }
    };
    x.open('GET', url, true);
    x.send();
  });
}

function getBlob(res) {
  if (res && res.ok) {
    return res.blob();
  }
  return null;
}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__podcast_image__ = __webpack_require__(5);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Player = function (_Component) {
  _inherits(Player, _Component);

  function Player(props) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, props));

    _this.state = {
      currentImageUrl: '',
      currentAudioUrl: '',
      episodes: [],
      index: 0,
      playing: false,
      position: 0,
      duration: 0,
      autoplay: true
    };
    return _this;
  }

  _createClass(Player, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var audioEl = this.audioEl;


      getEpisodes(this.props.podcast).then(function (episodes) {
        _this2.setState({ episodes: episodes });
        _this2.load();
      });

      audioEl.ontimeupdate = function () {
        _this2.setState({ position: audioEl.currentTime });
      };

      audioEl.ondurationchange = function () {
        _this2.setState({ duration: audioEl.duration });
      };

      audioEl.onplaying = audioEl.onpause = function () {
        _this2.setState({ playing: !audioEl.paused });
      };

      window.onbeforeunload = function () {
        return _this2.save();
      };

      window.addEventListener('keyup', function (e) {
        if (e.code === 'Space') {
          e.preventDefault();
          _this2.togglePlaying();
        }
      });
    }
  }, {
    key: 'render',
    value: function render(props, _ref) {
      var _this3 = this;

      var currentImageUrl = _ref.currentImageUrl,
          currentAudioUrl = _ref.currentAudioUrl,
          index = _ref.index,
          episodes = _ref.episodes,
          autoplay = _ref.autoplay,
          playing = _ref.playing,
          position = _ref.position,
          duration = _ref.duration;

      var _ref2 = episodes[index] || {},
          title = _ref2.title,
          imageUrl = _ref2.imageUrl,
          audioUrl = _ref2.audioUrl,
          status = _ref2.status;

      var downloadIcon = 'icon-download';
      var downloadTitle = 'Download Episode';
      if (status === 'downloading') {
        downloadIcon = 'icon-spin';
        downloadTitle = 'Downloading...';
      } else if (status === 'downloaded') {
        downloadIcon = 'icon-ok';
        downloadTitle = 'Downloaded to Device';
      }

      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { 'class': 'player' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { 'class': 'titlebar' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'a',
            { 'class': 'back button', href: '/' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('span', { 'class': 'icon-play' })
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'h1',
            { 'class': 'title' },
            title
          )
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__podcast_image__["a" /* default */], { src: currentImageUrl }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('audio', {
          'class': 'audio',
          ref: function ref(el) {
            return _this3.audioEl = el;
          },
          preload: 'auto',
          src: currentAudioUrl,
          onPause: function onPause() {
            return _this3.save();
          },
          onEnded: function onEnded() {
            return _this3.episodeEnded();
          }
        }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { 'class': 'seek_scrub' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'button',
            { 'class': 'toggle-playing', onClick: function onClick() {
                return _this3.togglePlaying();
              }, title: playing ? 'Pause' : 'Play' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('span', { 'class': playing ? 'icon-pause' : 'icon-play' })
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', {
            'class': 'scrubber',
            type: 'range',
            min: '0',
            max: Math.round(duration),
            value: Math.round(position),
            onInput: function onInput(e) {
              return _this3.seekTo(parseInt(e.target.value));
            }
          }),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'div',
            { 'class': 'time' },
            formatTime(position) + ' / ' + formatTime(duration)
          )
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { 'class': 'seek' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'button',
            { onClick: function onClick() {
                return _this3.seekBackward(30);
              }, title: 'Back 30 Seconds' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('span', { 'class': 'icon-fast-bw' }),
            ' 30'
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'button',
            { onClick: function onClick() {
                return _this3.seekBackward(5);
              }, title: 'Back 5 Seconds' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('span', { 'class': 'icon-fast-bw' }),
            ' 5'
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'button',
            { onClick: function onClick() {
                return _this3.seekForward(5);
              }, title: 'Forward 5 Seconds' },
            '5 ',
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('span', { 'class': 'icon-fast-fw' })
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'button',
            { onClick: function onClick() {
                return _this3.seekForward(30);
              }, title: 'Forward 30 Seconds' },
            '30 ',
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('span', { 'class': 'icon-fast-fw' })
          )
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { 'class': 'nav' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'button',
            { onClick: function onClick() {
                return _this3.previousEpisode();
              }, title: 'Previous Episode' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('span', { 'class': 'icon-to-start-alt' })
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', { type: 'number', onKeyUp: function onKeyUp(e) {
              return _this3.gotoIndexOnEnter(e);
            }, onInput: function onInput(e) {
              return _this3.gotoIndex(e);
            }, value: index + 1 }),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'button',
            { onClick: function onClick() {
                return _this3.nextEpisode();
              }, title: 'Next Episode' },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('span', { 'class': 'icon-to-end-alt' })
          ),
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'button',
            { onClick: function onClick() {
                return _this3.cacheEpisode();
              }, title: downloadTitle },
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('span', { 'class': downloadIcon })
          )
        ),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
          'div',
          { 'class': 'options' },
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'span',
            null,
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', { type: 'checkbox', id: 'autoplay_opt', checked: autoplay, onChange: function onChange(e) {
                return _this3.setAutoplay(e.target.checked);
              } }),
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
              'label',
              { 'for': 'autoplay_opt' },
              'Autoplay'
            )
          )
        )
      );
    }
  }, {
    key: 'previousEpisode',
    value: function previousEpisode() {
      var index = this.state.index;


      this.selectEpisode(Math.max(index - 1, 0));
    }
  }, {
    key: 'nextEpisode',
    value: function nextEpisode() {
      var _state = this.state,
          index = _state.index,
          episodes = _state.episodes;


      this.selectEpisode(Math.min(index + 1, episodes.length - 1));
    }
  }, {
    key: 'selectEpisode',
    value: function selectEpisode(index) {
      var _this4 = this;

      var audioEl = this.audioEl;
      var podcast = this.props.podcast;
      var _state2 = this.state,
          episodes = _state2.episodes,
          currentImageUrl = _state2.currentImageUrl,
          currentAudioUrl = _state2.currentAudioUrl,
          playing = _state2.playing;

      var imageUrl = getImageUrl(podcast, index);
      var audioUrl = getAudioUrl(podcast, index);

      caches.open('episodes').then(function (cache) {
        return Promise.all([cache.match(imageUrl).then(__WEBPACK_IMPORTED_MODULE_1__common__["a" /* getBlob */]), cache.match(audioUrl).then(__WEBPACK_IMPORTED_MODULE_1__common__["a" /* getBlob */])]);
      }).then(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            imgBlob = _ref4[0],
            audioBlob = _ref4[1];

        if (currentImageUrl) {
          URL.revokeObjectURL(currentImageUrl);
        }

        if (currentAudioUrl) {
          URL.revokeObjectURL(currentAudioUrl);
        }

        _this4.setEpisodeStatus(index, audioBlob ? 'downloaded' : null);
        _this4.setState({
          index: index,
          currentImageUrl: imgBlob ? URL.createObjectURL(imgBlob) : imageUrl,
          currentAudioUrl: audioBlob ? URL.createObjectURL(audioBlob) : audioUrl
        });

        if (playing) {
          audioEl.addEventListener('canplay', function () {
            audioEl.play();
          }, { once: true });
        }

        document.title = episodes[index].title;
      });
    }
  }, {
    key: 'seekTo',
    value: function seekTo(position) {
      this.audioEl.currentTime = position;
    }
  }, {
    key: 'seekBackward',
    value: function seekBackward(seconds) {
      this.audioEl.currentTime -= seconds;
    }
  }, {
    key: 'seekForward',
    value: function seekForward(seconds) {
      this.audioEl.currentTime += seconds;
    }
  }, {
    key: 'togglePlaying',
    value: function togglePlaying() {
      var audioEl = this.audioEl;


      if (audioEl.paused) {
        audioEl.play();
      } else {
        audioEl.pause();
      }
    }
  }, {
    key: 'setAutoplay',
    value: function setAutoplay(autoplay) {
      this.setState({ autoplay: autoplay });
    }
  }, {
    key: 'gotoIndexOnEnter',
    value: function gotoIndexOnEnter(e) {
      if (e.key === 'Enter') {
        this.gotoIndex(e);
      }
    }
  }, {
    key: 'gotoIndex',
    value: function gotoIndex(e) {
      var episodes = this.state.episodes;

      var index = parseInt(e.target.value);

      if (typeof index === 'number' && !isNaN(index)) {
        this.selectEpisode(clamp(index - 1, 0, episodes.length - 1));
      }
    }
  }, {
    key: 'episodeEnded',
    value: function episodeEnded() {
      var _state3 = this.state,
          index = _state3.index,
          episodes = _state3.episodes,
          autoplay = _state3.autoplay;


      if (index < episodes.length - 1 && autoplay) {
        this.selectEpisode(index + 1);
      }
    }
  }, {
    key: 'save',
    value: function save() {
      var podcast = this.props.podcast;
      var _state4 = this.state,
          index = _state4.index,
          playing = _state4.playing,
          position = _state4.position,
          autoplay = _state4.autoplay;


      var data = JSON.stringify({
        index: index,
        playing: playing,
        position: position,
        autoplay: autoplay
      });

      localStorage.setItem(podcast + '_place', data);
    }
  }, {
    key: 'load',
    value: function load() {
      var audioEl = this.audioEl;
      var podcast = this.props.podcast;

      var place = void 0;
      try {
        var _JSON$parse = JSON.parse(localStorage.getItem(podcast + '_place')),
            index = _JSON$parse.index,
            playing = _JSON$parse.playing,
            position = _JSON$parse.position,
            autoplay = _JSON$parse.autoplay;

        audioEl.currentTime = position;
        this.setState({ playing: playing, autoplay: autoplay });
        this.selectEpisode(index);
      } catch (e) {
        console.log('Invalid saved JSON');
        this.selectEpisode(0);
      }
    }
  }, {
    key: 'cacheEpisode',
    value: function cacheEpisode() {
      var _this5 = this;

      var podcast = this.props.podcast;
      var _state5 = this.state,
          index = _state5.index,
          episodes = _state5.episodes;

      var episode = episodes[index];

      if (episode.status) return;

      this.setEpisodeStatus(index, 'downloading');

      _cacheEpisode(podcast, index, episode.size).then(function () {
        _this5.setEpisodeStatus(index, 'downloaded');
      });
    }
  }, {
    key: 'setEpisodeStatus',
    value: function setEpisodeStatus(index, status) {
      var episodes = this.state.episodes;

      var episode = episodes[index];

      episodes.splice(index, 1, _extends({}, episode, { status: status }));

      this.setState({ episodes: episodes.slice() });
    }
  }]);

  return Player;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

/* harmony default export */ exports["a"] = Player;


function formatTime(n) {
  var hours = Math.floor(n / 60);
  if (hours < 10) hours = '0' + hours;

  var minutes = Math.floor(n % 60);
  if (minutes < 10) minutes = '0' + minutes;

  return hours + ':' + minutes;
}

function getEpisodes(name) {
  return fetch('/p/' + name + '/list').then(function (res) {
    return res.json();
  });
}

function _cacheEpisode(podcastName, index, fileSize, onProgress) {
  var imageUrl = getImageUrl(podcastName, index);
  var audioUrl = getAudioUrl(podcastName, index);

  return Promise.all([caches.open('episodes'), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["b" /* getRemoteFile */])(imageUrl), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["b" /* getRemoteFile */])(audioUrl, onProgress)]).then(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 3),
        cache = _ref6[0],
        image = _ref6[1],
        audio = _ref6[2];

    cache.put(imageUrl, new Response(image));
    cache.put(audioUrl, new Response(audio));
  });
}

function getImageUrl(podcastName, index) {
  return '/p/' + podcastName + '/episodes/' + index + '/image';
}

function getAudioUrl(podcastName, index) {
  return '/p/' + podcastName + '/episodes/' + index + '/audio';
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Podcasts = function (_Component) {
  _inherits(Podcasts, _Component);

  function Podcasts(props) {
    _classCallCheck(this, Podcasts);

    var _this = _possibleConstructorReturn(this, (Podcasts.__proto__ || Object.getPrototypeOf(Podcasts)).call(this, props));

    _this.state = {
      podcasts: []
    };
    return _this;
  }

  _createClass(Podcasts, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      fetch('/list').then(function (res) {
        return res.json();
      }).then(function (podcasts) {
        _this2.setState({ podcasts: podcasts });
      });
    }
  }, {
    key: 'render',
    value: function render(props, _ref) {
      var podcasts = _ref.podcasts;

      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { 'class': 'podcasts' },
        podcasts.map(function (podcast) {
          return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(Podcast, { podcast: podcast });
        })
      );
    }
  }]);

  return Podcasts;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

/* harmony default export */ exports["a"] = Podcasts;


var Podcast = function Podcast(_ref2) {
  var podcast = _ref2.podcast;
  var name = podcast.name,
      humanName = podcast.humanName;


  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    'section',
    { 'class': 'podcast-card' },
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
      'a',
      { href: '/p/' + name },
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { 'class': 'card-image', src: '/p/' + name + '/icon' }),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'h1',
        { 'class': 'card-title' },
        humanName
      )
    )
  );
};

function getPodcastUrl(name) {
  return '/p/' + podcastName;
}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory(__webpack_require__(0)) :
	typeof define === 'function' && define.amd ? define(['preact'], factory) :
	(global.preactRouter = factory(global.preact));
}(this, (function (preact) { 'use strict';

var EMPTY$1 = {};

function exec(url, route) {
	var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY$1;

	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret = void 0;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var _i = 0; _i < max; _i++) {
		if (route[_i] && route[_i].charAt(0) === ':') {
			var param = route[_i].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[_i].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[_i] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(_i).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[_i] !== url[_i]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) return false;
	return matches;
}

function pathRankSort(a, b) {
	var aAttr = a.attributes || EMPTY$1,
	    bAttr = b.attributes || EMPTY$1;
	if (aAttr.default) return 1;
	if (bAttr.default) return -1;
	var diff = rank(aAttr.path) - rank(bAttr.path);
	return diff || aAttr.path.length - bAttr.path.length;
}

function segmentize(url) {
	return strip(url).split('/');
}

function rank(url) {
	return (strip(url).match(/\/+/g) || '').length;
}

function strip(url) {
	return url.replace(/(^\/+|\/+$)/g, '');
}

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var customHistory = null;

var ROUTERS = [];

var EMPTY = {};

// hangs off all elements created by preact
var ATTR_KEY = typeof Symbol !== 'undefined' ? Symbol.for('preactattr') : '__preactattr_';

function isPreactElement(node) {
	return ATTR_KEY in node;
}

function setUrl(url) {
	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url = void 0;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return '' + (url.pathname || '') + (url.search || '');
}

function route(url) {
	var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) return true;
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) return;

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) return;

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button !== 0) return;
	routeFromLink(e.currentTarget || e.target || this);
	return prevent(e);
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) e.stopImmediatePropagation();
		if (e.stopPropagation) e.stopPropagation();
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (e.button !== 0) return;
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

if (typeof addEventListener === 'function') {
	addEventListener('popstate', function () {
		return routeTo(getCurrentUrl());
	});
	addEventListener('click', delegateLinkHandler);
}

var Link = function Link(props) {
	return preact.h('a', _extends({}, props, { onClick: handleLinkClick }));
};

var Router = function (_Component) {
	_inherits(Router, _Component);

	function Router(props) {
		_classCallCheck(this, Router);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		if (props.history) {
			customHistory = props.history;
		}

		_this.state = {
			url: _this.props.url || getCurrentUrl()
		};
		return _this;
	}

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) return true;
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */


	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */


	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) return this.canRoute(url);

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.slice().sort(pathRankSort).filter(function (_ref) {
			var attributes = _ref.attributes;

			var path = attributes.path,
			    matches = exec(url, path, attributes);
			if (matches) {
				if (invoke !== false) {
					attributes.url = url;
					attributes.matches = matches;
					// copy matches onto props
					for (var i in matches) {
						if (matches.hasOwnProperty(i)) {
							attributes[i] = matches[i];
						}
					}
				}
				return true;
			}
		});
	};

	Router.prototype.render = function render(_ref2, _ref3) {
		var children = _ref2.children,
		    onChange = _ref2.onChange;
		var url = _ref3.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(preact.Component);

var Route = function Route(_ref4) {
	var component = _ref4.component,
	    url = _ref4.url,
	    matches = _ref4.matches;

	return preact.h(component, { url: url, matches: matches });
};

Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

return Router;

})));
//# sourceMappingURL=preact-router.js.map


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var PodcastImage = function (_Component) {
  _inherits(PodcastImage, _Component);

  function PodcastImage(props) {
    _classCallCheck(this, PodcastImage);

    var _this = _possibleConstructorReturn(this, (PodcastImage.__proto__ || Object.getPrototypeOf(PodcastImage)).call(this, props));

    _this.state = {
      src: ''
    };
    return _this;
  }

  _createClass(PodcastImage, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      if (props.src === '') {
        this.setState({ src: '' });
      } else if (props.src !== this.state.src) {
        fetch(props.src).then(function (res) {
          if (res.ok) {
            _this2.setState({ src: props.src });
          } else {
            throw null;
          }
        }).catch(function (err) {
          _this2.setState({ src: '' });
        });
      }
    }
  }, {
    key: 'render',
    value: function render(props, _ref) {
      var src = _ref.src;

      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { 'class': 'podcast-image' },
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { src: src || '/images/podcast_300.png' })
      );
    }
  }]);

  return PodcastImage;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

/* harmony default export */ exports["a"] = PodcastImage;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_preact_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_podcasts__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_player__ = __webpack_require__(2);





if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js');
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["render"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
  __WEBPACK_IMPORTED_MODULE_1_preact_router___default.a,
  null,
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__components_podcasts__["a" /* default */], { path: '/' }),
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__components_player__["a" /* default */], { path: '/p/:podcast' })
), document.getElementById('mount'));

/***/ }
/******/ ]);