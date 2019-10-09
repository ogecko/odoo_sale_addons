(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["order_form"] = factory(require("vue"));
	else
		root["order_form"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fae3");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1eb2":
/***/ (function(module, exports, __webpack_require__) {

// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2393":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FieldInteger_vue_vue_type_style_index_0_id_f8f9fe72_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c73b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FieldInteger_vue_vue_type_style_index_0_id_f8f9fe72_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FieldInteger_vue_vue_type_style_index_0_id_f8f9fe72_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FieldInteger_vue_vue_type_style_index_0_id_f8f9fe72_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "2896":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*
 * vue-croppa v1.3.8
 * https://github.com/zhanziyang/vue-croppa
 * 
 * Copyright (c) 2018 zhanziyang
 * Released under the ISC license
 */
  
(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var canvasExifOrientation = createCommonjsModule(function (module, exports) {
(function (root, factory) {
    if (false) {} else {
        module.exports = factory();
    }
}(commonjsGlobal, function () {
  'use strict';

  function drawImage(img, orientation, x, y, width, height) {
    if (!/^[1-8]$/.test(orientation)) throw new Error('orientation should be [1-8]');

    if (x == null) x = 0;
    if (y == null) y = 0;
    if (width == null) width = img.width;
    if (height == null) height = img.height;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    ctx.save();
    switch (+orientation) {
      // 1 = The 0th row is at the visual top of the image, and the 0th column is the visual left-hand side.
      case 1:
          break;

      // 2 = The 0th row is at the visual top of the image, and the 0th column is the visual right-hand side.
      case 2:
         ctx.translate(width, 0);
         ctx.scale(-1, 1);
         break;

      // 3 = The 0th row is at the visual bottom of the image, and the 0th column is the visual right-hand side.
      case 3:
          ctx.translate(width, height);
          ctx.rotate(180 / 180 * Math.PI);
          break;

      // 4 = The 0th row is at the visual bottom of the image, and the 0th column is the visual left-hand side.
      case 4:
          ctx.translate(0, height);
          ctx.scale(1, -1);
          break;

      // 5 = The 0th row is the visual left-hand side of the image, and the 0th column is the visual top.
      case 5:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(90 / 180 * Math.PI);
          ctx.scale(1, -1);
          break;

      // 6 = The 0th row is the visual right-hand side of the image, and the 0th column is the visual top.
      case 6:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(90 / 180 * Math.PI);
          ctx.translate(0, -height);
          break;

      // 7 = The 0th row is the visual right-hand side of the image, and the 0th column is the visual bottom.
      case 7:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(270 / 180 * Math.PI);
          ctx.translate(-width, height);
          ctx.scale(1, -1);
          break;

      // 8 = The 0th row is the visual left-hand side of the image, and the 0th column is the visual bottom.
      case 8:
          canvas.width = height;
          canvas.height = width;
          ctx.translate(0, width);
          ctx.rotate(270 / 180 * Math.PI);
          break;
    }

    ctx.drawImage(img, x, y, width, height);
    ctx.restore();

    return canvas;
  }

  return {
    drawImage: drawImage
  };
}));
});

var u = {
  onePointCoord: function onePointCoord(point, vm) {
    var canvas = vm.canvas,
        quality = vm.quality;

    var rect = canvas.getBoundingClientRect();
    var clientX = point.clientX;
    var clientY = point.clientY;
    return {
      x: (clientX - rect.left) * quality,
      y: (clientY - rect.top) * quality
    };
  },
  getPointerCoords: function getPointerCoords(evt, vm) {
    var pointer = void 0;
    if (evt.touches && evt.touches[0]) {
      pointer = evt.touches[0];
    } else if (evt.changedTouches && evt.changedTouches[0]) {
      pointer = evt.changedTouches[0];
    } else {
      pointer = evt;
    }
    return this.onePointCoord(pointer, vm);
  },
  getPinchDistance: function getPinchDistance(evt, vm) {
    var pointer1 = evt.touches[0];
    var pointer2 = evt.touches[1];
    var coord1 = this.onePointCoord(pointer1, vm);
    var coord2 = this.onePointCoord(pointer2, vm);

    return Math.sqrt(Math.pow(coord1.x - coord2.x, 2) + Math.pow(coord1.y - coord2.y, 2));
  },
  getPinchCenterCoord: function getPinchCenterCoord(evt, vm) {
    var pointer1 = evt.touches[0];
    var pointer2 = evt.touches[1];
    var coord1 = this.onePointCoord(pointer1, vm);
    var coord2 = this.onePointCoord(pointer2, vm);

    return {
      x: (coord1.x + coord2.x) / 2,
      y: (coord1.y + coord2.y) / 2
    };
  },
  imageLoaded: function imageLoaded(img) {
    return img.complete && img.naturalWidth !== 0;
  },
  rAFPolyfill: function rAFPolyfill() {
    // rAF polyfill
    if (typeof document == 'undefined' || typeof window == 'undefined') return;
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
        var id = window.setTimeout(function () {
          var arg = currTime + timeToCall;
          callback(arg);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }

    Array.isArray = function (arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  },
  toBlobPolyfill: function toBlobPolyfill() {
    if (typeof document == 'undefined' || typeof window == 'undefined' || !HTMLCanvasElement) return;
    var binStr, len, arr;
    if (!HTMLCanvasElement.prototype.toBlob) {
      Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function value(callback, type, quality) {
          binStr = atob(this.toDataURL(type, quality).split(',')[1]);
          len = binStr.length;
          arr = new Uint8Array(len);

          for (var i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
          }

          callback(new Blob([arr], { type: type || 'image/png' }));
        }
      });
    }
  },
  eventHasFile: function eventHasFile(evt) {
    var dt = evt.dataTransfer || evt.originalEvent.dataTransfer;
    if (dt.types) {
      for (var i = 0, len = dt.types.length; i < len; i++) {
        if (dt.types[i] == 'Files') {
          return true;
        }
      }
    }

    return false;
  },
  getFileOrientation: function getFileOrientation(arrayBuffer) {
    var view = new DataView(arrayBuffer);
    if (view.getUint16(0, false) != 0xFFD8) return -2;
    var length = view.byteLength;
    var offset = 2;
    while (offset < length) {
      var marker = view.getUint16(offset, false);
      offset += 2;
      if (marker == 0xFFE1) {
        if (view.getUint32(offset += 2, false) != 0x45786966) return -1;
        var little = view.getUint16(offset += 6, false) == 0x4949;
        offset += view.getUint32(offset + 4, little);
        var tags = view.getUint16(offset, little);
        offset += 2;
        for (var i = 0; i < tags; i++) {
          if (view.getUint16(offset + i * 12, little) == 0x0112) {
            return view.getUint16(offset + i * 12 + 8, little);
          }
        }
      } else if ((marker & 0xFF00) != 0xFF00) break;else offset += view.getUint16(offset, false);
    }
    return -1;
  },
  parseDataUrl: function parseDataUrl(url) {
    var reg = /^data:([^;]+)?(;base64)?,(.*)/gmi;
    return reg.exec(url)[3];
  },
  base64ToArrayBuffer: function base64ToArrayBuffer(base64) {
    var binaryString = atob(base64);
    var len = binaryString.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  },
  getRotatedImage: function getRotatedImage(img, orientation) {
    var _canvas = canvasExifOrientation.drawImage(img, orientation);
    var _img = new Image();
    _img.src = _canvas.toDataURL();
    return _img;
  },
  flipX: function flipX(ori) {
    if (ori % 2 == 0) {
      return ori - 1;
    }

    return ori + 1;
  },
  flipY: function flipY(ori) {
    var map = {
      1: 4,
      4: 1,
      2: 3,
      3: 2,
      5: 8,
      8: 5,
      6: 7,
      7: 6
    };

    return map[ori];
  },
  rotate90: function rotate90(ori) {
    var map = {
      1: 6,
      2: 7,
      3: 8,
      4: 5,
      5: 2,
      6: 3,
      7: 4,
      8: 1
    };

    return map[ori];
  },
  numberValid: function numberValid(n) {
    return typeof n === 'number' && !isNaN(n);
  }
};

Number.isInteger = Number.isInteger || function (value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

var initialImageType = String;
if (typeof window !== 'undefined' && window.Image) {
  initialImageType = [String, Image];
}

var props = {
  value: Object,
  width: {
    type: Number,
    default: 200,
    validator: function validator(val) {
      return val > 0;
    }
  },
  height: {
    type: Number,
    default: 200,
    validator: function validator(val) {
      return val > 0;
    }
  },
  placeholder: {
    type: String,
    default: 'Choose an image'
  },
  placeholderColor: {
    default: '#606060'
  },
  placeholderFontSize: {
    type: Number,
    default: 0,
    validator: function validator(val) {
      return val >= 0;
    }
  },
  canvasColor: {
    default: 'transparent'
  },
  quality: {
    type: Number,
    default: 2,
    validator: function validator(val) {
      return val > 0;
    }
  },
  zoomSpeed: {
    default: 3,
    type: Number,
    validator: function validator(val) {
      return val > 0;
    }
  },
  accept: String,
  fileSizeLimit: {
    type: Number,
    default: 0,
    validator: function validator(val) {
      return val >= 0;
    }
  },
  disabled: Boolean,
  disableDragAndDrop: Boolean,
  disableClickToChoose: Boolean,
  disableDragToMove: Boolean,
  disableScrollToZoom: Boolean,
  disablePinchToZoom: Boolean,
  disableRotation: Boolean,
  reverseScrollToZoom: Boolean,
  preventWhiteSpace: Boolean,
  showRemoveButton: {
    type: Boolean,
    default: true
  },
  removeButtonColor: {
    type: String,
    default: 'red'
  },
  removeButtonSize: {
    type: Number
  },
  initialImage: initialImageType,
  initialSize: {
    type: String,
    default: 'cover',
    validator: function validator(val) {
      return val === 'cover' || val === 'contain' || val === 'natural';
    }
  },
  initialPosition: {
    type: String,
    default: 'center',
    validator: function validator(val) {
      var valids = ['center', 'top', 'bottom', 'left', 'right'];
      return val.split(' ').every(function (word) {
        return valids.indexOf(word) >= 0;
      }) || /^-?\d+% -?\d+%$/.test(val);
    }
  },
  inputAttrs: Object,
  showLoading: Boolean,
  loadingSize: {
    type: Number,
    default: 20
  },
  loadingColor: {
    type: String,
    default: '#606060'
  },
  replaceDrop: Boolean,
  passive: Boolean,
  imageBorderRadius: {
    type: [Number, String],
    default: 0
  },
  autoSizing: Boolean,
  videoEnabled: Boolean
};

var events = {
  INIT_EVENT: 'init',
  FILE_CHOOSE_EVENT: 'file-choose',
  FILE_SIZE_EXCEED_EVENT: 'file-size-exceed',
  FILE_TYPE_MISMATCH_EVENT: 'file-type-mismatch',
  NEW_IMAGE_EVENT: 'new-image',
  NEW_IMAGE_DRAWN_EVENT: 'new-image-drawn',
  IMAGE_REMOVE_EVENT: 'image-remove',
  MOVE_EVENT: 'move',
  ZOOM_EVENT: 'zoom',
  DRAW_EVENT: 'draw',
  INITIAL_IMAGE_LOADED_EVENT: 'initial-image-loaded',
  LOADING_START_EVENT: 'loading-start',
  LOADING_END_EVENT: 'loading-end'
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var PCT_PER_ZOOM = 1 / 100000; // The amount of zooming everytime it happens, in percentage of image width.
var MIN_MS_PER_CLICK = 500; // If touch duration is shorter than the value, then it is considered as a click.
var CLICK_MOVE_THRESHOLD = 100; // If touch move distance is greater than this value, then it will by no mean be considered as a click.
var MIN_WIDTH = 10; // The minimal width the user can zoom to.
var DEFAULT_PLACEHOLDER_TAKEUP = 2 / 3; // Placeholder text by default takes up this amount of times of canvas width.
var PINCH_ACCELERATION = 1; // The amount of times by which the pinching is more sensitive than the scolling

var syncData = ['imgData', 'img', 'imgSet', 'originalImage', 'naturalHeight', 'naturalWidth', 'orientation', 'scaleRatio'];
// const DEBUG = false

var component = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { ref: "wrapper", class: 'croppa-container ' + (_vm.img ? 'croppa--has-target' : '') + ' ' + (_vm.passive ? 'croppa--passive' : '') + ' ' + (_vm.disabled ? 'croppa--disabled' : '') + ' ' + (_vm.disableClickToChoose ? 'croppa--disabled-cc' : '') + ' ' + (_vm.disableDragToMove && _vm.disableScrollToZoom ? 'croppa--disabled-mz' : '') + ' ' + (_vm.fileDraggedOver ? 'croppa--dropzone' : ''), on: { "dragenter": function dragenter($event) {
          $event.stopPropagation();$event.preventDefault();return _vm._handleDragEnter($event);
        }, "dragleave": function dragleave($event) {
          $event.stopPropagation();$event.preventDefault();return _vm._handleDragLeave($event);
        }, "dragover": function dragover($event) {
          $event.stopPropagation();$event.preventDefault();return _vm._handleDragOver($event);
        }, "drop": function drop($event) {
          $event.stopPropagation();$event.preventDefault();return _vm._handleDrop($event);
        } } }, [_c('input', _vm._b({ ref: "fileInput", staticStyle: { "height": "1px", "width": "1px", "overflow": "hidden", "margin-left": "-99999px", "position": "absolute" }, attrs: { "type": "file", "accept": _vm.accept, "disabled": _vm.disabled }, on: { "change": _vm._handleInputChange } }, 'input', _vm.inputAttrs, false)), _vm._v(" "), _c('div', { staticClass: "slots", staticStyle: { "width": "0", "height": "0", "visibility": "hidden" } }, [_vm._t("initial"), _vm._v(" "), _vm._t("placeholder")], 2), _vm._v(" "), _c('canvas', { ref: "canvas", on: { "click": function click($event) {
          $event.stopPropagation();$event.preventDefault();return _vm._handleClick($event);
        }, "dblclick": function dblclick($event) {
          $event.stopPropagation();$event.preventDefault();return _vm._handleDblClick($event);
        }, "touchstart": function touchstart($event) {
          $event.stopPropagation();return _vm._handlePointerStart($event);
        }, "mousedown": function mousedown($event) {
          $event.stopPropagation();$event.preventDefault();return _vm._handlePointerStart($event);
        }, "pointerstart": function pointerstart($event) {
          $event.stopPropagation();$event.preventDefault();return _vm._handlePointerStart($event);
        }, "touchend": function touchend($event) {
          $event.stopPropagation();$event.preventDefault();return _vm._handlePointerEnd($event);
        }, "touchcancel": function touchcancel($event) {
          $event.stopPropagation();$event.preventDefault();return _vm._handlePointerEnd($event);
        }, "mouseup": function mouseup($event) {
          $event.stopPropagation();$event.preventDefault();return _vm._handlePointerEnd($event);
        }, "pointerend": function pointerend($event) {
          $event.stopPropagation();$event.preventDefault();return _vm._handlePointerEnd($event);
        }, "pointercancel": function pointercancel($event) {
          $event.stopPropagation();$event.preventDefault();return _vm._handlePointerEnd($event);
        }, "touchmove": function touchmove($event) {
          $event.stopPropagation();return _vm._handlePointerMove($event);
        }, "mousemove": function mousemove($event) {
          $event.stopPropagation();$event.preventDefault();return _vm._handlePointerMove($event);
        }, "pointermove": function pointermove($event) {
          $event.stopPropagation();$event.preventDefault();return _vm._handlePointerMove($event);
        }, "pointerleave": function pointerleave($event) {
          $event.stopPropagation();$event.preventDefault();return _vm._handlePointerLeave($event);
        }, "DOMMouseScroll": function DOMMouseScroll($event) {
          $event.stopPropagation();return _vm._handleWheel($event);
        }, "wheel": function wheel($event) {
          $event.stopPropagation();return _vm._handleWheel($event);
        }, "mousewheel": function mousewheel($event) {
          $event.stopPropagation();return _vm._handleWheel($event);
        } } }), _vm._v(" "), _vm.showRemoveButton && _vm.img && !_vm.passive ? _c('svg', { staticClass: "icon icon-remove", style: 'top: -' + _vm.height / 40 + 'px; right: -' + _vm.width / 40 + 'px', attrs: { "viewBox": "0 0 1024 1024", "version": "1.1", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "width": _vm.removeButtonSize || _vm.width / 10, "height": _vm.removeButtonSize || _vm.width / 10 }, on: { "click": _vm.remove } }, [_c('path', { attrs: { "d": "M511.921231 0C229.179077 0 0 229.257846 0 512 0 794.702769 229.179077 1024 511.921231 1024 794.781538 1024 1024 794.702769 1024 512 1024 229.257846 794.781538 0 511.921231 0ZM732.041846 650.633846 650.515692 732.081231C650.515692 732.081231 521.491692 593.683692 511.881846 593.683692 502.429538 593.683692 373.366154 732.081231 373.366154 732.081231L291.761231 650.633846C291.761231 650.633846 430.316308 523.500308 430.316308 512.196923 430.316308 500.696615 291.761231 373.523692 291.761231 373.523692L373.366154 291.918769C373.366154 291.918769 503.453538 430.395077 511.881846 430.395077 520.349538 430.395077 650.515692 291.918769 650.515692 291.918769L732.041846 373.523692C732.041846 373.523692 593.447385 502.547692 593.447385 512.196923 593.447385 521.412923 732.041846 650.633846 732.041846 650.633846Z", "fill": _vm.removeButtonColor } })]) : _vm._e(), _vm._v(" "), _vm.showLoading && _vm.loading ? _c('div', { staticClass: "sk-fading-circle", style: _vm.loadingStyle }, _vm._l(12, function (i) {
      return _c('div', { key: i, class: 'sk-circle' + i + ' sk-circle' }, [_c('div', { staticClass: "sk-circle-indicator", style: { backgroundColor: _vm.loadingColor } })]);
    })) : _vm._e(), _vm._v(" "), _vm._t("default")], 2);
  }, staticRenderFns: [],
  model: {
    prop: 'value',
    event: events.INIT_EVENT
  },

  props: props,

  data: function data() {
    return {
      canvas: null,
      ctx: null,
      originalImage: null,
      img: null,
      video: null,
      dragging: false,
      lastMovingCoord: null,
      imgData: {
        width: 0,
        height: 0,
        startX: 0,
        startY: 0
      },
      fileDraggedOver: false,
      tabStart: 0,
      scrolling: false,
      pinching: false,
      rotating: false,
      pinchDistance: 0,
      supportTouch: false,
      pointerMoved: false,
      pointerStartCoord: null,
      naturalWidth: 0,
      naturalHeight: 0,
      scaleRatio: null,
      orientation: 1,
      userMetadata: null,
      imageSet: false,
      currentPointerCoord: null,
      currentIsInitial: false,
      loading: false,
      realWidth: 0, // only for when autoSizing is on
      realHeight: 0, // only for when autoSizing is on
      chosenFile: null,
      useAutoSizing: false
    };
  },


  computed: {
    outputWidth: function outputWidth() {
      var w = this.useAutoSizing ? this.realWidth : this.width;
      return w * this.quality;
    },
    outputHeight: function outputHeight() {
      var h = this.useAutoSizing ? this.realHeight : this.height;
      return h * this.quality;
    },
    computedPlaceholderFontSize: function computedPlaceholderFontSize() {
      return this.placeholderFontSize * this.quality;
    },
    aspectRatio: function aspectRatio() {
      return this.naturalWidth / this.naturalHeight;
    },
    loadingStyle: function loadingStyle() {
      return {
        width: this.loadingSize + 'px',
        height: this.loadingSize + 'px',
        right: '15px',
        bottom: '10px'
      };
    }
  },

  mounted: function mounted() {
    var _this = this;

    this._initialize();
    u.rAFPolyfill();
    u.toBlobPolyfill();

    var supports = this.supportDetection();
    if (!supports.basic) {
      console.warn('Your browser does not support vue-croppa functionality.');
    }

    if (this.passive) {
      this.$watch('value._data', function (data) {
        var set$$1 = false;
        if (!data) return;
        for (var key in data) {
          if (syncData.indexOf(key) >= 0) {
            var val = data[key];
            if (val !== _this[key]) {
              _this.$set(_this, key, val);
              set$$1 = true;
            }
          }
        }
        if (set$$1) {
          if (!_this.img) {
            _this.remove();
          } else {
            _this.$nextTick(function () {
              _this._draw();
            });
          }
        }
      }, {
        deep: true
      });
    }

    this.useAutoSizing = !!(this.autoSizing && this.$refs.wrapper && getComputedStyle);
    if (this.useAutoSizing) {
      this._autoSizingInit();
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.useAutoSizing) {
      this._autoSizingRemove();
    }
  },


  watch: {
    outputWidth: function outputWidth() {
      this.onDimensionChange();
    },
    outputHeight: function outputHeight() {
      this.onDimensionChange();
    },
    canvasColor: function canvasColor() {
      if (!this.img) {
        this._setPlaceholders();
      } else {
        this._draw();
      }
    },
    imageBorderRadius: function imageBorderRadius() {
      if (this.img) {
        this._draw();
      }
    },
    placeholder: function placeholder() {
      if (!this.img) {
        this._setPlaceholders();
      }
    },
    placeholderColor: function placeholderColor() {
      if (!this.img) {
        this._setPlaceholders();
      }
    },
    computedPlaceholderFontSize: function computedPlaceholderFontSize() {
      if (!this.img) {
        this._setPlaceholders();
      }
    },
    preventWhiteSpace: function preventWhiteSpace(val) {
      if (val) {
        this.imageSet = false;
      }
      this._placeImage();
    },
    scaleRatio: function scaleRatio(val, oldVal) {
      if (this.passive) return;
      if (!this.img) return;
      if (!u.numberValid(val)) return;

      var x = 1;
      if (u.numberValid(oldVal) && oldVal !== 0) {
        x = val / oldVal;
      }
      var pos = this.currentPointerCoord || {
        x: this.imgData.startX + this.imgData.width / 2,
        y: this.imgData.startY + this.imgData.height / 2
      };
      this.imgData.width = this.naturalWidth * val;
      this.imgData.height = this.naturalHeight * val;

      if (!this.userMetadata && this.imageSet && !this.rotating) {
        var offsetX = (x - 1) * (pos.x - this.imgData.startX);
        var offsetY = (x - 1) * (pos.y - this.imgData.startY);
        this.imgData.startX = this.imgData.startX - offsetX;
        this.imgData.startY = this.imgData.startY - offsetY;
      }

      if (this.preventWhiteSpace) {
        this._preventZoomingToWhiteSpace();
        this._preventMovingToWhiteSpace();
      }
    },

    'imgData.width': function imgDataWidth(val, oldVal) {
      // if (this.passive) return
      if (!u.numberValid(val)) return;
      this.scaleRatio = val / this.naturalWidth;
      if (this.hasImage()) {
        if (Math.abs(val - oldVal) > val * (1 / 100000)) {
          this.emitEvent(events.ZOOM_EVENT);
          this._draw();
        }
      }
    },
    'imgData.height': function imgDataHeight(val) {
      // if (this.passive) return
      if (!u.numberValid(val)) return;
      this.scaleRatio = val / this.naturalHeight;
    },
    'imgData.startX': function imgDataStartX(val) {
      // if (this.passive) return
      if (this.hasImage()) {
        this.$nextTick(this._draw);
      }
    },
    'imgData.startY': function imgDataStartY(val) {
      // if (this.passive) return
      if (this.hasImage()) {
        this.$nextTick(this._draw);
      }
    },
    loading: function loading(val) {
      if (this.passive) return;
      if (val) {
        this.emitEvent(events.LOADING_START_EVENT);
      } else {
        this.emitEvent(events.LOADING_END_EVENT);
      }
    },
    autoSizing: function autoSizing(val) {
      this.useAutoSizing = !!(this.autoSizing && this.$refs.wrapper && getComputedStyle);
      if (val) {
        this._autoSizingInit();
      } else {
        this._autoSizingRemove();
      }
    }
  },

  methods: {
    emitEvent: function emitEvent() {
      // console.log(args[0])
      this.$emit.apply(this, arguments);
    },
    getCanvas: function getCanvas() {
      return this.canvas;
    },
    getContext: function getContext() {
      return this.ctx;
    },
    getChosenFile: function getChosenFile() {
      return this.chosenFile || this.$refs.fileInput.files[0];
    },
    move: function move(offset) {
      if (!offset || this.passive) return;
      var oldX = this.imgData.startX;
      var oldY = this.imgData.startY;
      this.imgData.startX += offset.x;
      this.imgData.startY += offset.y;
      if (this.preventWhiteSpace) {
        this._preventMovingToWhiteSpace();
      }
      if (this.imgData.startX !== oldX || this.imgData.startY !== oldY) {
        this.emitEvent(events.MOVE_EVENT);
        this._draw();
      }
    },
    moveUpwards: function moveUpwards() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.move({ x: 0, y: -amount });
    },
    moveDownwards: function moveDownwards() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.move({ x: 0, y: amount });
    },
    moveLeftwards: function moveLeftwards() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.move({ x: -amount, y: 0 });
    },
    moveRightwards: function moveRightwards() {
      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.move({ x: amount, y: 0 });
    },
    zoom: function zoom() {
      var zoomIn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var acceleration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (this.passive) return;
      var realSpeed = this.zoomSpeed * acceleration;
      var speed = this.outputWidth * PCT_PER_ZOOM * realSpeed;
      var x = 1;
      if (zoomIn) {
        x = 1 + speed;
      } else if (this.imgData.width > MIN_WIDTH) {
        x = 1 - speed;
      }

      this.scaleRatio *= x;
    },
    zoomIn: function zoomIn() {
      this.zoom(true);
    },
    zoomOut: function zoomOut() {
      this.zoom(false);
    },
    rotate: function rotate() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      if (this.disableRotation || this.disabled || this.passive) return;
      step = parseInt(step);
      if (isNaN(step) || step > 3 || step < -3) {
        console.warn('Invalid argument for rotate() method. It should one of the integers from -3 to 3.');
        step = 1;
      }
      this._rotateByStep(step);
    },
    flipX: function flipX() {
      if (this.disableRotation || this.disabled || this.passive) return;
      this._setOrientation(2);
    },
    flipY: function flipY() {
      if (this.disableRotation || this.disabled || this.passive) return;
      this._setOrientation(4);
    },
    refresh: function refresh() {
      this.$nextTick(this._initialize);
    },
    hasImage: function hasImage() {
      return !!this.imageSet;
    },
    applyMetadata: function applyMetadata(metadata) {
      if (!metadata || this.passive) return;
      this.userMetadata = metadata;
      var ori = metadata.orientation || this.orientation || 1;
      this._setOrientation(ori, true);
    },
    generateDataUrl: function generateDataUrl(type, compressionRate) {
      if (!this.hasImage()) return '';
      return this.canvas.toDataURL(type, compressionRate);
    },
    generateBlob: function generateBlob(callback, mimeType, qualityArgument) {
      if (!this.hasImage()) {
        callback(null);
        return;
      }
      this.canvas.toBlob(callback, mimeType, qualityArgument);
    },
    promisedBlob: function promisedBlob() {
      var _this2 = this;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (typeof Promise == 'undefined') {
        console.warn('No Promise support. Please add Promise polyfill if you want to use this method.');
        return;
      }
      return new Promise(function (resolve, reject) {
        try {
          _this2.generateBlob.apply(_this2, [function (blob) {
            resolve(blob);
          }].concat(args));
        } catch (err) {
          reject(err);
        }
      });
    },
    getMetadata: function getMetadata() {
      if (!this.hasImage()) return {};
      var _imgData = this.imgData,
          startX = _imgData.startX,
          startY = _imgData.startY;


      return {
        startX: startX,
        startY: startY,
        scale: this.scaleRatio,
        orientation: this.orientation
      };
    },
    supportDetection: function supportDetection() {
      if (typeof window === 'undefined') return;
      var div = document.createElement('div');
      return {
        'basic': window.requestAnimationFrame && window.File && window.FileReader && window.FileList && window.Blob,
        'dnd': 'ondragstart' in div && 'ondrop' in div
      };
    },
    chooseFile: function chooseFile() {
      if (this.passive) return;
      this.$refs.fileInput.click();
    },
    remove: function remove() {
      if (!this.imageSet) return;
      this._setPlaceholders();

      var hadImage = this.img != null;
      this.originalImage = null;
      this.img = null;
      this.$refs.fileInput.value = '';
      this.imgData = {
        width: 0,
        height: 0,
        startX: 0,
        startY: 0
      };
      this.orientation = 1;
      this.scaleRatio = null;
      this.userMetadata = null;
      this.imageSet = false;
      this.chosenFile = null;
      if (this.video) {
        this.video.pause();
        this.video = null;
      }

      if (hadImage) {
        this.emitEvent(events.IMAGE_REMOVE_EVENT);
      }
    },
    addClipPlugin: function addClipPlugin(plugin) {
      if (!this.clipPlugins) {
        this.clipPlugins = [];
      }
      if (typeof plugin === 'function' && this.clipPlugins.indexOf(plugin) < 0) {
        this.clipPlugins.push(plugin);
      } else {
        throw Error('Clip plugins should be functions');
      }
    },
    emitNativeEvent: function emitNativeEvent(evt) {
      this.emitEvent(evt.type, evt);
    },
    _setContainerSize: function _setContainerSize() {
      if (this.useAutoSizing) {
        this.realWidth = +getComputedStyle(this.$refs.wrapper).width.slice(0, -2);
        this.realHeight = +getComputedStyle(this.$refs.wrapper).height.slice(0, -2);
      }
    },
    _autoSizingInit: function _autoSizingInit() {
      this._setContainerSize();
      window.addEventListener('resize', this._setContainerSize);
    },
    _autoSizingRemove: function _autoSizingRemove() {
      this._setContainerSize();
      window.removeEventListener('resize', this._setContainerSize);
    },
    _initialize: function _initialize() {
      this.canvas = this.$refs.canvas;
      this._setSize();
      this.canvas.style.backgroundColor = !this.canvasColor || this.canvasColor == 'default' ? 'transparent' : typeof this.canvasColor === 'string' ? this.canvasColor : '';
      this.ctx = this.canvas.getContext('2d');
      this.ctx.imageSmoothingEnabled = true;
      this.ctx.imageSmoothingQuality = "high";
      this.ctx.webkitImageSmoothingEnabled = true;
      this.ctx.msImageSmoothingEnabled = true;
      this.ctx.imageSmoothingEnabled = true;
      this.originalImage = null;
      this.img = null;
      this.$refs.fileInput.value = '';
      this.imageSet = false;
      this.chosenFile = null;
      this._setInitial();
      if (!this.passive) {
        this.emitEvent(events.INIT_EVENT, this);
      }
    },
    _setSize: function _setSize() {
      this.canvas.width = this.outputWidth;
      this.canvas.height = this.outputHeight;
      this.canvas.style.width = (this.useAutoSizing ? this.realWidth : this.width) + 'px';
      this.canvas.style.height = (this.useAutoSizing ? this.realHeight : this.height) + 'px';
    },
    _rotateByStep: function _rotateByStep(step) {
      var orientation = 1;
      switch (step) {
        case 1:
          orientation = 6;
          break;
        case 2:
          orientation = 3;
          break;
        case 3:
          orientation = 8;
          break;
        case -1:
          orientation = 8;
          break;
        case -2:
          orientation = 3;
          break;
        case -3:
          orientation = 6;
          break;
      }
      this._setOrientation(orientation);
    },
    _setImagePlaceholder: function _setImagePlaceholder() {
      var _this3 = this;

      var img = void 0;
      if (this.$slots.placeholder && this.$slots.placeholder[0]) {
        var vNode = this.$slots.placeholder[0];
        var tag = vNode.tag,
            elm = vNode.elm;

        if (tag == 'img' && elm) {
          img = elm;
        }
      }

      if (!img) return;

      var onLoad = function onLoad() {
        _this3.ctx.drawImage(img, 0, 0, _this3.outputWidth, _this3.outputHeight);
      };

      if (u.imageLoaded(img)) {
        onLoad();
      } else {
        img.onload = onLoad;
      }
    },
    _setTextPlaceholder: function _setTextPlaceholder() {
      var ctx = this.ctx;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      var defaultFontSize = this.outputWidth * DEFAULT_PLACEHOLDER_TAKEUP / this.placeholder.length;
      var fontSize = !this.computedPlaceholderFontSize || this.computedPlaceholderFontSize == 0 ? defaultFontSize : this.computedPlaceholderFontSize;
      ctx.font = fontSize + 'px sans-serif';
      ctx.fillStyle = !this.placeholderColor || this.placeholderColor == 'default' ? '#606060' : this.placeholderColor;
      ctx.fillText(this.placeholder, this.outputWidth / 2, this.outputHeight / 2);
    },
    _setPlaceholders: function _setPlaceholders() {
      this._paintBackground();
      this._setImagePlaceholder();
      this._setTextPlaceholder();
    },
    _setInitial: function _setInitial() {
      var _this4 = this;

      var src = void 0,
          img = void 0;
      if (this.$slots.initial && this.$slots.initial[0]) {
        var vNode = this.$slots.initial[0];
        var tag = vNode.tag,
            elm = vNode.elm;

        if (tag == 'img' && elm) {
          img = elm;
        }
      }
      if (this.initialImage && typeof this.initialImage === 'string') {
        src = this.initialImage;
        img = new Image();
        if (!/^data:/.test(src) && !/^blob:/.test(src)) {
          img.setAttribute('crossOrigin', 'anonymous');
        }
        img.src = src;
      } else if (_typeof(this.initialImage) === 'object' && this.initialImage instanceof Image) {
        img = this.initialImage;
      }
      if (!src && !img) {
        this._setPlaceholders();
        return;
      }
      this.currentIsInitial = true;
      if (u.imageLoaded(img)) {
        // this.emitEvent(events.INITIAL_IMAGE_LOADED_EVENT)
        this._onload(img, +img.dataset['exifOrientation'], true);
      } else {
        this.loading = true;
        img.onload = function () {
          // this.emitEvent(events.INITIAL_IMAGE_LOADED_EVENT)
          _this4._onload(img, +img.dataset['exifOrientation'], true);
        };

        img.onerror = function () {
          _this4._setPlaceholders();
        };
      }
    },
    _onload: function _onload(img) {
      var orientation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var initial = arguments[2];

      if (this.imageSet) {
        this.remove();
      }
      this.originalImage = img;
      this.img = img;

      if (isNaN(orientation)) {
        orientation = 1;
      }

      this._setOrientation(orientation);

      if (initial) {
        this.emitEvent(events.INITIAL_IMAGE_LOADED_EVENT);
      }
    },
    _onVideoLoad: function _onVideoLoad(video, initial) {
      var _this5 = this;

      this.video = video;
      var canvas = document.createElement('canvas');
      var videoWidth = video.videoWidth,
          videoHeight = video.videoHeight;

      canvas.width = videoWidth;
      canvas.height = videoHeight;
      var ctx = canvas.getContext('2d');
      this.loading = false;
      var drawFrame = function drawFrame(initial) {
        if (!_this5.video) return;
        ctx.drawImage(_this5.video, 0, 0, videoWidth, videoHeight);
        var frame = new Image();
        frame.src = canvas.toDataURL();
        frame.onload = function () {
          _this5.img = frame;
          // this._placeImage()
          if (initial) {
            _this5._placeImage();
          } else {
            _this5._draw();
          }
        };
      };
      drawFrame(true);
      var keepDrawing = function keepDrawing() {
        _this5.$nextTick(function () {
          drawFrame();
          if (!_this5.video || _this5.video.ended || _this5.video.paused) return;
          requestAnimationFrame(keepDrawing);
        });
      };
      this.video.addEventListener('play', function () {
        requestAnimationFrame(keepDrawing);
      });
    },
    _handleClick: function _handleClick(evt) {
      this.emitNativeEvent(evt);
      if (!this.hasImage() && !this.disableClickToChoose && !this.disabled && !this.supportTouch && !this.passive) {
        this.chooseFile();
      }
    },
    _handleDblClick: function _handleDblClick(evt) {
      this.emitNativeEvent(evt);
      if (this.videoEnabled && this.video) {
        if (this.video.paused || this.video.ended) {
          this.video.play();
        } else {
          this.video.pause();
        }
        return;
      }
    },
    _handleInputChange: function _handleInputChange() {
      var input = this.$refs.fileInput;
      if (!input.files.length || this.passive) return;

      var file = input.files[0];
      this._onNewFileIn(file);
    },
    _onNewFileIn: function _onNewFileIn(file) {
      var _this6 = this;

      this.currentIsInitial = false;
      this.loading = true;
      this.emitEvent(events.FILE_CHOOSE_EVENT, file);
      this.chosenFile = file;
      if (!this._fileSizeIsValid(file)) {
        this.loading = false;
        this.emitEvent(events.FILE_SIZE_EXCEED_EVENT, file);
        return false;
      }
      if (!this._fileTypeIsValid(file)) {
        this.loading = false;
        this.emitEvent(events.FILE_TYPE_MISMATCH_EVENT, file);
        var type = file.type || file.name.toLowerCase().split('.').pop();
        return false;
      }

      if (typeof window !== 'undefined' && typeof window.FileReader !== 'undefined') {
        var fr = new FileReader();
        fr.onload = function (e) {
          var fileData = e.target.result;
          var base64 = u.parseDataUrl(fileData);
          var isVideo = /^video/.test(file.type);
          if (isVideo) {
            var video = document.createElement('video');
            video.src = fileData;
            fileData = null;
            if (video.readyState >= video.HAVE_FUTURE_DATA) {
              _this6._onVideoLoad(video);
            } else {
              video.addEventListener('canplay', function () {
                console.log('can play event');
                _this6._onVideoLoad(video);
              }, false);
            }
          } else {
            var orientation = 1;
            try {
              orientation = u.getFileOrientation(u.base64ToArrayBuffer(base64));
            } catch (err) {}
            if (orientation < 1) orientation = 1;
            var img = new Image();
            img.src = fileData;
            fileData = null;
            img.onload = function () {
              _this6._onload(img, orientation);
              _this6.emitEvent(events.NEW_IMAGE_EVENT);
            };
          }
        };
        fr.readAsDataURL(file);
      }
    },
    _fileSizeIsValid: function _fileSizeIsValid(file) {
      if (!file) return false;
      if (!this.fileSizeLimit || this.fileSizeLimit == 0) return true;

      return file.size < this.fileSizeLimit;
    },
    _fileTypeIsValid: function _fileTypeIsValid(file) {
      var acceptableMimeType = this.videoEnabled && /^video/.test(file.type) && document.createElement('video').canPlayType(file.type) || /^image/.test(file.type);
      if (!acceptableMimeType) return false;
      if (!this.accept) return true;
      var accept = this.accept;
      var baseMimetype = accept.replace(/\/.*$/, '');
      var types = accept.split(',');
      for (var i = 0, len = types.length; i < len; i++) {
        var type = types[i];
        var t = type.trim();
        if (t.charAt(0) == '.') {
          if (file.name.toLowerCase().split('.').pop() === t.toLowerCase().slice(1)) return true;
        } else if (/\/\*$/.test(t)) {
          var fileBaseType = file.type.replace(/\/.*$/, '');
          if (fileBaseType === baseMimetype) {
            return true;
          }
        } else if (file.type === type) {
          return true;
        }
      }

      return false;
    },
    _placeImage: function _placeImage(applyMetadata) {
      if (!this.img) return;
      var imgData = this.imgData;

      this.naturalWidth = this.img.naturalWidth;
      this.naturalHeight = this.img.naturalHeight;

      imgData.startX = u.numberValid(imgData.startX) ? imgData.startX : 0;
      imgData.startY = u.numberValid(imgData.startY) ? imgData.startY : 0;

      if (this.preventWhiteSpace) {
        this._aspectFill();
      } else if (!this.imageSet) {
        if (this.initialSize == 'contain') {
          this._aspectFit();
        } else if (this.initialSize == 'natural') {
          this._naturalSize();
        } else {
          this._aspectFill();
        }
      } else {
        this.imgData.width = this.naturalWidth * this.scaleRatio;
        this.imgData.height = this.naturalHeight * this.scaleRatio;
      }

      if (!this.imageSet) {
        if (/top/.test(this.initialPosition)) {
          imgData.startY = 0;
        } else if (/bottom/.test(this.initialPosition)) {
          imgData.startY = this.outputHeight - imgData.height;
        }

        if (/left/.test(this.initialPosition)) {
          imgData.startX = 0;
        } else if (/right/.test(this.initialPosition)) {
          imgData.startX = this.outputWidth - imgData.width;
        }

        if (/^-?\d+% -?\d+%$/.test(this.initialPosition)) {
          var result = /^(-?\d+)% (-?\d+)%$/.exec(this.initialPosition);
          var x = +result[1] / 100;
          var y = +result[2] / 100;
          imgData.startX = x * (this.outputWidth - imgData.width);
          imgData.startY = y * (this.outputHeight - imgData.height);
        }
      }

      applyMetadata && this._applyMetadata();

      if (applyMetadata && this.preventWhiteSpace) {
        this.zoom(false, 0);
      } else {
        this.move({ x: 0, y: 0 });
        this._draw();
      }
    },
    _aspectFill: function _aspectFill() {
      var imgWidth = this.naturalWidth;
      var imgHeight = this.naturalHeight;
      var canvasRatio = this.outputWidth / this.outputHeight;
      var scaleRatio = void 0;

      if (this.aspectRatio > canvasRatio) {
        scaleRatio = imgHeight / this.outputHeight;
        this.imgData.width = imgWidth / scaleRatio;
        this.imgData.height = this.outputHeight;
        this.imgData.startX = -(this.imgData.width - this.outputWidth) / 2;
        this.imgData.startY = 0;
      } else {
        scaleRatio = imgWidth / this.outputWidth;
        this.imgData.height = imgHeight / scaleRatio;
        this.imgData.width = this.outputWidth;
        this.imgData.startY = -(this.imgData.height - this.outputHeight) / 2;
        this.imgData.startX = 0;
      }
    },
    _aspectFit: function _aspectFit() {
      var imgWidth = this.naturalWidth;
      var imgHeight = this.naturalHeight;
      var canvasRatio = this.outputWidth / this.outputHeight;
      var scaleRatio = void 0;
      if (this.aspectRatio > canvasRatio) {
        scaleRatio = imgWidth / this.outputWidth;
        this.imgData.height = imgHeight / scaleRatio;
        this.imgData.width = this.outputWidth;
        this.imgData.startY = -(this.imgData.height - this.outputHeight) / 2;
        this.imgData.startX = 0;
      } else {
        scaleRatio = imgHeight / this.outputHeight;
        this.imgData.width = imgWidth / scaleRatio;
        this.imgData.height = this.outputHeight;
        this.imgData.startX = -(this.imgData.width - this.outputWidth) / 2;
        this.imgData.startY = 0;
      }
    },
    _naturalSize: function _naturalSize() {
      var imgWidth = this.naturalWidth;
      var imgHeight = this.naturalHeight;
      this.imgData.width = imgWidth;
      this.imgData.height = imgHeight;
      this.imgData.startX = -(this.imgData.width - this.outputWidth) / 2;
      this.imgData.startY = -(this.imgData.height - this.outputHeight) / 2;
    },
    _handlePointerStart: function _handlePointerStart(evt) {
      this.emitNativeEvent(evt);
      if (this.passive) return;
      this.supportTouch = true;
      this.pointerMoved = false;
      var pointerCoord = u.getPointerCoords(evt, this);
      this.pointerStartCoord = pointerCoord;

      if (this.disabled) return;
      // simulate click with touch on mobile devices
      if (!this.hasImage() && !this.disableClickToChoose) {
        this.tabStart = new Date().valueOf();
        return;
      }
      // ignore mouse right click and middle click
      if (evt.which && evt.which > 1) return;

      if (!evt.touches || evt.touches.length === 1) {
        this.dragging = true;
        this.pinching = false;
        var coord = u.getPointerCoords(evt, this);
        this.lastMovingCoord = coord;
      }

      if (evt.touches && evt.touches.length === 2 && !this.disablePinchToZoom) {
        this.dragging = false;
        this.pinching = true;
        this.pinchDistance = u.getPinchDistance(evt, this);
      }

      var cancelEvents = ['mouseup', 'touchend', 'touchcancel', 'pointerend', 'pointercancel'];
      for (var i = 0, len = cancelEvents.length; i < len; i++) {
        var e = cancelEvents[i];
        document.addEventListener(e, this._handlePointerEnd);
      }
    },
    _handlePointerEnd: function _handlePointerEnd(evt) {
      this.emitNativeEvent(evt);
      if (this.passive) return;
      var pointerMoveDistance = 0;
      if (this.pointerStartCoord) {
        var pointerCoord = u.getPointerCoords(evt, this);
        pointerMoveDistance = Math.sqrt(Math.pow(pointerCoord.x - this.pointerStartCoord.x, 2) + Math.pow(pointerCoord.y - this.pointerStartCoord.y, 2)) || 0;
      }
      if (this.disabled) return;
      if (!this.hasImage() && !this.disableClickToChoose) {
        var tabEnd = new Date().valueOf();
        if (pointerMoveDistance < CLICK_MOVE_THRESHOLD && tabEnd - this.tabStart < MIN_MS_PER_CLICK && this.supportTouch) {
          this.chooseFile();
        }
        this.tabStart = 0;
        return;
      }

      this.dragging = false;
      this.pinching = false;
      this.pinchDistance = 0;
      this.lastMovingCoord = null;
      this.pointerMoved = false;
      this.pointerStartCoord = null;
    },
    _handlePointerMove: function _handlePointerMove(evt) {
      this.emitNativeEvent(evt);
      if (this.passive) return;
      this.pointerMoved = true;
      if (!this.hasImage()) return;
      var coord = u.getPointerCoords(evt, this);
      this.currentPointerCoord = coord;

      if (this.disabled || this.disableDragToMove) return;

      evt.preventDefault();
      if (!evt.touches || evt.touches.length === 1) {
        if (!this.dragging) return;
        if (this.lastMovingCoord) {
          this.move({
            x: coord.x - this.lastMovingCoord.x,
            y: coord.y - this.lastMovingCoord.y
          });
        }
        this.lastMovingCoord = coord;
      }

      if (evt.touches && evt.touches.length === 2 && !this.disablePinchToZoom) {
        if (!this.pinching) return;
        var distance = u.getPinchDistance(evt, this);
        var delta = distance - this.pinchDistance;
        this.zoom(delta > 0, PINCH_ACCELERATION);
        this.pinchDistance = distance;
      }
    },
    _handlePointerLeave: function _handlePointerLeave(evt) {
      this.emitNativeEvent(evt);
      if (this.passive) return;
      this.currentPointerCoord = null;
    },
    _handleWheel: function _handleWheel(evt) {
      var _this7 = this;

      this.emitNativeEvent(evt);
      if (this.passive) return;
      if (this.disabled || this.disableScrollToZoom || !this.hasImage()) return;
      evt.preventDefault();
      this.scrolling = true;
      if (evt.wheelDelta < 0 || evt.deltaY > 0 || evt.detail > 0) {
        this.zoom(this.reverseScrollToZoom);
      } else if (evt.wheelDelta > 0 || evt.deltaY < 0 || evt.detail < 0) {
        this.zoom(!this.reverseScrollToZoom);
      }
      this.$nextTick(function () {
        _this7.scrolling = false;
      });
    },
    _handleDragEnter: function _handleDragEnter(evt) {
      this.emitNativeEvent(evt);
      if (this.passive) return;
      if (this.disabled || this.disableDragAndDrop || !u.eventHasFile(evt)) return;
      if (this.hasImage() && !this.replaceDrop) return;
      this.fileDraggedOver = true;
    },
    _handleDragLeave: function _handleDragLeave(evt) {
      this.emitNativeEvent(evt);
      if (this.passive) return;
      if (!this.fileDraggedOver || !u.eventHasFile(evt)) return;
      this.fileDraggedOver = false;
    },
    _handleDragOver: function _handleDragOver(evt) {
      this.emitNativeEvent(evt);
    },
    _handleDrop: function _handleDrop(evt) {
      this.emitNativeEvent(evt);
      if (this.passive) return;
      if (!this.fileDraggedOver || !u.eventHasFile(evt)) return;
      if (this.hasImage() && !this.replaceDrop) {
        return;
      }
      this.fileDraggedOver = false;

      var file = void 0;
      var dt = evt.dataTransfer;
      if (!dt) return;
      if (dt.items) {
        for (var i = 0, len = dt.items.length; i < len; i++) {
          var item = dt.items[i];
          if (item.kind == 'file') {
            file = item.getAsFile();
            break;
          }
        }
      } else {
        file = dt.files[0];
      }

      if (file) {
        this._onNewFileIn(file);
      }
    },
    _preventMovingToWhiteSpace: function _preventMovingToWhiteSpace() {
      if (this.imgData.startX > 0) {
        this.imgData.startX = 0;
      }
      if (this.imgData.startY > 0) {
        this.imgData.startY = 0;
      }
      if (this.outputWidth - this.imgData.startX > this.imgData.width) {
        this.imgData.startX = -(this.imgData.width - this.outputWidth);
      }
      if (this.outputHeight - this.imgData.startY > this.imgData.height) {
        this.imgData.startY = -(this.imgData.height - this.outputHeight);
      }
    },
    _preventZoomingToWhiteSpace: function _preventZoomingToWhiteSpace() {
      if (this.imgData.width < this.outputWidth) {
        this.scaleRatio = this.outputWidth / this.naturalWidth;
      }

      if (this.imgData.height < this.outputHeight) {
        this.scaleRatio = this.outputHeight / this.naturalHeight;
      }
    },
    _setOrientation: function _setOrientation() {
      var _this8 = this;

      var orientation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
      var applyMetadata = arguments[1];

      var useOriginal = applyMetadata;
      if (orientation > 1 || useOriginal) {
        if (!this.img) return;
        this.rotating = true;
        // u.getRotatedImageData(useOriginal ? this.originalImage : this.img, orientation)
        var _img = u.getRotatedImage(useOriginal ? this.originalImage : this.img, orientation);
        _img.onload = function () {
          _this8.img = _img;
          _this8._placeImage(applyMetadata);
        };
      } else {
        this._placeImage(applyMetadata);
      }

      if (orientation == 2) {
        // flip x
        this.orientation = u.flipX(this.orientation);
      } else if (orientation == 4) {
        // flip y
        this.orientation = u.flipY(this.orientation);
      } else if (orientation == 6) {
        // 90 deg
        this.orientation = u.rotate90(this.orientation);
      } else if (orientation == 3) {
        // 180 deg
        this.orientation = u.rotate90(u.rotate90(this.orientation));
      } else if (orientation == 8) {
        // 270 deg
        this.orientation = u.rotate90(u.rotate90(u.rotate90(this.orientation)));
      } else {
        this.orientation = orientation;
      }

      if (useOriginal) {
        this.orientation = orientation;
      }
    },
    _paintBackground: function _paintBackground() {
      var backgroundColor = !this.canvasColor || this.canvasColor == 'default' ? 'transparent' : this.canvasColor;
      this.ctx.fillStyle = backgroundColor;
      this.ctx.clearRect(0, 0, this.outputWidth, this.outputHeight);
      this.ctx.fillRect(0, 0, this.outputWidth, this.outputHeight);
    },
    _draw: function _draw() {
      var _this9 = this;

      this.$nextTick(function () {
        if (typeof window !== 'undefined' && window.requestAnimationFrame) {
          requestAnimationFrame(_this9._drawFrame);
        } else {
          _this9._drawFrame();
        }
      });
    },
    _drawFrame: function _drawFrame() {
      if (!this.img) return;
      this.loading = false;
      var ctx = this.ctx;
      var _imgData2 = this.imgData,
          startX = _imgData2.startX,
          startY = _imgData2.startY,
          width = _imgData2.width,
          height = _imgData2.height;


      this._paintBackground();
      ctx.drawImage(this.img, startX, startY, width, height);

      if (this.preventWhiteSpace) {
        this._clip(this._createContainerClipPath);
        // this._clip(this._createImageClipPath)
      }

      this.emitEvent(events.DRAW_EVENT, ctx);
      if (!this.imageSet) {
        this.imageSet = true;
        this.emitEvent(events.NEW_IMAGE_DRAWN_EVENT);
      }
      this.rotating = false;
    },
    _clipPathFactory: function _clipPathFactory(x, y, width, height) {
      var ctx = this.ctx;
      var radius = typeof this.imageBorderRadius === 'number' ? this.imageBorderRadius : !isNaN(Number(this.imageBorderRadius)) ? Number(this.imageBorderRadius) : 0;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    },
    _createContainerClipPath: function _createContainerClipPath() {
      var _this10 = this;

      this._clipPathFactory(0, 0, this.outputWidth, this.outputHeight);
      if (this.clipPlugins && this.clipPlugins.length) {
        this.clipPlugins.forEach(function (func) {
          func(_this10.ctx, 0, 0, _this10.outputWidth, _this10.outputHeight);
        });
      }
    },


    // _createImageClipPath () {
    //   let { startX, startY, width, height } = this.imgData
    //   let w = width
    //   let h = height
    //   let x = startX
    //   let y = startY
    //   if (w < h) {
    //     h = this.outputHeight * (width / this.outputWidth)
    //   }
    //   if (h < w) {
    //     w = this.outputWidth * (height / this.outputHeight)
    //     x = startX + (width - this.outputWidth) / 2
    //   }
    //   this._clipPathFactory(x, startY, w, h)
    // },

    _clip: function _clip(createPath) {
      var ctx = this.ctx;
      ctx.save();
      ctx.fillStyle = '#fff';
      ctx.globalCompositeOperation = 'destination-in';
      createPath();
      ctx.fill();
      ctx.restore();
    },
    _applyMetadata: function _applyMetadata() {
      var _this11 = this;

      if (!this.userMetadata) return;
      var _userMetadata = this.userMetadata,
          startX = _userMetadata.startX,
          startY = _userMetadata.startY,
          scale = _userMetadata.scale;


      if (u.numberValid(startX)) {
        this.imgData.startX = startX;
      }

      if (u.numberValid(startY)) {
        this.imgData.startY = startY;
      }

      if (u.numberValid(scale)) {
        this.scaleRatio = scale;
      }

      this.$nextTick(function () {
        _this11.userMetadata = null;
      });
    },
    onDimensionChange: function onDimensionChange() {
      if (!this.img) {
        this._initialize();
      } else {
        if (this.preventWhiteSpace) {
          this.imageSet = false;
        }
        this._setSize();
        this._placeImage();
      }
    }
  }
};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

var defaultOptions = {
  componentName: 'croppa'
};

var VueCroppa = {
  install: function install(Vue, options) {
    options = objectAssign({}, defaultOptions, options);
    var version = Number(Vue.version.split('.')[0]);
    if (version < 2) {
      throw new Error('vue-croppa supports vue version 2.0 and above. You are using Vue@' + version + '. Please upgrade to the latest version of Vue.');
    }
    var componentName = options.componentName || 'croppa';

    // registration
    Vue.component(componentName, component);
  },

  component: component
};

return VueCroppa;

})));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "28a5":
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__("214f")('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__("aae3");
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2fdb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__("5ca1");
var context = __webpack_require__("d2c8");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "3053":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "365d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3b2b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var inheritIfRequired = __webpack_require__("5dbc");
var dP = __webpack_require__("86cc").f;
var gOPN = __webpack_require__("9093").f;
var isRegExp = __webpack_require__("aae3");
var $flags = __webpack_require__("0bfb");
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__("9e1e") && (!CORRECT_NEW || __webpack_require__("79e5")(function () {
  re2[__webpack_require__("2b4c")('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__("2aba")(global, 'RegExp', $RegExp);
}

__webpack_require__("7a56")('RegExp');


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "5147":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6762":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("5ca1");
var $includes = __webpack_require__("c366")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("9c6c")('includes');


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "77f3":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var globals = ["document", "window", "later"],
    globalValues = {};
globals.forEach(function (g) {
  if (g in global) globalValues[g] = global[g];
});

__webpack_require__("c84a");

module.exports = later;
globals.forEach(function (g) {
  if (g in globalValues) global[g] = globalValues[g];else delete global[g];
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7a56":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var dP = __webpack_require__("86cc");
var DESCRIPTORS = __webpack_require__("9e1e");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "b0f1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c73b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c84a":
/***/ (function(module, exports) {

later = function() {
  "use strict";
  var later = {
    version: "1.2.0"
  };
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement) {
      "use strict";
      if (this == null) {
        throw new TypeError();
      }
      var t = Object(this);
      var len = t.length >>> 0;
      if (len === 0) {
        return -1;
      }
      var n = 0;
      if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n != n) {
          n = 0;
        } else if (n != 0 && n != Infinity && n != -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      if (n >= len) {
        return -1;
      }
      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      for (;k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    };
  }
  if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, "");
    };
  }
  later.array = {};
  later.array.sort = function(arr, zeroIsLast) {
    arr.sort(function(a, b) {
      return +a - +b;
    });
    if (zeroIsLast && arr[0] === 0) {
      arr.push(arr.shift());
    }
  };
  later.array.next = function(val, values, extent) {
    var cur, zeroIsLargest = extent[0] !== 0, nextIdx = 0;
    for (var i = values.length - 1; i > -1; --i) {
      cur = values[i];
      if (cur === val) {
        return cur;
      }
      if (cur > val || cur === 0 && zeroIsLargest && extent[1] > val) {
        nextIdx = i;
        continue;
      }
      break;
    }
    return values[nextIdx];
  };
  later.array.nextInvalid = function(val, values, extent) {
    var min = extent[0], max = extent[1], len = values.length, zeroVal = values[len - 1] === 0 && min !== 0 ? max : 0, next = val, i = values.indexOf(val), start = next;
    while (next === (values[i] || zeroVal)) {
      next++;
      if (next > max) {
        next = min;
      }
      i++;
      if (i === len) {
        i = 0;
      }
      if (next === start) {
        return undefined;
      }
    }
    return next;
  };
  later.array.prev = function(val, values, extent) {
    var cur, len = values.length, zeroIsLargest = extent[0] !== 0, prevIdx = len - 1;
    for (var i = 0; i < len; i++) {
      cur = values[i];
      if (cur === val) {
        return cur;
      }
      if (cur < val || cur === 0 && zeroIsLargest && extent[1] < val) {
        prevIdx = i;
        continue;
      }
      break;
    }
    return values[prevIdx];
  };
  later.array.prevInvalid = function(val, values, extent) {
    var min = extent[0], max = extent[1], len = values.length, zeroVal = values[len - 1] === 0 && min !== 0 ? max : 0, next = val, i = values.indexOf(val), start = next;
    while (next === (values[i] || zeroVal)) {
      next--;
      if (next < min) {
        next = max;
      }
      i--;
      if (i === -1) {
        i = len - 1;
      }
      if (next === start) {
        return undefined;
      }
    }
    return next;
  };
  later.day = later.D = {
    name: "day",
    range: 86400,
    val: function(d) {
      return d.D || (d.D = later.date.getDate.call(d));
    },
    isValid: function(d, val) {
      return later.D.val(d) === (val || later.D.extent(d)[1]);
    },
    extent: function(d) {
      if (d.DExtent) return d.DExtent;
      var month = later.M.val(d), max = later.DAYS_IN_MONTH[month - 1];
      if (month === 2 && later.dy.extent(d)[1] === 366) {
        max = max + 1;
      }
      return d.DExtent = [ 1, max ];
    },
    start: function(d) {
      return d.DStart || (d.DStart = later.date.next(later.Y.val(d), later.M.val(d), later.D.val(d)));
    },
    end: function(d) {
      return d.DEnd || (d.DEnd = later.date.prev(later.Y.val(d), later.M.val(d), later.D.val(d)));
    },
    next: function(d, val) {
      val = val > later.D.extent(d)[1] ? 1 : val;
      var month = later.date.nextRollover(d, val, later.D, later.M), DMax = later.D.extent(month)[1];
      val = val > DMax ? 1 : val || DMax;
      return later.date.next(later.Y.val(month), later.M.val(month), val);
    },
    prev: function(d, val) {
      var month = later.date.prevRollover(d, val, later.D, later.M), DMax = later.D.extent(month)[1];
      return later.date.prev(later.Y.val(month), later.M.val(month), val > DMax ? DMax : val || DMax);
    }
  };
  later.dayOfWeekCount = later.dc = {
    name: "day of week count",
    range: 604800,
    val: function(d) {
      return d.dc || (d.dc = Math.floor((later.D.val(d) - 1) / 7) + 1);
    },
    isValid: function(d, val) {
      return later.dc.val(d) === val || val === 0 && later.D.val(d) > later.D.extent(d)[1] - 7;
    },
    extent: function(d) {
      return d.dcExtent || (d.dcExtent = [ 1, Math.ceil(later.D.extent(d)[1] / 7) ]);
    },
    start: function(d) {
      return d.dcStart || (d.dcStart = later.date.next(later.Y.val(d), later.M.val(d), Math.max(1, (later.dc.val(d) - 1) * 7 + 1 || 1)));
    },
    end: function(d) {
      return d.dcEnd || (d.dcEnd = later.date.prev(later.Y.val(d), later.M.val(d), Math.min(later.dc.val(d) * 7, later.D.extent(d)[1])));
    },
    next: function(d, val) {
      val = val > later.dc.extent(d)[1] ? 1 : val;
      var month = later.date.nextRollover(d, val, later.dc, later.M), dcMax = later.dc.extent(month)[1];
      val = val > dcMax ? 1 : val;
      var next = later.date.next(later.Y.val(month), later.M.val(month), val === 0 ? later.D.extent(month)[1] - 6 : 1 + 7 * (val - 1));
      if (next.getTime() <= d.getTime()) {
        month = later.M.next(d, later.M.val(d) + 1);
        return later.date.next(later.Y.val(month), later.M.val(month), val === 0 ? later.D.extent(month)[1] - 6 : 1 + 7 * (val - 1));
      }
      return next;
    },
    prev: function(d, val) {
      var month = later.date.prevRollover(d, val, later.dc, later.M), dcMax = later.dc.extent(month)[1];
      val = val > dcMax ? dcMax : val || dcMax;
      return later.dc.end(later.date.prev(later.Y.val(month), later.M.val(month), 1 + 7 * (val - 1)));
    }
  };
  later.dayOfWeek = later.dw = later.d = {
    name: "day of week",
    range: 86400,
    val: function(d) {
      return d.dw || (d.dw = later.date.getDay.call(d) + 1);
    },
    isValid: function(d, val) {
      return later.dw.val(d) === (val || 7);
    },
    extent: function() {
      return [ 1, 7 ];
    },
    start: function(d) {
      return later.D.start(d);
    },
    end: function(d) {
      return later.D.end(d);
    },
    next: function(d, val) {
      val = val > 7 ? 1 : val || 7;
      return later.date.next(later.Y.val(d), later.M.val(d), later.D.val(d) + (val - later.dw.val(d)) + (val <= later.dw.val(d) ? 7 : 0));
    },
    prev: function(d, val) {
      val = val > 7 ? 7 : val || 7;
      return later.date.prev(later.Y.val(d), later.M.val(d), later.D.val(d) + (val - later.dw.val(d)) + (val >= later.dw.val(d) ? -7 : 0));
    }
  };
  later.dayOfYear = later.dy = {
    name: "day of year",
    range: 86400,
    val: function(d) {
      return d.dy || (d.dy = Math.ceil(1 + (later.D.start(d).getTime() - later.Y.start(d).getTime()) / later.DAY));
    },
    isValid: function(d, val) {
      return later.dy.val(d) === (val || later.dy.extent(d)[1]);
    },
    extent: function(d) {
      var year = later.Y.val(d);
      return d.dyExtent || (d.dyExtent = [ 1, year % 4 ? 365 : 366 ]);
    },
    start: function(d) {
      return later.D.start(d);
    },
    end: function(d) {
      return later.D.end(d);
    },
    next: function(d, val) {
      val = val > later.dy.extent(d)[1] ? 1 : val;
      var year = later.date.nextRollover(d, val, later.dy, later.Y), dyMax = later.dy.extent(year)[1];
      val = val > dyMax ? 1 : val || dyMax;
      return later.date.next(later.Y.val(year), later.M.val(year), val);
    },
    prev: function(d, val) {
      var year = later.date.prevRollover(d, val, later.dy, later.Y), dyMax = later.dy.extent(year)[1];
      val = val > dyMax ? dyMax : val || dyMax;
      return later.date.prev(later.Y.val(year), later.M.val(year), val);
    }
  };
  later.hour = later.h = {
    name: "hour",
    range: 3600,
    val: function(d) {
      return d.h || (d.h = later.date.getHour.call(d));
    },
    isValid: function(d, val) {
      return later.h.val(d) === val;
    },
    extent: function() {
      return [ 0, 23 ];
    },
    start: function(d) {
      return d.hStart || (d.hStart = later.date.next(later.Y.val(d), later.M.val(d), later.D.val(d), later.h.val(d)));
    },
    end: function(d) {
      return d.hEnd || (d.hEnd = later.date.prev(later.Y.val(d), later.M.val(d), later.D.val(d), later.h.val(d)));
    },
    next: function(d, val) {
      val = val > 23 ? 0 : val;
      var next = later.date.next(later.Y.val(d), later.M.val(d), later.D.val(d) + (val <= later.h.val(d) ? 1 : 0), val);
      if (!later.date.isUTC && next.getTime() <= d.getTime()) {
        next = later.date.next(later.Y.val(next), later.M.val(next), later.D.val(next), val + 1);
      }
      return next;
    },
    prev: function(d, val) {
      val = val > 23 ? 23 : val;
      return later.date.prev(later.Y.val(d), later.M.val(d), later.D.val(d) + (val >= later.h.val(d) ? -1 : 0), val);
    }
  };
  later.minute = later.m = {
    name: "minute",
    range: 60,
    val: function(d) {
      return d.m || (d.m = later.date.getMin.call(d));
    },
    isValid: function(d, val) {
      return later.m.val(d) === val;
    },
    extent: function(d) {
      return [ 0, 59 ];
    },
    start: function(d) {
      return d.mStart || (d.mStart = later.date.next(later.Y.val(d), later.M.val(d), later.D.val(d), later.h.val(d), later.m.val(d)));
    },
    end: function(d) {
      return d.mEnd || (d.mEnd = later.date.prev(later.Y.val(d), later.M.val(d), later.D.val(d), later.h.val(d), later.m.val(d)));
    },
    next: function(d, val) {
      var m = later.m.val(d), s = later.s.val(d), inc = val > 59 ? 60 - m : val <= m ? 60 - m + val : val - m, next = new Date(d.getTime() + inc * later.MIN - s * later.SEC);
      if (!later.date.isUTC && next.getTime() <= d.getTime()) {
        next = new Date(d.getTime() + (inc + 120) * later.MIN - s * later.SEC);
      }
      return next;
    },
    prev: function(d, val) {
      val = val > 59 ? 59 : val;
      return later.date.prev(later.Y.val(d), later.M.val(d), later.D.val(d), later.h.val(d) + (val >= later.m.val(d) ? -1 : 0), val);
    }
  };
  later.month = later.M = {
    name: "month",
    range: 2629740,
    val: function(d) {
      return d.M || (d.M = later.date.getMonth.call(d) + 1);
    },
    isValid: function(d, val) {
      return later.M.val(d) === (val || 12);
    },
    extent: function() {
      return [ 1, 12 ];
    },
    start: function(d) {
      return d.MStart || (d.MStart = later.date.next(later.Y.val(d), later.M.val(d)));
    },
    end: function(d) {
      return d.MEnd || (d.MEnd = later.date.prev(later.Y.val(d), later.M.val(d)));
    },
    next: function(d, val) {
      val = val > 12 ? 1 : val || 12;
      return later.date.next(later.Y.val(d) + (val > later.M.val(d) ? 0 : 1), val);
    },
    prev: function(d, val) {
      val = val > 12 ? 12 : val || 12;
      return later.date.prev(later.Y.val(d) - (val >= later.M.val(d) ? 1 : 0), val);
    }
  };
  later.second = later.s = {
    name: "second",
    range: 1,
    val: function(d) {
      return d.s || (d.s = later.date.getSec.call(d));
    },
    isValid: function(d, val) {
      return later.s.val(d) === val;
    },
    extent: function() {
      return [ 0, 59 ];
    },
    start: function(d) {
      return d;
    },
    end: function(d) {
      return d;
    },
    next: function(d, val) {
      var s = later.s.val(d), inc = val > 59 ? 60 - s : val <= s ? 60 - s + val : val - s, next = new Date(d.getTime() + inc * later.SEC);
      if (!later.date.isUTC && next.getTime() <= d.getTime()) {
        next = new Date(d.getTime() + (inc + 7200) * later.SEC);
      }
      return next;
    },
    prev: function(d, val, cache) {
      val = val > 59 ? 59 : val;
      return later.date.prev(later.Y.val(d), later.M.val(d), later.D.val(d), later.h.val(d), later.m.val(d) + (val >= later.s.val(d) ? -1 : 0), val);
    }
  };
  later.time = later.t = {
    name: "time",
    range: 1,
    val: function(d) {
      return d.t || (d.t = later.h.val(d) * 3600 + later.m.val(d) * 60 + later.s.val(d));
    },
    isValid: function(d, val) {
      return later.t.val(d) === val;
    },
    extent: function() {
      return [ 0, 86399 ];
    },
    start: function(d) {
      return d;
    },
    end: function(d) {
      return d;
    },
    next: function(d, val) {
      val = val > 86399 ? 0 : val;
      var next = later.date.next(later.Y.val(d), later.M.val(d), later.D.val(d) + (val <= later.t.val(d) ? 1 : 0), 0, 0, val);
      if (!later.date.isUTC && next.getTime() < d.getTime()) {
        next = later.date.next(later.Y.val(next), later.M.val(next), later.D.val(next), later.h.val(next), later.m.val(next), val + 7200);
      }
      return next;
    },
    prev: function(d, val) {
      val = val > 86399 ? 86399 : val;
      return later.date.next(later.Y.val(d), later.M.val(d), later.D.val(d) + (val >= later.t.val(d) ? -1 : 0), 0, 0, val);
    }
  };
  later.weekOfMonth = later.wm = {
    name: "week of month",
    range: 604800,
    val: function(d) {
      return d.wm || (d.wm = (later.D.val(d) + (later.dw.val(later.M.start(d)) - 1) + (7 - later.dw.val(d))) / 7);
    },
    isValid: function(d, val) {
      return later.wm.val(d) === (val || later.wm.extent(d)[1]);
    },
    extent: function(d) {
      return d.wmExtent || (d.wmExtent = [ 1, (later.D.extent(d)[1] + (later.dw.val(later.M.start(d)) - 1) + (7 - later.dw.val(later.M.end(d)))) / 7 ]);
    },
    start: function(d) {
      return d.wmStart || (d.wmStart = later.date.next(later.Y.val(d), later.M.val(d), Math.max(later.D.val(d) - later.dw.val(d) + 1, 1)));
    },
    end: function(d) {
      return d.wmEnd || (d.wmEnd = later.date.prev(later.Y.val(d), later.M.val(d), Math.min(later.D.val(d) + (7 - later.dw.val(d)), later.D.extent(d)[1])));
    },
    next: function(d, val) {
      val = val > later.wm.extent(d)[1] ? 1 : val;
      var month = later.date.nextRollover(d, val, later.wm, later.M), wmMax = later.wm.extent(month)[1];
      val = val > wmMax ? 1 : val || wmMax;
      return later.date.next(later.Y.val(month), later.M.val(month), Math.max(1, (val - 1) * 7 - (later.dw.val(month) - 2)));
    },
    prev: function(d, val) {
      var month = later.date.prevRollover(d, val, later.wm, later.M), wmMax = later.wm.extent(month)[1];
      val = val > wmMax ? wmMax : val || wmMax;
      return later.wm.end(later.date.next(later.Y.val(month), later.M.val(month), Math.max(1, (val - 1) * 7 - (later.dw.val(month) - 2))));
    }
  };
  later.weekOfYear = later.wy = {
    name: "week of year (ISO)",
    range: 604800,
    val: function(d) {
      if (d.wy) return d.wy;
      var wThur = later.dw.next(later.wy.start(d), 5), YThur = later.dw.next(later.Y.prev(wThur, later.Y.val(wThur) - 1), 5);
      return d.wy = 1 + Math.ceil((wThur.getTime() - YThur.getTime()) / later.WEEK);
    },
    isValid: function(d, val) {
      return later.wy.val(d) === (val || later.wy.extent(d)[1]);
    },
    extent: function(d) {
      if (d.wyExtent) return d.wyExtent;
      var year = later.dw.next(later.wy.start(d), 5), dwFirst = later.dw.val(later.Y.start(year)), dwLast = later.dw.val(later.Y.end(year));
      return d.wyExtent = [ 1, dwFirst === 5 || dwLast === 5 ? 53 : 52 ];
    },
    start: function(d) {
      return d.wyStart || (d.wyStart = later.date.next(later.Y.val(d), later.M.val(d), later.D.val(d) - (later.dw.val(d) > 1 ? later.dw.val(d) - 2 : 6)));
    },
    end: function(d) {
      return d.wyEnd || (d.wyEnd = later.date.prev(later.Y.val(d), later.M.val(d), later.D.val(d) + (later.dw.val(d) > 1 ? 8 - later.dw.val(d) : 0)));
    },
    next: function(d, val) {
      val = val > later.wy.extent(d)[1] ? 1 : val;
      var wyThur = later.dw.next(later.wy.start(d), 5), year = later.date.nextRollover(wyThur, val, later.wy, later.Y);
      if (later.wy.val(year) !== 1) {
        year = later.dw.next(year, 2);
      }
      var wyMax = later.wy.extent(year)[1], wyStart = later.wy.start(year);
      val = val > wyMax ? 1 : val || wyMax;
      return later.date.next(later.Y.val(wyStart), later.M.val(wyStart), later.D.val(wyStart) + 7 * (val - 1));
    },
    prev: function(d, val) {
      var wyThur = later.dw.next(later.wy.start(d), 5), year = later.date.prevRollover(wyThur, val, later.wy, later.Y);
      if (later.wy.val(year) !== 1) {
        year = later.dw.next(year, 2);
      }
      var wyMax = later.wy.extent(year)[1], wyEnd = later.wy.end(year);
      val = val > wyMax ? wyMax : val || wyMax;
      return later.wy.end(later.date.next(later.Y.val(wyEnd), later.M.val(wyEnd), later.D.val(wyEnd) + 7 * (val - 1)));
    }
  };
  later.year = later.Y = {
    name: "year",
    range: 31556900,
    val: function(d) {
      return d.Y || (d.Y = later.date.getYear.call(d));
    },
    isValid: function(d, val) {
      return later.Y.val(d) === val;
    },
    extent: function() {
      return [ 1970, 2099 ];
    },
    start: function(d) {
      return d.YStart || (d.YStart = later.date.next(later.Y.val(d)));
    },
    end: function(d) {
      return d.YEnd || (d.YEnd = later.date.prev(later.Y.val(d)));
    },
    next: function(d, val) {
      return val > later.Y.val(d) && val <= later.Y.extent()[1] ? later.date.next(val) : later.NEVER;
    },
    prev: function(d, val) {
      return val < later.Y.val(d) && val >= later.Y.extent()[0] ? later.date.prev(val) : later.NEVER;
    }
  };
  later.fullDate = later.fd = {
    name: "full date",
    range: 1,
    val: function(d) {
      return d.fd || (d.fd = d.getTime());
    },
    isValid: function(d, val) {
      return later.fd.val(d) === val;
    },
    extent: function() {
      return [ 0, 3250368e7 ];
    },
    start: function(d) {
      return d;
    },
    end: function(d) {
      return d;
    },
    next: function(d, val) {
      return later.fd.val(d) < val ? new Date(val) : later.NEVER;
    },
    prev: function(d, val) {
      return later.fd.val(d) > val ? new Date(val) : later.NEVER;
    }
  };
  later.modifier = {};
  later.modifier.after = later.modifier.a = function(constraint, values) {
    var value = values[0];
    return {
      name: "after " + constraint.name,
      range: (constraint.extent(new Date())[1] - value) * constraint.range,
      val: constraint.val,
      isValid: function(d, val) {
        return this.val(d) >= value;
      },
      extent: constraint.extent,
      start: constraint.start,
      end: constraint.end,
      next: function(startDate, val) {
        if (val != value) val = constraint.extent(startDate)[0];
        return constraint.next(startDate, val);
      },
      prev: function(startDate, val) {
        val = val === value ? constraint.extent(startDate)[1] : value - 1;
        return constraint.prev(startDate, val);
      }
    };
  };
  later.modifier.before = later.modifier.b = function(constraint, values) {
    var value = values[values.length - 1];
    return {
      name: "before " + constraint.name,
      range: constraint.range * (value - 1),
      val: constraint.val,
      isValid: function(d, val) {
        return this.val(d) < value;
      },
      extent: constraint.extent,
      start: constraint.start,
      end: constraint.end,
      next: function(startDate, val) {
        val = val === value ? constraint.extent(startDate)[0] : value;
        return constraint.next(startDate, val);
      },
      prev: function(startDate, val) {
        val = val === value ? value - 1 : constraint.extent(startDate)[1];
        return constraint.prev(startDate, val);
      }
    };
  };
  later.compile = function(schedDef) {
    var constraints = [], constraintsLen = 0, tickConstraint;
    for (var key in schedDef) {
      var nameParts = key.split("_"), name = nameParts[0], mod = nameParts[1], vals = schedDef[key], constraint = mod ? later.modifier[mod](later[name], vals) : later[name];
      constraints.push({
        constraint: constraint,
        vals: vals
      });
      constraintsLen++;
    }
    constraints.sort(function(a, b) {
      var ra = a.constraint.range, rb = b.constraint.range;
      return rb < ra ? -1 : rb > ra ? 1 : 0;
    });
    tickConstraint = constraints[constraintsLen - 1].constraint;
    function compareFn(dir) {
      return dir === "next" ? function(a, b) {
        return a.getTime() > b.getTime();
      } : function(a, b) {
        return b.getTime() > a.getTime();
      };
    }
    return {
      start: function(dir, startDate) {
        var next = startDate, nextVal = later.array[dir], maxAttempts = 1e3, done;
        while (maxAttempts-- && !done && next) {
          done = true;
          for (var i = 0; i < constraintsLen; i++) {
            var constraint = constraints[i].constraint, curVal = constraint.val(next), extent = constraint.extent(next), newVal = nextVal(curVal, constraints[i].vals, extent);
            if (!constraint.isValid(next, newVal)) {
              next = constraint[dir](next, newVal);
              done = false;
              break;
            }
          }
        }
        if (next !== later.NEVER) {
          next = dir === "next" ? tickConstraint.start(next) : tickConstraint.end(next);
        }
        return next;
      },
      end: function(dir, startDate) {
        var result, nextVal = later.array[dir + "Invalid"], compare = compareFn(dir);
        for (var i = constraintsLen - 1; i >= 0; i--) {
          var constraint = constraints[i].constraint, curVal = constraint.val(startDate), extent = constraint.extent(startDate), newVal = nextVal(curVal, constraints[i].vals, extent), next;
          if (newVal !== undefined) {
            next = constraint[dir](startDate, newVal);
            if (next && (!result || compare(result, next))) {
              result = next;
            }
          }
        }
        return result;
      },
      tick: function(dir, date) {
        return new Date(dir === "next" ? tickConstraint.end(date).getTime() + later.SEC : tickConstraint.start(date).getTime() - later.SEC);
      },
      tickStart: function(date) {
        return tickConstraint.start(date);
      }
    };
  };
  later.schedule = function(sched) {
    if (!sched) throw new Error("Missing schedule definition.");
    if (!sched.schedules) throw new Error("Definition must include at least one schedule.");
    var schedules = [], schedulesLen = sched.schedules.length, exceptions = [], exceptionsLen = sched.exceptions ? sched.exceptions.length : 0;
    for (var i = 0; i < schedulesLen; i++) {
      schedules.push(later.compile(sched.schedules[i]));
    }
    for (var j = 0; j < exceptionsLen; j++) {
      exceptions.push(later.compile(sched.exceptions[j]));
    }
    function getInstances(dir, count, startDate, endDate, isRange) {
      var compare = compareFn(dir), loopCount = count, maxAttempts = 1e3, schedStarts = [], exceptStarts = [], next, end, results = [], isForward = dir === "next", lastResult, rStart = isForward ? 0 : 1, rEnd = isForward ? 1 : 0;
      startDate = startDate ? new Date(startDate) : new Date();
      if (!startDate || !startDate.getTime()) throw new Error("Invalid start date.");
      setNextStarts(dir, schedules, schedStarts, startDate);
      setRangeStarts(dir, exceptions, exceptStarts, startDate);
      while (maxAttempts-- && loopCount && (next = findNext(schedStarts, compare))) {
        if (endDate && compare(next, endDate)) {
          break;
        }
        if (exceptionsLen) {
          updateRangeStarts(dir, exceptions, exceptStarts, next);
          if (end = calcRangeOverlap(dir, exceptStarts, next)) {
            updateNextStarts(dir, schedules, schedStarts, end);
            continue;
          }
        }
        if (isRange) {
          var maxEndDate = calcMaxEndDate(exceptStarts, compare);
          end = calcEnd(dir, schedules, schedStarts, next, maxEndDate);
          var r = isForward ? [ new Date(Math.max(startDate, next)), end ? new Date(endDate ? Math.min(end, endDate) : end) : undefined ] : [ end ? new Date(endDate ? Math.max(endDate, end.getTime() + later.SEC) : end.getTime() + later.SEC) : undefined, new Date(Math.min(startDate, next.getTime() + later.SEC)) ];
          if (lastResult && r[rStart].getTime() === lastResult[rEnd].getTime()) {
            lastResult[rEnd] = r[rEnd];
            loopCount++;
          } else {
            lastResult = r;
            results.push(lastResult);
          }
          if (!end) break;
          updateNextStarts(dir, schedules, schedStarts, end);
        } else {
          results.push(isForward ? new Date(Math.max(startDate, next)) : getStart(schedules, schedStarts, next, endDate));
          tickStarts(dir, schedules, schedStarts, next);
        }
        loopCount--;
      }
      for (var i = 0, len = results.length; i < len; i++) {
        var result = results[i];
        results[i] = Object.prototype.toString.call(result) === "[object Array]" ? [ cleanDate(result[0]), cleanDate(result[1]) ] : cleanDate(result);
      }
      return results.length === 0 ? later.NEVER : count === 1 ? results[0] : results;
    }
    function cleanDate(d) {
      if (d instanceof Date && !isNaN(d.valueOf())) {
        return new Date(d);
      }
      return undefined;
    }
    function setNextStarts(dir, schedArr, startsArr, startDate) {
      for (var i = 0, len = schedArr.length; i < len; i++) {
        startsArr[i] = schedArr[i].start(dir, startDate);
      }
    }
    function updateNextStarts(dir, schedArr, startsArr, startDate) {
      var compare = compareFn(dir);
      for (var i = 0, len = schedArr.length; i < len; i++) {
        if (startsArr[i] && !compare(startsArr[i], startDate)) {
          startsArr[i] = schedArr[i].start(dir, startDate);
        }
      }
    }
    function setRangeStarts(dir, schedArr, rangesArr, startDate) {
      var compare = compareFn(dir);
      for (var i = 0, len = schedArr.length; i < len; i++) {
        var nextStart = schedArr[i].start(dir, startDate);
        if (!nextStart) {
          rangesArr[i] = later.NEVER;
        } else {
          rangesArr[i] = [ nextStart, schedArr[i].end(dir, nextStart) ];
        }
      }
    }
    function updateRangeStarts(dir, schedArr, rangesArr, startDate) {
      var compare = compareFn(dir);
      for (var i = 0, len = schedArr.length; i < len; i++) {
        if (rangesArr[i] && !compare(rangesArr[i][0], startDate)) {
          var nextStart = schedArr[i].start(dir, startDate);
          if (!nextStart) {
            rangesArr[i] = later.NEVER;
          } else {
            rangesArr[i] = [ nextStart, schedArr[i].end(dir, nextStart) ];
          }
        }
      }
    }
    function tickStarts(dir, schedArr, startsArr, startDate) {
      for (var i = 0, len = schedArr.length; i < len; i++) {
        if (startsArr[i] && startsArr[i].getTime() === startDate.getTime()) {
          startsArr[i] = schedArr[i].start(dir, schedArr[i].tick(dir, startDate));
        }
      }
    }
    function getStart(schedArr, startsArr, startDate, minEndDate) {
      var result;
      for (var i = 0, len = startsArr.length; i < len; i++) {
        if (startsArr[i] && startsArr[i].getTime() === startDate.getTime()) {
          var start = schedArr[i].tickStart(startDate);
          if (minEndDate && start < minEndDate) {
            return minEndDate;
          }
          if (!result || start > result) {
            result = start;
          }
        }
      }
      return result;
    }
    function calcRangeOverlap(dir, rangesArr, startDate) {
      var compare = compareFn(dir), result;
      for (var i = 0, len = rangesArr.length; i < len; i++) {
        var range = rangesArr[i];
        if (range && !compare(range[0], startDate) && (!range[1] || compare(range[1], startDate))) {
          if (!result || compare(range[1], result)) {
            result = range[1];
          }
        }
      }
      return result;
    }
    function calcMaxEndDate(exceptsArr, compare) {
      var result;
      for (var i = 0, len = exceptsArr.length; i < len; i++) {
        if (exceptsArr[i] && (!result || compare(result, exceptsArr[i][0]))) {
          result = exceptsArr[i][0];
        }
      }
      return result;
    }
    function calcEnd(dir, schedArr, startsArr, startDate, maxEndDate) {
      var compare = compareFn(dir), result;
      for (var i = 0, len = schedArr.length; i < len; i++) {
        var start = startsArr[i];
        if (start && start.getTime() === startDate.getTime()) {
          var end = schedArr[i].end(dir, start);
          if (maxEndDate && (!end || compare(end, maxEndDate))) {
            return maxEndDate;
          }
          if (!result || compare(end, result)) {
            result = end;
          }
        }
      }
      return result;
    }
    function compareFn(dir) {
      return dir === "next" ? function(a, b) {
        return !b || a.getTime() > b.getTime();
      } : function(a, b) {
        return !a || b.getTime() > a.getTime();
      };
    }
    function findNext(arr, compare) {
      var next = arr[0];
      for (var i = 1, len = arr.length; i < len; i++) {
        if (arr[i] && compare(next, arr[i])) {
          next = arr[i];
        }
      }
      return next;
    }
    return {
      isValid: function(d) {
        return getInstances("next", 1, d, d) !== later.NEVER;
      },
      next: function(count, startDate, endDate) {
        return getInstances("next", count || 1, startDate, endDate);
      },
      prev: function(count, startDate, endDate) {
        return getInstances("prev", count || 1, startDate, endDate);
      },
      nextRange: function(count, startDate, endDate) {
        return getInstances("next", count || 1, startDate, endDate, true);
      },
      prevRange: function(count, startDate, endDate) {
        return getInstances("prev", count || 1, startDate, endDate, true);
      }
    };
  };
  later.setTimeout = function(fn, sched) {
    var s = later.schedule(sched), t;
    if (fn) {
      scheduleTimeout();
    }
    function scheduleTimeout() {
      var now = Date.now(), next = s.next(2, now);
      if (!next[0]) {
        t = undefined;
        return;
      }
      var diff = next[0].getTime() - now;
      if (diff < 1e3) {
        diff = next[1] ? next[1].getTime() - now : 1e3;
      }
      if (diff < 2147483647) {
        t = setTimeout(fn, diff);
      } else {
        t = setTimeout(scheduleTimeout, 2147483647);
      }
    }
    return {
      isDone: function() {
        return !t;
      },
      clear: function() {
        clearTimeout(t);
      }
    };
  };
  later.setInterval = function(fn, sched) {
    if (!fn) {
      return;
    }
    var t = later.setTimeout(scheduleTimeout, sched), done = t.isDone();
    function scheduleTimeout() {
      if (!done) {
        fn();
        t = later.setTimeout(scheduleTimeout, sched);
      }
    }
    return {
      isDone: function() {
        return t.isDone();
      },
      clear: function() {
        done = true;
        t.clear();
      }
    };
  };
  later.date = {};
  later.date.timezone = function(useLocalTime) {
    later.date.build = useLocalTime ? function(Y, M, D, h, m, s) {
      return new Date(Y, M, D, h, m, s);
    } : function(Y, M, D, h, m, s) {
      return new Date(Date.UTC(Y, M, D, h, m, s));
    };
    var get = useLocalTime ? "get" : "getUTC", d = Date.prototype;
    later.date.getYear = d[get + "FullYear"];
    later.date.getMonth = d[get + "Month"];
    later.date.getDate = d[get + "Date"];
    later.date.getDay = d[get + "Day"];
    later.date.getHour = d[get + "Hours"];
    later.date.getMin = d[get + "Minutes"];
    later.date.getSec = d[get + "Seconds"];
    later.date.isUTC = !useLocalTime;
  };
  later.date.UTC = function() {
    later.date.timezone(false);
  };
  later.date.localTime = function() {
    later.date.timezone(true);
  };
  later.date.UTC();
  later.SEC = 1e3;
  later.MIN = later.SEC * 60;
  later.HOUR = later.MIN * 60;
  later.DAY = later.HOUR * 24;
  later.WEEK = later.DAY * 7;
  later.DAYS_IN_MONTH = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  later.NEVER = 0;
  later.date.next = function(Y, M, D, h, m, s) {
    return later.date.build(Y, M !== undefined ? M - 1 : 0, D !== undefined ? D : 1, h || 0, m || 0, s || 0);
  };
  later.date.nextRollover = function(d, val, constraint, period) {
    var cur = constraint.val(d), max = constraint.extent(d)[1];
    return (val || max) <= cur || val > max ? new Date(period.end(d).getTime() + later.SEC) : period.start(d);
  };
  later.date.prev = function(Y, M, D, h, m, s) {
    var len = arguments.length;
    M = len < 2 ? 11 : M - 1;
    D = len < 3 ? later.D.extent(later.date.next(Y, M + 1))[1] : D;
    h = len < 4 ? 23 : h;
    m = len < 5 ? 59 : m;
    s = len < 6 ? 59 : s;
    return later.date.build(Y, M, D, h, m, s);
  };
  later.date.prevRollover = function(d, val, constraint, period) {
    var cur = constraint.val(d);
    return val >= cur || !val ? period.start(period.prev(d, period.val(d) - 1)) : period.start(d);
  };
  later.parse = {};
  later.parse.cron = function(expr, hasSeconds) {
    var NAMES = {
      JAN: 1,
      FEB: 2,
      MAR: 3,
      APR: 4,
      MAY: 5,
      JUN: 6,
      JUL: 7,
      AUG: 8,
      SEP: 9,
      OCT: 10,
      NOV: 11,
      DEC: 12,
      SUN: 1,
      MON: 2,
      TUE: 3,
      WED: 4,
      THU: 5,
      FRI: 6,
      SAT: 7
    };
    var REPLACEMENTS = {
      "* * * * * *": "0/1 * * * * *",
      "@YEARLY": "0 0 1 1 *",
      "@ANNUALLY": "0 0 1 1 *",
      "@MONTHLY": "0 0 1 * *",
      "@WEEKLY": "0 0 * * 0",
      "@DAILY": "0 0 * * *",
      "@HOURLY": "0 * * * *"
    };
    var FIELDS = {
      s: [ 0, 0, 59 ],
      m: [ 1, 0, 59 ],
      h: [ 2, 0, 23 ],
      D: [ 3, 1, 31 ],
      M: [ 4, 1, 12 ],
      Y: [ 6, 1970, 2099 ],
      d: [ 5, 1, 7, 1 ]
    };
    function getValue(value, offset, max) {
      return isNaN(value) ? NAMES[value] || null : Math.min(+value + (offset || 0), max || 9999);
    }
    function cloneSchedule(sched) {
      var clone = {}, field;
      for (field in sched) {
        if (field !== "dc" && field !== "d") {
          clone[field] = sched[field].slice(0);
        }
      }
      return clone;
    }
    function add(sched, name, min, max, inc) {
      var i = min;
      if (!sched[name]) {
        sched[name] = [];
      }
      while (i <= max) {
        if (sched[name].indexOf(i) < 0) {
          sched[name].push(i);
        }
        i += inc || 1;
      }
      sched[name].sort(function(a, b) {
        return a - b;
      });
    }
    function addHash(schedules, curSched, value, hash) {
      if (curSched.d && !curSched.dc || curSched.dc && curSched.dc.indexOf(hash) < 0) {
        schedules.push(cloneSchedule(curSched));
        curSched = schedules[schedules.length - 1];
      }
      add(curSched, "d", value, value);
      add(curSched, "dc", hash, hash);
    }
    function addWeekday(s, curSched, value) {
      var except1 = {}, except2 = {};
      if (value === 1) {
        add(curSched, "D", 1, 3);
        add(curSched, "d", NAMES.MON, NAMES.FRI);
        add(except1, "D", 2, 2);
        add(except1, "d", NAMES.TUE, NAMES.FRI);
        add(except2, "D", 3, 3);
        add(except2, "d", NAMES.TUE, NAMES.FRI);
      } else {
        add(curSched, "D", value - 1, value + 1);
        add(curSched, "d", NAMES.MON, NAMES.FRI);
        add(except1, "D", value - 1, value - 1);
        add(except1, "d", NAMES.MON, NAMES.THU);
        add(except2, "D", value + 1, value + 1);
        add(except2, "d", NAMES.TUE, NAMES.FRI);
      }
      s.exceptions.push(except1);
      s.exceptions.push(except2);
    }
    function addRange(item, curSched, name, min, max, offset) {
      var incSplit = item.split("/"), inc = +incSplit[1], range = incSplit[0];
      if (range !== "*" && range !== "0") {
        var rangeSplit = range.split("-");
        min = getValue(rangeSplit[0], offset, max);
        max = getValue(rangeSplit[1], offset, max) || max;
      }
      add(curSched, name, min, max, inc);
    }
    function parse(item, s, name, min, max, offset) {
      var value, split, schedules = s.schedules, curSched = schedules[schedules.length - 1];
      if (item === "L") {
        item = min - 1;
      }
      if ((value = getValue(item, offset, max)) !== null) {
        add(curSched, name, value, value);
      } else if ((value = getValue(item.replace("W", ""), offset, max)) !== null) {
        addWeekday(s, curSched, value);
      } else if ((value = getValue(item.replace("L", ""), offset, max)) !== null) {
        addHash(schedules, curSched, value, min - 1);
      } else if ((split = item.split("#")).length === 2) {
        value = getValue(split[0], offset, max);
        addHash(schedules, curSched, value, getValue(split[1]));
      } else {
        addRange(item, curSched, name, min, max, offset);
      }
    }
    function isHash(item) {
      return item.indexOf("#") > -1 || item.indexOf("L") > 0;
    }
    function itemSorter(a, b) {
      return isHash(a) && !isHash(b) ? 1 : a - b;
    }
    function parseExpr(expr) {
      var schedule = {
        schedules: [ {} ],
        exceptions: []
      }, components = expr.replace(/(\s)+/g, " ").split(" "), field, f, component, items;
      for (field in FIELDS) {
        f = FIELDS[field];
        component = components[f[0]];
        if (component && component !== "*" && component !== "?") {
          items = component.split(",").sort(itemSorter);
          var i, length = items.length;
          for (i = 0; i < length; i++) {
            parse(items[i], schedule, field, f[1], f[2], f[3]);
          }
        }
      }
      return schedule;
    }
    function prepareExpr(expr) {
      var prepared = expr.toUpperCase();
      return REPLACEMENTS[prepared] || prepared;
    }
    var e = prepareExpr(expr);
    return parseExpr(hasSeconds ? e : "0 " + e);
  };
  later.parse.recur = function() {
    var schedules = [], exceptions = [], cur, curArr = schedules, curName, values, every, modifier, applyMin, applyMax, i, last;
    function add(name, min, max) {
      name = modifier ? name + "_" + modifier : name;
      if (!cur) {
        curArr.push({});
        cur = curArr[0];
      }
      if (!cur[name]) {
        cur[name] = [];
      }
      curName = cur[name];
      if (every) {
        values = [];
        for (i = min; i <= max; i += every) {
          values.push(i);
        }
        last = {
          n: name,
          x: every,
          c: curName.length,
          m: max
        };
      }
      values = applyMin ? [ min ] : applyMax ? [ max ] : values;
      var length = values.length;
      for (i = 0; i < length; i += 1) {
        var val = values[i];
        if (curName.indexOf(val) < 0) {
          curName.push(val);
        }
      }
      values = every = modifier = applyMin = applyMax = 0;
    }
    return {
      schedules: schedules,
      exceptions: exceptions,
      on: function() {
        values = arguments[0] instanceof Array ? arguments[0] : arguments;
        return this;
      },
      every: function(x) {
        every = x || 1;
        return this;
      },
      after: function(x) {
        modifier = "a";
        values = [ x ];
        return this;
      },
      before: function(x) {
        modifier = "b";
        values = [ x ];
        return this;
      },
      first: function() {
        applyMin = 1;
        return this;
      },
      last: function() {
        applyMax = 1;
        return this;
      },
      time: function() {
        for (var i = 0, len = values.length; i < len; i++) {
          var split = values[i].split(":");
          if (split.length < 3) split.push(0);
          values[i] = +split[0] * 3600 + +split[1] * 60 + +split[2];
        }
        add("t");
        return this;
      },
      second: function() {
        add("s", 0, 59);
        return this;
      },
      minute: function() {
        add("m", 0, 59);
        return this;
      },
      hour: function() {
        add("h", 0, 23);
        return this;
      },
      dayOfMonth: function() {
        add("D", 1, applyMax ? 0 : 31);
        return this;
      },
      dayOfWeek: function() {
        add("d", 1, 7);
        return this;
      },
      onWeekend: function() {
        values = [ 1, 7 ];
        return this.dayOfWeek();
      },
      onWeekday: function() {
        values = [ 2, 3, 4, 5, 6 ];
        return this.dayOfWeek();
      },
      dayOfWeekCount: function() {
        add("dc", 1, applyMax ? 0 : 5);
        return this;
      },
      dayOfYear: function() {
        add("dy", 1, applyMax ? 0 : 366);
        return this;
      },
      weekOfMonth: function() {
        add("wm", 1, applyMax ? 0 : 5);
        return this;
      },
      weekOfYear: function() {
        add("wy", 1, applyMax ? 0 : 53);
        return this;
      },
      month: function() {
        add("M", 1, 12);
        return this;
      },
      year: function() {
        add("Y", 1970, 2450);
        return this;
      },
      fullDate: function() {
        for (var i = 0, len = values.length; i < len; i++) {
          values[i] = values[i].getTime();
        }
        add("fd");
        return this;
      },
      customModifier: function(id, vals) {
        var custom = later.modifier[id];
        if (!custom) throw new Error("Custom modifier " + id + " not recognized!");
        modifier = id;
        values = arguments[1] instanceof Array ? arguments[1] : [ arguments[1] ];
        return this;
      },
      customPeriod: function(id) {
        var custom = later[id];
        if (!custom) throw new Error("Custom time period " + id + " not recognized!");
        add(id, custom.extent(new Date())[0], custom.extent(new Date())[1]);
        return this;
      },
      startingOn: function(start) {
        return this.between(start, last.m);
      },
      between: function(start, end) {
        cur[last.n] = cur[last.n].splice(0, last.c);
        every = last.x;
        add(last.n, start, end);
        return this;
      },
      and: function() {
        cur = curArr[curArr.push({}) - 1];
        return this;
      },
      except: function() {
        curArr = exceptions;
        cur = null;
        return this;
      }
    };
  };
  later.parse.text = function(str) {
    var recur = later.parse.recur, pos = 0, input = "", error;
    var TOKENTYPES = {
      eof: /^$/,
      rank: /^((\d\d\d\d)|([2-5]?1(st)?|[2-5]?2(nd)?|[2-5]?3(rd)?|(0|[1-5]?[4-9]|[1-5]0|1[1-3])(th)?))\b/,
      time: /^((([0]?[1-9]|1[0-2]):[0-5]\d(\s)?(am|pm))|(([0]?\d|1\d|2[0-3]):[0-5]\d))\b/,
      dayName: /^((sun|mon|tue(s)?|wed(nes)?|thu(r(s)?)?|fri|sat(ur)?)(day)?)\b/,
      monthName: /^(jan(uary)?|feb(ruary)?|ma((r(ch)?)?|y)|apr(il)?|ju(ly|ne)|aug(ust)?|oct(ober)?|(sept|nov|dec)(ember)?)\b/,
      yearIndex: /^(\d\d\d\d)\b/,
      every: /^every\b/,
      after: /^after\b/,
      before: /^before\b/,
      second: /^(s|sec(ond)?(s)?)\b/,
      minute: /^(m|min(ute)?(s)?)\b/,
      hour: /^(h|hour(s)?)\b/,
      day: /^(day(s)?( of the month)?)\b/,
      dayInstance: /^day instance\b/,
      dayOfWeek: /^day(s)? of the week\b/,
      dayOfYear: /^day(s)? of the year\b/,
      weekOfYear: /^week(s)?( of the year)?\b/,
      weekOfMonth: /^week(s)? of the month\b/,
      weekday: /^weekday\b/,
      weekend: /^weekend\b/,
      month: /^month(s)?\b/,
      year: /^year(s)?\b/,
      between: /^between (the)?\b/,
      start: /^(start(ing)? (at|on( the)?)?)\b/,
      at: /^(at|@)\b/,
      and: /^(,|and\b)/,
      except: /^(except\b)/,
      also: /(also)\b/,
      first: /^(first)\b/,
      last: /^last\b/,
      "in": /^in\b/,
      of: /^of\b/,
      onthe: /^on the\b/,
      on: /^on\b/,
      through: /(-|^(to|through)\b)/
    };
    var NAMES = {
      jan: 1,
      feb: 2,
      mar: 3,
      apr: 4,
      may: 5,
      jun: 6,
      jul: 7,
      aug: 8,
      sep: 9,
      oct: 10,
      nov: 11,
      dec: 12,
      sun: 1,
      mon: 2,
      tue: 3,
      wed: 4,
      thu: 5,
      fri: 6,
      sat: 7,
      "1st": 1,
      fir: 1,
      "2nd": 2,
      sec: 2,
      "3rd": 3,
      thi: 3,
      "4th": 4,
      "for": 4
    };
    function t(start, end, text, type) {
      return {
        startPos: start,
        endPos: end,
        text: text,
        type: type
      };
    }
    function peek(expected) {
      var scanTokens = expected instanceof Array ? expected : [ expected ], whiteSpace = /\s+/, token, curInput, m, scanToken, start, len;
      scanTokens.push(whiteSpace);
      start = pos;
      while (!token || token.type === whiteSpace) {
        len = -1;
        curInput = input.substring(start);
        token = t(start, start, input.split(whiteSpace)[0]);
        var i, length = scanTokens.length;
        for (i = 0; i < length; i++) {
          scanToken = scanTokens[i];
          m = scanToken.exec(curInput);
          if (m && m.index === 0 && m[0].length > len) {
            len = m[0].length;
            token = t(start, start + len, curInput.substring(0, len), scanToken);
          }
        }
        if (token.type === whiteSpace) {
          start = token.endPos;
        }
      }
      return token;
    }
    function scan(expectedToken) {
      var token = peek(expectedToken);
      pos = token.endPos;
      return token;
    }
    function parseThroughExpr(tokenType) {
      var start = +parseTokenValue(tokenType), end = checkAndParse(TOKENTYPES.through) ? +parseTokenValue(tokenType) : start, nums = [];
      for (var i = start; i <= end; i++) {
        nums.push(i);
      }
      return nums;
    }
    function parseRanges(tokenType) {
      var nums = parseThroughExpr(tokenType);
      while (checkAndParse(TOKENTYPES.and)) {
        nums = nums.concat(parseThroughExpr(tokenType));
      }
      return nums;
    }
    function parseEvery(r) {
      var num, period, start, end;
      if (checkAndParse(TOKENTYPES.weekend)) {
        r.on(NAMES.sun, NAMES.sat).dayOfWeek();
      } else if (checkAndParse(TOKENTYPES.weekday)) {
        r.on(NAMES.mon, NAMES.tue, NAMES.wed, NAMES.thu, NAMES.fri).dayOfWeek();
      } else {
        num = parseTokenValue(TOKENTYPES.rank);
        r.every(num);
        period = parseTimePeriod(r);
        if (checkAndParse(TOKENTYPES.start)) {
          num = parseTokenValue(TOKENTYPES.rank);
          r.startingOn(num);
          parseToken(period.type);
        } else if (checkAndParse(TOKENTYPES.between)) {
          start = parseTokenValue(TOKENTYPES.rank);
          if (checkAndParse(TOKENTYPES.and)) {
            end = parseTokenValue(TOKENTYPES.rank);
            r.between(start, end);
          }
        }
      }
    }
    function parseOnThe(r) {
      if (checkAndParse(TOKENTYPES.first)) {
        r.first();
      } else if (checkAndParse(TOKENTYPES.last)) {
        r.last();
      } else {
        r.on(parseRanges(TOKENTYPES.rank));
      }
      parseTimePeriod(r);
    }
    function parseScheduleExpr(str) {
      pos = 0;
      input = str;
      error = -1;
      var r = recur();
      while (pos < input.length && error < 0) {
        var token = parseToken([ TOKENTYPES.every, TOKENTYPES.after, TOKENTYPES.before, TOKENTYPES.onthe, TOKENTYPES.on, TOKENTYPES.of, TOKENTYPES["in"], TOKENTYPES.at, TOKENTYPES.and, TOKENTYPES.except, TOKENTYPES.also ]);
        switch (token.type) {
         case TOKENTYPES.every:
          parseEvery(r);
          break;

         case TOKENTYPES.after:
          if (peek(TOKENTYPES.time).type !== undefined) {
            r.after(parseTokenValue(TOKENTYPES.time));
            r.time();
          } else {
            r.after(parseTokenValue(TOKENTYPES.rank));
            parseTimePeriod(r);
          }
          break;

         case TOKENTYPES.before:
          if (peek(TOKENTYPES.time).type !== undefined) {
            r.before(parseTokenValue(TOKENTYPES.time));
            r.time();
          } else {
            r.before(parseTokenValue(TOKENTYPES.rank));
            parseTimePeriod(r);
          }
          break;

         case TOKENTYPES.onthe:
          parseOnThe(r);
          break;

         case TOKENTYPES.on:
          r.on(parseRanges(TOKENTYPES.dayName)).dayOfWeek();
          break;

         case TOKENTYPES.of:
          r.on(parseRanges(TOKENTYPES.monthName)).month();
          break;

         case TOKENTYPES["in"]:
          r.on(parseRanges(TOKENTYPES.yearIndex)).year();
          break;

         case TOKENTYPES.at:
          r.on(parseTokenValue(TOKENTYPES.time)).time();
          while (checkAndParse(TOKENTYPES.and)) {
            r.on(parseTokenValue(TOKENTYPES.time)).time();
          }
          break;

         case TOKENTYPES.and:
          break;

         case TOKENTYPES.also:
          r.and();
          break;

         case TOKENTYPES.except:
          r.except();
          break;

         default:
          error = pos;
        }
      }
      return {
        schedules: r.schedules,
        exceptions: r.exceptions,
        error: error
      };
    }
    function parseTimePeriod(r) {
      var timePeriod = parseToken([ TOKENTYPES.second, TOKENTYPES.minute, TOKENTYPES.hour, TOKENTYPES.dayOfYear, TOKENTYPES.dayOfWeek, TOKENTYPES.dayInstance, TOKENTYPES.day, TOKENTYPES.month, TOKENTYPES.year, TOKENTYPES.weekOfMonth, TOKENTYPES.weekOfYear ]);
      switch (timePeriod.type) {
       case TOKENTYPES.second:
        r.second();
        break;

       case TOKENTYPES.minute:
        r.minute();
        break;

       case TOKENTYPES.hour:
        r.hour();
        break;

       case TOKENTYPES.dayOfYear:
        r.dayOfYear();
        break;

       case TOKENTYPES.dayOfWeek:
        r.dayOfWeek();
        break;

       case TOKENTYPES.dayInstance:
        r.dayOfWeekCount();
        break;

       case TOKENTYPES.day:
        r.dayOfMonth();
        break;

       case TOKENTYPES.weekOfMonth:
        r.weekOfMonth();
        break;

       case TOKENTYPES.weekOfYear:
        r.weekOfYear();
        break;

       case TOKENTYPES.month:
        r.month();
        break;

       case TOKENTYPES.year:
        r.year();
        break;

       default:
        error = pos;
      }
      return timePeriod;
    }
    function checkAndParse(tokenType) {
      var found = peek(tokenType).type === tokenType;
      if (found) {
        scan(tokenType);
      }
      return found;
    }
    function parseToken(tokenType) {
      var t = scan(tokenType);
      if (t.type) {
        t.text = convertString(t.text, tokenType);
      } else {
        error = pos;
      }
      return t;
    }
    function parseTokenValue(tokenType) {
      return parseToken(tokenType).text;
    }
    function convertString(str, tokenType) {
      var output = str;
      switch (tokenType) {
       case TOKENTYPES.time:
        var parts = str.split(/(:|am|pm)/), hour = parts[3] === "pm" && parts[0] < 12 ? parseInt(parts[0], 10) + 12 : parts[0], min = parts[2].trim();
        output = (hour.length === 1 ? "0" : "") + hour + ":" + min;
        break;

       case TOKENTYPES.rank:
        output = parseInt(/^\d+/.exec(str)[0], 10);
        break;

       case TOKENTYPES.monthName:
       case TOKENTYPES.dayName:
        output = NAMES[str.substring(0, 3)];
        break;
      }
      return output;
    }
    return parseScheduleExpr(str.toLowerCase());
  };
  return later;
}();

/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d2c8":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("aae3");
var defined = __webpack_require__("be13");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "ddd8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormTransition_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3053");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormTransition_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormTransition_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormTransition_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "eef6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FieldDatePicker_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("365d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FieldDatePicker_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FieldDatePicker_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FieldDatePicker_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f63b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b0f1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fae3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
var setPublicPath = __webpack_require__("1eb2");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/forms/OrderFormSender.vue?vue&type=template&id=2cd444f5&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{attrs:{"method":"post"},on:{"submit":_vm.confirm}},[_c('FormGroup',{attrs:{"label":"Your Contact Details","top":""}},[_c('Field',{staticClass:"col-md-4",attrs:{"label":"Name","autocomplete":"name","rules":"text,required"},model:{value:(_vm.x_snd_name),callback:function ($$v) {_vm.x_snd_name=$$v},expression:"x_snd_name"}}),_c('Field',{staticClass:"col-md-4",attrs:{"label":"Email","autocomplete":"email","rules":"email,required"},model:{value:(_vm.x_snd_email),callback:function ($$v) {_vm.x_snd_email=$$v},expression:"x_snd_email"}}),_c('Field',{staticClass:"col-md-4",attrs:{"label":"Phone","autocomplete":"work phone","rules":"tel","helpMsg":"in case of order issues"},model:{value:(_vm.x_snd_phone),callback:function ($$v) {_vm.x_snd_phone=$$v},expression:"x_snd_phone"}})],1),_c('FormGroup',{attrs:{"label":"Personalised Card"}},[_c('Field',{staticClass:"col-md-6",attrs:{"label":"A Posy For","name":"x_to"},model:{value:(_vm.x_to),callback:function ($$v) {_vm.x_to=$$v},expression:"x_to"}}),_c('Field',{staticClass:"col-md-6",attrs:{"label":"From","name":"x_from"},model:{value:(_vm.x_from),callback:function ($$v) {_vm.x_from=$$v},expression:"x_from"}}),_c('Field',{staticClass:"clearfix col-md-12",attrs:{"label":"Message","name":"x_message","rules":"textarea","helpMsg":"maximum 200 characters"},model:{value:(_vm.x_message),callback:function ($$v) {_vm.x_message=$$v},expression:"x_message"}}),_c('Field',{staticClass:"col-md-12",attrs:{"label":"Help me choose a message","helpMsg":"keep clicking until you find one","value":"","options":['Birthday','Anniversary','Thanks','Congrats','Sorry','Random'],"rules":"enum"},on:{"input":_vm.getCardMessage}})],1),_c('FormGroup',[(_vm.confirmValidationMsg)?_c('div',{staticClass:"has-error col-md-12"},[_c('p',{staticClass:"help-block text-right mt8 mb16"},[_vm._v(_vm._s(_vm.confirmValidationMsg))])]):_vm._e(),_c('div',{staticClass:"col-md-12"},[_c('a',{staticClass:"btn btn-default mb32",attrs:{"href":"/shop/cart"}},[_c('span',{staticClass:"fa fa-long-arrow-left"}),_vm._v(" Return to Cart")]),_c('button',{staticClass:"btn btn-default btn-primary pull-right mb32 ",attrs:{"href":"/shop/checkout"}},[_vm._v("Confirm "),_c('span',{staticClass:"fa fa-long-arrow-right"})])])])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/forms/OrderFormSender.vue?vue&type=template&id=2cd444f5&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layout/FormGroup.vue?vue&type=template&id=3c91b5be&
var FormGroupvue_type_template_id_3c91b5be_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"clearfix"},[_c('h3',{class:[ 'page-header', 'col-md-12', { mt16: _vm.top }]},[_vm._v("\n      "+_vm._s(_vm.label)+"\n  ")]),_vm._t("default")],2)}
var FormGroupvue_type_template_id_3c91b5be_staticRenderFns = []


// CONCATENATED MODULE: ./src/layout/FormGroup.vue?vue&type=template&id=3c91b5be&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/layout/FormGroup.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var FormGroupvue_type_script_lang_js_ = ({
  props: {
    label: {
      type: String
    },
    top: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {};
  }
});
// CONCATENATED MODULE: ./src/layout/FormGroup.vue?vue&type=script&lang=js&
 /* harmony default export */ var layout_FormGroupvue_type_script_lang_js_ = (FormGroupvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/layout/FormGroup.vue?vue&type=style&index=0&lang=css&
var FormGroupvue_type_style_index_0_lang_css_ = __webpack_require__("f63b");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/layout/FormGroup.vue






/* normalize component */

var component = normalizeComponent(
  layout_FormGroupvue_type_script_lang_js_,
  FormGroupvue_type_template_id_3c91b5be_render,
  FormGroupvue_type_template_id_3c91b5be_staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "FormGroup.vue"
/* harmony default export */ var FormGroup = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Field.vue?vue&type=template&id=1b8870d2&
var Fieldvue_type_template_id_1b8870d2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.localClasses},[(_vm.localLabel)?_c('label',{staticClass:"control-label",attrs:{"for":_vm.id}},[_vm._v("\n    "+_vm._s(_vm.localLabel)+"\n    "),(_vm.helpMsg && !_vm.isFieldCheckbox)?_c('small',{staticClass:"text-muted"},[_vm._v("("+_vm._s(_vm.helpMsg)+")")]):_vm._e()]):_vm._e(),(_vm.isFieldCheckbox)?_c('div',{staticClass:"checkbox"},[_c('label',[_c('FieldCheckbox',{attrs:{"name":_vm.localName,"id":_vm.id,"value":_vm.value,"disabled":_vm.disabled},on:{"input":_vm.handleInput}}),_vm._v("\n      "+_vm._s(_vm.helpMsg)+"\n    ")],1)]):_vm._e(),(_vm.isFieldTextArea)?_c('FieldTextArea',{attrs:{"name":_vm.localName,"id":_vm.id,"autocomplete":_vm.autocomplete,"placeholder":_vm.placeholder,"value":_vm.value},on:{"input":_vm.handleInput}}):_vm._e(),(_vm.isFieldInput)?_c('FieldInput',{attrs:{"name":_vm.localName,"id":_vm.id,"autocomplete":_vm.autocomplete,"placeholder":_vm.placeholder,"type":_vm.type,"value":_vm.value},on:{"input":_vm.handleInput}}):_vm._e(),(_vm.isFieldDatePicker)?_c('FieldDatePicker',{attrs:{"name":_vm.localName,"id":_vm.id,"autocomplete":_vm.autocomplete,"placeholder":_vm.placeholder,"type":_vm.type,"value":_vm.value},on:{"input":_vm.handleInput}}):_vm._e(),(_vm.isFieldRadio)?_c('FieldRadio',{attrs:{"name":_vm.localName,"id":_vm.id,"autocomplete":_vm.autocomplete,"options":_vm.options,"type":_vm.type,"value":_vm.value},on:{"input":_vm.handleInput}}):_vm._e(),(_vm.isFieldInteger)?_c('FieldInteger',{attrs:{"name":_vm.localName,"id":_vm.id,"autocomplete":_vm.autocomplete,"value":_vm.value,"min":_vm.min,"max":_vm.max},on:{"input":_vm.handleInput}}):_vm._e(),(_vm.isFieldAddress)?_c('FieldAddress',{attrs:{"name":_vm.localName,"placeholder":_vm.placeholder,"value":_vm.value},on:{"input":_vm.handleInput,"address-changed":_vm.handleAddressChanged}}):_vm._e(),(_vm.validationMsg)?_c('small',{staticClass:"help-block"},[_vm._v("\n    "+_vm._s(_vm.validationMsg)+"\n  ")]):_vm._e()],1)}
var Fieldvue_type_template_id_1b8870d2_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Field.vue?vue&type=template&id=1b8870d2&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("2fdb");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// CONCATENATED MODULE: ./src/helpers/property.js
// Based of Underscore 1.9.1
// Creates a function that, when passed an object, will traverse that object’s
// properties down the given `path`, specified as an array of keys or indexes.
/* harmony default export */ var property = (function (path) {
  if (toString.call(path) != '[object Array]') {
    return shallowProperty(path);
  }

  return function (obj) {
    return deepGet(obj, path);
  };
});

function shallowProperty(key) {
  return function (obj) {
    return obj == null ? void 0 : obj[key];
  };
}

function deepGet(obj, path) {
  var length = path.length;

  for (var i = 0; i < length; i++) {
    if (obj == null) return void 0;
    obj = obj[path[i]];
  }

  return length ? obj : void 0;
}
// EXTERNAL MODULE: ./src/helpers/later.js
var later = __webpack_require__("77f3");
var later_default = /*#__PURE__*/__webpack_require__.n(later);

// CONCATENATED MODULE: ./src/helpers/deliveryDays.js
/* global moment */
 // Note: To change Order Close hour on a particular special day
// 1. Add the day to the daily schedules structure below with the later closing time
// 2. Add the day to the isAfter1PM() function setting the new closing time
// Note: To restrict sale of specific variant on a particular special day
// 1. Edit validate.js and modify the restrict() validation function

var daily = {
  schedules: [{
    d: [2, 3, 4, 5, 6, 7],
    h: [13],
    m: [0]
  }, // Weekdays: Mon, Tue, Wed, Thu, Fri, Sat at 1pm
  {
    D: [14],
    M: [2],
    h: [15],
    m: [0]
  }, // Valentines Day: 14th of February at ** 3pm **
  {
    dc: [2],
    d: [1],
    M: [5],
    h: [13],
    m: [0]
  }, // Mothers Day: 2nd Sunday of May at 1pm
  {
    D: [23],
    M: [12],
    Y: [2018],
    h: [13],
    m: [0]
  }],
  exceptions: [{
    D: [25],
    M: [12],
    h: [13],
    m: [0]
  }, // Christmas Day: 25th of December at 1pm
  {
    D: [26],
    M: [12],
    h: [13],
    m: [0]
  }, // Boxing Day: 26th of December at 1pm
  // { D: [27,28,29,30,31], M: [12], h: [13], m: [0] },         // Post Xmas Break: 27-31 Dec
  {
    D: [1],
    M: [1],
    h: [13],
    m: [0]
  }, // New Years Day: 1st of January at 1pm
  {
    D: [2],
    M: [1],
    h: [13],
    m: [0]
  }, // Post New Years Day Break: 2nd of January at 1pm
  {
    D: [26],
    M: [1],
    h: [13],
    m: [0]
  }, // Australia: 26th of January at 1pm
  // { D: [28], M: [1], Y: [2019], h: [13], m: [0] },    // Australia Day Monday Holiday
  {
    D: [25],
    M: [4],
    h: [13],
    m: [0]
  }, // Anzac Day: 25th of April at 1pm
  {
    dc: [2],
    d: [2],
    M: [6],
    h: [13],
    m: [0]
  }, // Queens Birthday: 2nd Monday of June at 1pm
  {
    dc: [1],
    d: [2],
    M: [10],
    h: [13],
    m: [0]
  }, // NSW Labour Day: 1st Monday of October at 1pm
  // Easter Friday and Monday for the next 10 years
  {
    D: [19, 22],
    M: [4],
    Y: [2019],
    h: [13],
    m: [0]
  }, {
    D: [10, 13],
    M: [4],
    Y: [2020],
    h: [13],
    m: [0]
  }, {
    D: [2, 5],
    M: [4],
    Y: [2021],
    h: [13],
    m: [0]
  }, {
    D: [15, 18],
    M: [4],
    Y: [2022],
    h: [13],
    m: [0]
  }, {
    D: [7, 10],
    M: [4],
    Y: [2023],
    h: [13],
    m: [0]
  }, {
    D: [29],
    M: [3],
    Y: [2024],
    h: [13],
    m: [0]
  }, {
    D: [1],
    M: [4],
    Y: [2024],
    h: [13],
    m: [0]
  }, {
    D: [18, 21],
    M: [4],
    Y: [2025],
    h: [13],
    m: [0]
  }, {
    D: [3, 6],
    M: [4],
    Y: [2026],
    h: [13],
    m: [0]
  }, {
    D: [26, 29],
    M: [3],
    Y: [2027],
    h: [13],
    m: [0]
  }, {
    D: [14, 17],
    M: [4],
    Y: [2028],
    h: [13],
    m: [0]
  }, {
    D: [30],
    M: [3],
    Y: [2029],
    h: [13],
    m: [0]
  }, {
    D: [2],
    M: [4],
    Y: [2029],
    h: [13],
    m: [0]
  }, {
    D: [19, 22],
    M: [4],
    Y: [2030],
    h: [13],
    m: [0]
  }]
};
function nextDeliveryDays(number) {
  moment.locale();
  later_default.a.date.localTime();
  return later_default.a.schedule(daily).next(number, moment());
}
function deliveryDays(start, freq, number) {
  moment.locale();
  later_default.a.date.localTime();
  var startDate = moment(start, ['DD-MM-YYYY', 'DD-MMM-YYYY']);
  if (!startDate.isValid()) return '';
  var weekly = {
    schedules: [{
      d: [startDate.day() + 1],
      wm: [1, 2, 3, 4, 5, 6],
      h: [13],
      m: [0]
    }]
  };
  var monthly = {
    schedules: [{
      D: [Math.min(startDate.date(), 28)],
      M: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      h: [13],
      m: [0]
    }]
  };
  var availableSchedules = {
    Daily: function Daily(number, startDate) {
      return later_default.a.schedule(daily).next(number, startDate);
    },
    Weekly: function Weekly(number, startDate) {
      return later_default.a.schedule(weekly).next(number, startDate);
    },
    Fortnightly: function Fortnightly(number, startDate) {
      return later_default.a.schedule(weekly).next(number * 2, startDate).filter(function (d, i) {
        return i % 2 == 0;
      });
    },
    Monthly: function Monthly(number, startDate) {
      return later_default.a.schedule(monthly).next(number, startDate);
    }
  };
  var days = [];

  if (availableSchedules[freq]) {
    days = availableSchedules[freq](number, startDate);
    if (!Array.isArray(days)) days = [days]; // later returns a singleton instead of an array for number = 1

    days = ensureValidDays(days);
  }

  return days.map(function (d) {
    return moment(d).format('DD-MMM-YYYY');
  }).join(', ');
}

function ensureValidDays(days) {
  return days.map(function (d) {
    return ensureValidDay(d);
  });
}

function ensureValidDay(d) {
  moment.locale();
  later_default.a.date.localTime(); // if its not a valid delivery day then choose the next closest day

  var isValid = later_default.a.schedule(daily).isValid(d);
  return isValid ? d : later_default.a.schedule(daily).next(1, d);
} // only allow valid delivery days (past or future)


function getNextDeliveryDay(str) {
  return moment(ensureValidDay(parseDate(str).toDate())).format('DD-MMM-YYYY');
} // only allow valid delivery days (today or in the future)

function getNextPossibleDeliveryDay(str) {
  var d = parseDate(isBeforeToday(str) ? undefined : str).toDate();
  var v = ensureValidDay(d);
  return moment(v).format('DD-MMM-YYYY');
} // only allow valid delivery days (today or in the future)

function getNextPossibleDeliveryDayOfWeek() {
  var d = parseDate().toDate();
  var v = ensureValidDay(d);
  return moment(v).format('dddd');
}
function parseDate(str) {
  var d = moment(str, ['DD-MMM-YYYY', 'DD-MMM-YY'], true);
  if (!d.isValid()) d = moment(); // default to now if we cannot parse the date

  return d;
}
function isToday(str) {
  return parseDate(str).isSame(moment(), 'day');
}
function isBeforeToday(str) {
  return parseDate(str).second(1).isBefore(moment().hour(0).minute(0).second(0));
} // determine if its a late order eg if order delivery is for today and its after 1PM (order close)

function isAfter1PM(str) {
  var closingHour = 13; // Normal closing 1PM

  if (isToday('14-Feb-2019')) closingHour = 15; // Special closing 3PM

  return isToday(str) && moment().isAfter(moment().hour(closingHour).minute(0).second(0));
}
function isValidDeliveryDay(str) {
  return later_default.a.schedule(daily).isValid(parseDate(str).hour(13).minute(0).toDate());
}
// CONCATENATED MODULE: ./src/helpers/validate.js



var getFieldAddressTypes = property(['$children', '0', 'localValueResult', 'types']);
var getFieldAddressState = property(['$children', '0', 'localValueResult', 'state']);
var getFieldisValidatedAddress = property(['$children', '0', 'isValidatedAddress']);
var getRulesContext = property(['$props', 'rulescontext']); // Each of these functions checks the input string for a validation rule
// If there is a validation error then the function returns the error message string that is shown to the user
// If there is no validation error then the function returns undefined.

var validationRuleFunctions = {
  // <text> checks
  required: function required(s) {
    if (!s || !(s.length > 0)) return 'This field is required.';
  },
  days: function days(str) {
    if (typeof str != 'string') return 'Please enter a text value into this field.';
    var msg = str.split(',').map(function (s) {
      return s.trim();
    }).filter(function (s) {
      return !/^[0-9]{1,2}[-./][a-zA-Z0-9]{1,3}[-./][0-9]{2,4}$/.test(s);
    }).map(function (s) {
      return '"' + s + '"';
    }).join(',');
    /* istanbul ignore else */

    if (msg) return 'Please enter dates, separated by commas.' + (msg.length > 2 ? ' Need to change ' + msg : '');
  },
  date: function date(str) {
    if (!/^[0-9]{1,2}[-./][a-zA-Z0-9]{1,3}[-./][0-9]{2,4}$/.test(str)) return 'Please choose or enter a valid date.';
  },
  future: function future(str) {
    if (isBeforeToday(str)) return 'Please select a date in the future.';
  },
  before1pm: function before1pm(str) {
    if (isAfter1PM(str)) return 'Order before 1pm for same day delivery. Please choose tomorrow instead.';
  },
  delivery: function delivery(str) {
    if (!isValidDeliveryDay(str)) return "Sorry we do not deliver on the ".concat(str, ". Please choose another date.");
  },
  // <input> types
  text: function text(s) {
    if (typeof s != 'string') return 'Please enter a text value into this field.';
  },
  email: function email(s) {
    if (!/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*|)$/.test(s)) return 'Please enter a valid email address.';
  },
  tel: function tel(s) {
    if (!/^([0-9()+ *#,;/]{0,40}|)$/.test(s)) return 'Please enter a valid phone number.';
  },
  // <textarea> types
  textarea: function textarea(s) {
    if (typeof s != 'string') return 'Please enter a text value into this field.';
  },
  // <checkbox> types
  boolean: function boolean(v) {
    if (typeof v != 'boolean') return 'Please enter a true or false value into this field.';
  },
  // <radio> types
  enum: function _enum(s) {
    if (typeof s != 'string') return 'Please choose one of the options.';
  },
  // <integer> types
  integer: function integer(n) {
    if (typeof n != 'number') return 'Please enter a whole number.';
  },
  // <text> address types
  address: function address(str, vm) {
    var check = vm ? getFieldisValidatedAddress(vm) : str;
    if (!check) return 'Cannot locate address. Please retype and select from the dropdown list.';
  },
  // <text> address types
  specific: function specific(str, vm) {
    var check = vm ? getFieldAddressTypes(vm) : str;
    if (check && /^(route|neighborhood, political|locality, political|administrative_area_level_1, political|country, political)$/.test(check)) return 'Please select a specific delivery address.';
  },
  // <text> address types that incur an additional delivery fee
  extra: function extra(str, vm) {
    var check = vm ? getFieldAddressTypes(vm) : str;
    if (check && /(hospital|school|university|shopping_mall|department_store|bus_station|train_station|transit_station)/.test(check)) return 'Additional delivery charge will be added for Hospitals, Schools, Universities and Shopping Malls.';
  },
  // <text> address types that are an establishment
  establishment: function establishment(str, vm) {
    var check = vm ? getFieldAddressTypes(vm) : str;
    if (check && /(establishment)/.test(check)) return 'Establishments require a street address in Additional Delivery Info.';
  },
  // restrict the sale of certain products on certain days
  restrict: function restrict(str, vm) {
    var check = vm ? getRulesContext(vm) + str : str;
    if (check && /14-Feb/.test(str) && /Posy.*(Small|Regular)/i.test(check)) return 'This posy size is unavailable on Valentines Day. Please choose a larger size.';
    if (check && /(11-May-2019|12-May-2019)/.test(str) && /Posy.*(Small|Regular)/i.test(check)) return 'This posy size is unavailable on Mothers Day. Please choose a larger size.';
    if (check && /(18|19|20|21|22|23|24)-Dec/.test(str) && /Posy.*(Small|Regular)/i.test(check)) return 'This posy size is unavailable over Xmas. Please choose a larger size.';
  },
  // <text> address types
  nsw: function nsw(str, vm) {
    var state = vm ? getFieldAddressState(vm) : str;
    if (state && state != 'NSW') return 'Please select an address in NSW.';
  }
};
function validate(value, rules, vm) {
  function checkValueForValidationReqirements(acc, rule) {
    var trule = rule.trim();
    var msg = !validationRuleFunctions[trule] ? "Cannot find validation check \"".concat(trule, "\".") : validationRuleFunctions[trule](value, vm); //call the validationRuleFunction

    if (msg) acc.push(msg);
    return acc;
  }

  if (typeof rules != 'string') return ''; // for all the comma separated rules, reduce to a list of error messages.

  return rules.split(',').reduce(checkValueForValidationReqirements, []).join(' ');
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FieldTextArea.vue?vue&type=template&id=56fe012a&
var FieldTextAreavue_type_template_id_56fe012a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.localValue),expression:"localValue"}],staticClass:"form-control",attrs:{"rows":"3","maxLength":"200","placeholder":_vm.placeholder,"name":_vm.name,"id":_vm.id},domProps:{"value":(_vm.localValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.localValue=$event.target.value}}})}
var FieldTextAreavue_type_template_id_56fe012a_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FieldTextArea.vue?vue&type=template&id=56fe012a&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FieldTextArea.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var FieldTextAreavue_type_script_lang_js_ = ({
  data: function data() {
    return {
      localValue: this.value
    };
  },
  props: {
    value: {
      type: String
    },
    name: {
      type: String
    },
    id: {
      type: Number
    },
    placeholder: {
      type: String
    }
  },
  watch: {
    value: function value(newVal) {
      this.localValue = newVal;
    },
    localValue: function localValue(newVal) {
      this.$emit('input', newVal);
    }
  }
});
// CONCATENATED MODULE: ./src/components/FieldTextArea.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FieldTextAreavue_type_script_lang_js_ = (FieldTextAreavue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/FieldTextArea.vue





/* normalize component */

var FieldTextArea_component = normalizeComponent(
  components_FieldTextAreavue_type_script_lang_js_,
  FieldTextAreavue_type_template_id_56fe012a_render,
  FieldTextAreavue_type_template_id_56fe012a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

FieldTextArea_component.options.__file = "FieldTextArea.vue"
/* harmony default export */ var FieldTextArea = (FieldTextArea_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FieldInput.vue?vue&type=template&id=29354e54&
var FieldInputvue_type_template_id_29354e54_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return ((_vm.type)==='checkbox')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.localValue),expression:"localValue"}],staticClass:"form-control",attrs:{"placeholder":_vm.placeholder,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.localValue)?_vm._i(_vm.localValue,null)>-1:(_vm.localValue)},on:{"change":function($event){var $$a=_vm.localValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.localValue=$$a.concat([$$v]))}else{$$i>-1&&(_vm.localValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.localValue=$$c}}}}):((_vm.type)==='radio')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.localValue),expression:"localValue"}],staticClass:"form-control",attrs:{"placeholder":_vm.placeholder,"type":"radio"},domProps:{"checked":_vm._q(_vm.localValue,null)},on:{"change":function($event){_vm.localValue=null}}}):_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.localValue),expression:"localValue"}],staticClass:"form-control",attrs:{"placeholder":_vm.placeholder,"type":_vm.type},domProps:{"value":(_vm.localValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.localValue=$event.target.value}}})}
var FieldInputvue_type_template_id_29354e54_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FieldInput.vue?vue&type=template&id=29354e54&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FieldInput.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
/* harmony default export */ var FieldInputvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      localValue: this.value
    };
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String
    },
    placeholder: {
      type: String
    }
  },
  computed: {},
  watch: {
    value: function value(newVal) {
      this.localValue = newVal;
    },
    localValue: function localValue(newVal) {
      this.$emit('input', newVal);
    }
  }
});
// CONCATENATED MODULE: ./src/components/FieldInput.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FieldInputvue_type_script_lang_js_ = (FieldInputvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/FieldInput.vue





/* normalize component */

var FieldInput_component = normalizeComponent(
  components_FieldInputvue_type_script_lang_js_,
  FieldInputvue_type_template_id_29354e54_render,
  FieldInputvue_type_template_id_29354e54_staticRenderFns,
  false,
  null,
  null,
  null
  
)

FieldInput_component.options.__file = "FieldInput.vue"
/* harmony default export */ var FieldInput = (FieldInput_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FieldCheckbox.vue?vue&type=template&id=97d3c312&
var FieldCheckboxvue_type_template_id_97d3c312_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.localValue),expression:"localValue"}],attrs:{"type":"checkbox","disabled":_vm.disabled},domProps:{"checked":Array.isArray(_vm.localValue)?_vm._i(_vm.localValue,null)>-1:(_vm.localValue)},on:{"change":function($event){var $$a=_vm.localValue,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.localValue=$$a.concat([$$v]))}else{$$i>-1&&(_vm.localValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.localValue=$$c}}}})}
var FieldCheckboxvue_type_template_id_97d3c312_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FieldCheckbox.vue?vue&type=template&id=97d3c312&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FieldCheckbox.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
/* harmony default export */ var FieldCheckboxvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      localValue: this.value
    };
  },
  props: {
    value: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  },
  computed: {},
  watch: {
    value: function value(newVal) {
      this.localValue = newVal;
    },
    localValue: function localValue(newVal) {
      this.$emit('input', newVal);
    }
  }
});
// CONCATENATED MODULE: ./src/components/FieldCheckbox.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FieldCheckboxvue_type_script_lang_js_ = (FieldCheckboxvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/FieldCheckbox.vue





/* normalize component */

var FieldCheckbox_component = normalizeComponent(
  components_FieldCheckboxvue_type_script_lang_js_,
  FieldCheckboxvue_type_template_id_97d3c312_render,
  FieldCheckboxvue_type_template_id_97d3c312_staticRenderFns,
  false,
  null,
  null,
  null
  
)

FieldCheckbox_component.options.__file = "FieldCheckbox.vue"
/* harmony default export */ var FieldCheckbox = (FieldCheckbox_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FieldRadio.vue?vue&type=template&id=5eade8ff&
var FieldRadiovue_type_template_id_5eade8ff_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group btn-group"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.localValue),expression:"localValue"}],attrs:{"type":"text","hidden":"","name":_vm.name,"id":_vm.id},domProps:{"value":(_vm.localValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.localValue=$event.target.value}}}),_vm._l((_vm.options),function(option){return _c('button',{key:option,class:_vm.localClass(option),on:{"click":function($event){$event.preventDefault();_vm.handleClick(option)}}},[_vm._v("\n        "+_vm._s(option)+"\n    ")])})],2)}
var FieldRadiovue_type_template_id_5eade8ff_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FieldRadio.vue?vue&type=template&id=5eade8ff&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FieldRadio.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var FieldRadiovue_type_script_lang_js_ = ({
  props: {
    value: {
      type: String
    },
    name: {
      type: String
    },
    id: {
      type: Number
    },
    options: {
      type: Array
    } // an Array of Strings

  },
  data: function data() {
    return {
      localValue: this.value
    };
  },
  methods: {
    localClass: function localClass(option) {
      return ['btn', {
        'selected': this.localValue == option
      }, {
        'btn-default': this.localValue != option
      }];
    },
    handleClick: function handleClick(newVal) {
      this.localValue = newVal;
      this.$emit('input', newVal);
    }
  },
  watch: {
    value: function value(newVal) {
      this.localValue = newVal;
    }
  }
});
// CONCATENATED MODULE: ./src/components/FieldRadio.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FieldRadiovue_type_script_lang_js_ = (FieldRadiovue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/FieldRadio.vue





/* normalize component */

var FieldRadio_component = normalizeComponent(
  components_FieldRadiovue_type_script_lang_js_,
  FieldRadiovue_type_template_id_5eade8ff_render,
  FieldRadiovue_type_template_id_5eade8ff_staticRenderFns,
  false,
  null,
  null,
  null
  
)

FieldRadio_component.options.__file = "FieldRadio.vue"
/* harmony default export */ var FieldRadio = (FieldRadio_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FieldInteger.vue?vue&type=template&id=f8f9fe72&scoped=true&
var FieldIntegervue_type_template_id_f8f9fe72_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group col-xs-3"},[_c('a',{staticClass:"input-group-addon btn",on:{"click":_vm.decValue}},[_c('i',{staticClass:"fa fa-minus"})]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.localValue),expression:"localValue"}],staticClass:"form-control integer",attrs:{"name":_vm.name,"id":_vm.id,"autocomplete":"new-password","type":"text"},domProps:{"value":(_vm.localValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.localValue=$event.target.value}}}),_c('a',{staticClass:"input-group-addon btn float-left",on:{"click":_vm.incValue}},[_c('i',{staticClass:"fa fa-plus"})])])}
var FieldIntegervue_type_template_id_f8f9fe72_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FieldInteger.vue?vue&type=template&id=f8f9fe72&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FieldInteger.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
function clamp(min, x, max) {
  var value = typeof x == 'number' ? x : 0;
  return Math.max(min, Math.min(max, value));
}

/* harmony default export */ var FieldIntegervue_type_script_lang_js_ = ({
  props: {
    value: {
      type: Number
    },
    name: {
      type: String
    },
    id: {
      type: Number
    },
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: +Infinity
    }
  },
  data: function data() {
    return {
      localValue: clamp(this.min, this.value, this.max)
    };
  },
  computed: {},
  methods: {
    decValue: function decValue() {
      this.localValue = clamp(this.min, this.localValue - 1, this.max);
    },
    incValue: function incValue() {
      this.localValue = clamp(this.min, this.localValue + 1, this.max);
    }
  },
  watch: {
    value: function value(newVal) {
      this.localValue = clamp(this.min, newVal, this.max);
    },
    min: function min(newVal) {
      this.localValue = clamp(newVal, this.localValue, this.max);
    },
    max: function max(newVal) {
      this.localValue = clamp(this.min, this.localValue, newVal);
    },
    localValue: function localValue(newVal) {
      this.$emit('input', Number(newVal));
    }
  }
});
// CONCATENATED MODULE: ./src/components/FieldInteger.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FieldIntegervue_type_script_lang_js_ = (FieldIntegervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/FieldInteger.vue?vue&type=style&index=0&id=f8f9fe72&scoped=true&lang=css&
var FieldIntegervue_type_style_index_0_id_f8f9fe72_scoped_true_lang_css_ = __webpack_require__("2393");

// CONCATENATED MODULE: ./src/components/FieldInteger.vue






/* normalize component */

var FieldInteger_component = normalizeComponent(
  components_FieldIntegervue_type_script_lang_js_,
  FieldIntegervue_type_template_id_f8f9fe72_scoped_true_render,
  FieldIntegervue_type_template_id_f8f9fe72_scoped_true_staticRenderFns,
  false,
  null,
  "f8f9fe72",
  null
  
)

FieldInteger_component.options.__file = "FieldInteger.vue"
/* harmony default export */ var FieldInteger = (FieldInteger_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FieldDatePicker.vue?vue&type=template&id=2be3f812&
var FieldDatePickervue_type_template_id_2be3f812_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group date"},[_vm._m(0),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.localValue),expression:"localValue"}],staticClass:"form-control date-style",attrs:{"type":"text","placeholder":_vm.placeholder,"name":_vm.name,"id":_vm.id},domProps:{"value":(_vm.localValue)},on:{"focus":_vm.showDatePicker,"blur":_vm.hideDatePicker,"input":function($event){if($event.target.composing){ return; }_vm.localValue=$event.target.value}}})])}
var FieldDatePickervue_type_template_id_2be3f812_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-addon"},[_c('i',{staticClass:"fa fa-calendar",attrs:{"aria-hidden":"true"}})])}]


// CONCATENATED MODULE: ./src/components/FieldDatePicker.vue?vue&type=template&id=2be3f812&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FieldDatePicker.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* global jQuery, moment */

/* harmony default export */ var FieldDatePickervue_type_script_lang_js_ = ({
  data: function data() {
    return {
      localValue: this.value,
      elem: null,
      dp: null
    };
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: function _default() {
        return moment(nextDeliveryDays(1)).format('DD-MMM-YYYY');
      }
    },
    name: {
      type: String
    },
    id: {
      type: Number
    },
    placeholder: {
      type: String
    },
    enabledDates: {
      type: Array,
      default: undefined
    }
  },
  computed: {},
  mounted: function mounted() {
    moment().local();
    this.elem = jQuery(this.$el);
    this.elem.datetimepicker({
      format: 'DD-MMM-YYYY',
      pickTime: false,
      enabledDates: nextDeliveryDays(90)
    });
    this.dp = this.elem.data('DateTimePicker');
    this.setDatePickerDate(this.localValue);
    this.elem.on('dp.change', this.handleDatePickerChange);
    this.registerEvents();
  },
  beforeDestroy: function beforeDestroy() {
    /* istanbul ignore else */
    if (this.dp) {
      this.dp.destroy();
      this.dp = null;
      this.elem = null;
    }
  },
  watch: {
    // watch for when the prop changes
    value: function value(newVal) {
      this.localValue = newVal;
    },
    // watch for when the local value of this Field changes
    localValue: function localValue(newVal) {
      this.$emit('input', newVal);
    }
  },
  methods: {
    handleDatePickerChange: function handleDatePickerChange(event) {
      var formattedDate = event.date ? event.date.format(this.dp.format) : null;
      this.localValue = formattedDate;
    },
    showDatePicker: function showDatePicker() {
      this.dp.show();
    },
    hideDatePicker: function hideDatePicker() {
      this.dp.hide();
    },
    setDatePickerDate: function setDatePickerDate(newVal) {
      this.dp && this.dp.setDate(newVal || null);
    },
    registerEvents: function registerEvents() {
      var _this = this;

      var events = ['hide', 'show', 'change', 'error', 'update'];
      events.forEach(function (name) {
        /* istanbul ignore next */
        _this.elem.on("dp.".concat(name), function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _this.$emit.apply(_this, ["dp-".concat(name)].concat(args));
        });
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/FieldDatePicker.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FieldDatePickervue_type_script_lang_js_ = (FieldDatePickervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/FieldDatePicker.vue?vue&type=style&index=0&lang=css&
var FieldDatePickervue_type_style_index_0_lang_css_ = __webpack_require__("eef6");

// CONCATENATED MODULE: ./src/components/FieldDatePicker.vue






/* normalize component */

var FieldDatePicker_component = normalizeComponent(
  components_FieldDatePickervue_type_script_lang_js_,
  FieldDatePickervue_type_template_id_2be3f812_render,
  FieldDatePickervue_type_template_id_2be3f812_staticRenderFns,
  false,
  null,
  null,
  null
  
)

FieldDatePicker_component.options.__file = "FieldDatePicker.vue"
/* harmony default export */ var FieldDatePicker = (FieldDatePicker_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FieldAddress.vue?vue&type=template&id=58a3d865&
var FieldAddressvue_type_template_id_58a3d865_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.localValue),expression:"localValue"}],staticClass:"form-control",class:_vm.classname,attrs:{"autocomplete":"new-password","type":"text","id":_vm.id,"placeholder":_vm.placeholder},domProps:{"value":(_vm.localValue)},on:{"focus":_vm.fixChromeAutofillOff,"blur":_vm.onBlur,"input":function($event){if($event.target.composing){ return; }_vm.localValue=$event.target.value}}})}
var FieldAddressvue_type_template_id_58a3d865_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FieldAddress.vue?vue&type=template&id=58a3d865&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.constructor.js
var es6_regexp_constructor = __webpack_require__("3b2b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FieldAddress.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* global google */
/* harmony default export */ var FieldAddressvue_type_script_lang_js_ = ({
  props: {
    value: {
      type: String
    },
    classname: {
      type: String
    },
    placeholder: {
      type: String,
      default: 'Start typing'
    },
    enableGeolocation: {
      type: Boolean,
      default: false
    },
    geolocationOptions: {
      type: Object,
      default: null
    }
  },
  data: function data() {
    return {
      id: null,
      googlePlacesWidget: null,
      localValue: this.value,
      localValueLast: undefined,
      localValueResult: {}
    };
  },
  computed: {
    isValidatedAddress: function isValidatedAddress() {
      // must have a localValue and must have not changed since last address-change
      return !!this.localValue && this.localValue == this.localValueLast;
    }
  },
  watch: {
    value: function value(newVal) {
      this.localValue = newVal;
    },
    localValue: function localValue(newVal) {
      this.$emit('input', newVal);
    }
  },
  mounted: function mounted() {
    this.id = this._uid;
    var options = {
      fields: ['types', 'name', 'geometry', 'address_components', 'formatted_address'],
      componentRestrictions: {
        country: 'au'
      }
    };
    this.googlePlacesWidget = new google.maps.places.Autocomplete(this.$el, options);
    this.googlePlacesWidget.addListener('place_changed', this.onPlaceChanged);
  },
  methods: {
    /**
    * PROBLEM - Chromes autofill overlaps on the screen with GoogleMaps autocomplete! 
    * Setting the <INPUT autocomplete="off" no longer works in Chrome to prevent autofill
    * Need to set <INPUT autocomplete="new-password" to prevent Chrome autofill
    * Unfortunately GoogleMaps resets autocomplete to "off"
    * This focus hack is needed to ensure it stays set to "new-password"
    */
    fixChromeAutofillOff: function fixChromeAutofillOff() {
      this.$el.setAttribute('autocomplete', 'new-password');
    },
    onBlur: function onBlur() {},

    /**
     * When a place changed (user selected one, pressed enter key, or place details fails)
     */
    onPlaceChanged: function onPlaceChanged() {
      var place = this.googlePlacesWidget.getPlace();

      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        this.localValueResult = undefined;
        this.$emit('address-not-found', place, this.id);
        return;
      }

      if (place.address_components !== undefined) {
        // User has selected a correct address, update the field, the results and emit
        this.localValue = this.$el.value;
        this.localValueLast = this.$el.value;
        this.localValueResult = this.formatResult(place);
        this.$emit('address-changed', this.localValueResult, place, this.id);
      }
    },

    /**
     * When the input gets focus
     */
    onFocus: function onFocus() {
      this.fixChromeAutofillOff();
    },

    /**
     * Format result from Geo google APIs
     * @param place
     * @returns {{formatted output}}
     */
    formatResult: function formatResult(place) {
      var ADDRESS_COMPONENTS = {
        subpremise: ['short_name', 'subpremise'],
        street_number: ['short_name', 'street_number'],
        route: ['short_name', 'street_name'],
        locality: ['long_name', 'city'],
        postal_code: ['short_name', 'postcode'],
        administrative_area_level_1: ['short_name', 'state'],
        administrative_area_level_2: ['long_name', 'council'],
        country: ['long_name', 'country']
      };
      var returnData = {};

      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];

        if (ADDRESS_COMPONENTS[addressType]) {
          var placeField = ADDRESS_COMPONENTS[addressType][0];
          var resultField = ADDRESS_COMPONENTS[addressType][1];
          var val = place.address_components[i][placeField];
          returnData[resultField] = val;
        }
      }

      returnData['latitude'] = place.geometry.location.lat();
      returnData['longitude'] = place.geometry.location.lng();
      returnData['types'] = place.types.join(', ');
      returnData['address'] = place.formatted_address;
      returnData['business'] = place.name; // Google places doesnt hand subpremises very well in Australia - https://stackoverflow.com/questions/17936689/google-places-autocomplete-suggestions-with-unit-no-subpremise-is-not-coming-in
      // For example "8/1 Mactier Street, Narrabeen" doesnt pick up subpremise = 8, but just matches "1 Mactier Street"
      // this code grabs what the user entered in before the street name and uses it as the street_number 

      if (returnData.street_name) {
        var regex = RegExp('^(.*?)' + returnData.street_name.split(' ', 1)[0]),
            result = regex.exec(this.value); // get all the user entered values before a match with the first word from the Google stree_name result

        if (Array.isArray(result)) {
          returnData.street_number = result[1]; // add the street name to the user-entered unit & street number

          returnData.subpremise = undefined; // ignore googles subpremise
        }
      }

      return returnData;
    }
  }
});
// CONCATENATED MODULE: ./src/components/FieldAddress.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FieldAddressvue_type_script_lang_js_ = (FieldAddressvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/FieldAddress.vue





/* normalize component */

var FieldAddress_component = normalizeComponent(
  components_FieldAddressvue_type_script_lang_js_,
  FieldAddressvue_type_template_id_58a3d865_render,
  FieldAddressvue_type_template_id_58a3d865_staticRenderFns,
  false,
  null,
  null,
  null
  
)

FieldAddress_component.options.__file = "FieldAddress.vue"
/* harmony default export */ var FieldAddress = (FieldAddress_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Field.vue?vue&type=script&lang=js&






//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ var Fieldvue_type_script_lang_js_ = ({
  components: {
    FieldTextArea: FieldTextArea,
    FieldInput: FieldInput,
    FieldCheckbox: FieldCheckbox,
    FieldRadio: FieldRadio,
    FieldInteger: FieldInteger,
    FieldDatePicker: FieldDatePicker,
    FieldAddress: FieldAddress
  },
  props: {
    label: {
      type: String
    },
    name: {
      type: String
    },
    autocomplete: {
      type: String
    },
    placeholder: {
      type: String
    },
    helpMsg: {
      type: String
    },
    rules: {
      type: String,
      default: 'text'
    },
    rulescontext: {
      type: String
    },
    // used to pass any context to validation rules
    value: {
      type: [String, Boolean, Number]
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    options: {
      type: Array
    },
    disabled: {
      type: Boolean
    }
  },
  data: function data() {
    return {
      validationMsg: '',
      x_value: this.value,
      // remember the new value for checkRules later
      id: null
    };
  },
  mounted: function mounted() {
    this.id = this._uid;
  },
  computed: {
    localName: function localName() {
      // use the explicit name, the v-model binding name, the label or the Vue uid
      var vModelName = property(['$vnode', 'data', 'model', 'expression'])(this);
      var labelName = this.label ? this.label.replace(/ /g, '_').toLowerCase() : '';
      return this.name ? this.name : vModelName ? vModelName : labelName ? labelName : this.id;
    },
    localClasses: function localClasses() {
      return ['form-group', this.validationMsg ? 'has-error' : ''];
    },
    localLabel: function localLabel() {
      return this.label + (this.isRequired() ? ' *' : '');
    },
    type: function type() {
      return this.rules.split(',')[0];
    },
    isFieldInput: function isFieldInput() {
      return this.type != "textarea" && this.type != "boolean" && this.type != "enum" && this.type != "integer" && this.type != "date" && this.type != "address";
    },
    isFieldTextArea: function isFieldTextArea() {
      return this.type == "textarea";
    },
    isFieldCheckbox: function isFieldCheckbox() {
      return this.type == "boolean";
    },
    isFieldRadio: function isFieldRadio() {
      return this.type == "enum";
    },
    isFieldInteger: function isFieldInteger() {
      return this.type == "integer";
    },
    isFieldDatePicker: function isFieldDatePicker() {
      return this.type == "date";
    },
    isFieldAddress: function isFieldAddress() {
      return this.type == "address";
    }
  },
  methods: {
    isRequired: function isRequired() {
      return this.rules.split(',').includes('required');
    },
    handleInput: function handleInput(newVal) {
      this.validationMsg = validate(newVal, this.rules, this);
      this.x_value = newVal;
      this.$emit('input', newVal);
    },
    checkRules: function checkRules() {
      this.validationMsg = validate(this.x_value, this.rules, this);
      return this.validationMsg;
    },
    handleAddressChanged: function handleAddressChanged(newVal) {
      this.$emit('address-changed', newVal);
    }
  }
});
// CONCATENATED MODULE: ./src/components/Field.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Fieldvue_type_script_lang_js_ = (Fieldvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/Field.vue





/* normalize component */

var Field_component = normalizeComponent(
  components_Fieldvue_type_script_lang_js_,
  Fieldvue_type_template_id_1b8870d2_render,
  Fieldvue_type_template_id_1b8870d2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

Field_component.options.__file = "Field.vue"
/* harmony default export */ var Field = (Field_component.exports);
// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// CONCATENATED MODULE: ./src/helpers/cardMessageSample.js



var sampleMessages = {
  Birthday: ["A belated birthday bouquet for you my friend. i hope you had a wonder day.", "Birthday wishes, we hope you have a great birthday, much love.", "Happiest of Birthdays to our dearest friend. We wish you lots of joy this year ahead and hope to share many laughs and memories with you. This is our small reminder that we love you and cherish our friendship with you. Happy Birthday", "Happy (belated) birthday", "Happy belated Birthday to a special girl!  Let the birthday celebrations continue all week xxx", "Happy birthday beautiful!", "Happy Birthday for tomorrow, sorry I can't be there xxx", "Happy Birthday Gorgeous! Hope you have a fab day, wish i was there! Can't wait to see you soon! Love you Lots!", "Happy birthday man! Hope you get spoilt and have a brilliant day! Lots of love.", "Happy Birthday, and wishing you peace and contentment and grace.", "Happy Birthday!  I hope you have a wonderful day and can get out and enjoy the sunshine.", "Happy Birthday! Enjoy your celebrations and have a sweet Birthday! Hope all your wishes come true this year xxx", "Happy Birthday! Hope you have a wonderful day!", "Happy Birthday! You deserve all the happiness in the world. Xx", "Happy Birthday!", "Hoping the sun is shining for your birthday today :) May your day be filled with laughter, love and cake!!!", "Lots of birthday love from all of us!", "Lots of love xx. Happy Birthday!", "Lots of birthday love", "Wishing you a very happy birthday.", "XX Can't wait to see you. Happy Birthday", "Wishing you a wonderful birthday filled with flowers, hugs and laughter. May the coming year bless you with prosperity, good health and happiness. ", "Wishing you the happiest of birthdays. Always thinking of you."],
  Anniversary: ["Happy Anniversary!", "Happy Anniversary.  Can you believe that you have been in this building for so many years with me. xxx", "Mazeltov on your first year wedding anniversary. Love you lots xx", "Bon Anniversaire! With Love", "Happy 1st Anniversary love birds xxx", "Happy 5 years Anniversary! Je t'aime Ã  la folie. ", "Happy 10th Anniversary xxx ", "Happy 20th Anniversary xxx ", "Happy 50th Anniversary XX. Lots of love xxx", "Happy Anniversary babe xx I love you more each day and i couldn't imagine my life without you xx", "Happy Anniversary, Love you so much and am very lucky to have found you.", "Happy anniversary guys! Thanks for the stable upbringing and for your never-ending love and support xxx", "Happy Anniversary my love", "Happy Anniversary Sweets, I am so lucky to have you in my life. With all my love xx", "Happy Anniversary! I love you!", "Happy Anniversary. My Good Thing is that I'm grateful you're with me.", "Happy Wedding Anniversary, love you both xx "],
  Thanks: ["A little something for you to say thank you for all that you have done for me and for being such a beautiful person.", "All the best. Thanks.", "I just wanted to say thank you for all your support, patience and flexibility over the last 6 months. You've made a difficult time so much easier.", "I will miss you so very much.", "Thank you for all your help. We will miss you so much.", "Thank you for being the beautiful person you are xxx ", "Thank you for everything you do for me. Love ya", "Thank you for everything! I have loved working with you and will miss you very much.  xox", "Thank you for everything!", "Thank you for everything. Amazing year.", "Thank you for everything. I'll miss you.", "Thank you so much for my new Escape Bag - it is fabulous and I love it!", "Thank you xx", "Thank You!", "Thanks for all your efforts, cakes, treats and laughs.", "Thanks for all your time and effort!", "Thanks for being such a wonderful friend. Lots of love x", "Thanks for tolerating me. Love you.", "A million thank yous for the last few days - I would not have survived without you!", "Thank you for everything you do for us! Love you xoxo"],
  Congrats: ["A huge congratulations on the arrival of your new baby. We hope for a fast recovery and a beautiful start to a new journey with your little one, enjoy every min. God bless", "A huge congratulations to you both. Know its been a tough few months but so so pleased about the new arrival", "A little birdie told me that a special delivery had arrived!  Congratulations to you both.  We hope your beautiful baby brings you much joy in your new family xo", "Biggest love and congratulations to the next, better chapter my darling. Love you so much!", "Congraduations!!!", "Congrats. You will probably think these flowers are cheesy and feel slightly uncomfortable. So my job is done.", "Congratulations baby, I'm so proud of you! xxxx", "Congratulations lovely xx", "Congratulations on your engagement!", "Such an exciting day for you and such an exciting year too. Love you  long time.", "We watch on in awe ... you did an amazing job last night. Congrats!"],
  Sorry: ["Break a leg! :) sorry I'm not there to cheer you on, and missing you heaps xx", "Hello darling, I'm sorry we haven't caught up. I want you to know I'm thinking of you and I'll give you a call soon. X", "I am so sorry to hear the sad news. Thinking of you and sending all my love to all the family xxx", "Just wanted to let you know we are thinking of you.  Sorry that you are fighting this battle, but we know you have got this - you're too fabulous not to win.  Sending  our love and best wishes always xx", "Love you xxx", "So sorry to hear about the sad news. Am sure he will forever watch over you and be in our hearts and on social media. :)", "Sorry about the mess in your shop this morning!", "Sorry I messed up", "Sorry about the mess in your shop this morning!", "Sorry I was sick and couldn't come yesterday.", "Sorry xx", "Very sorry for your loss, thoughts are with you and your family.", "We are so sorry for your loss and  thinking of you and the family in this very difficult time.  All our love", "There is a saying that friends are the family we choose for ourselves and you are my family. I am so sorry you have been sad lately. You don't deserve it.  xxxxxx"]
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function cardMessageSample(theme) {
  var id = theme; // if no matching theme then just choose one randomly

  /* istanbul ignore else */

  if (!sampleMessages[id]) {
    var themes = Object.keys(sampleMessages);
    var numThemes = themes.length;
    id = themes[getRandomInt(numThemes)];
  }

  var numSamples = sampleMessages[id].length;
  return sampleMessages[id][getRandomInt(numSamples)];
}
// CONCATENATED MODULE: ./src/helpers/checkFormRules.js
// recursively check all all the Form elements for validation rules
function checkFormRules(acc, vm) {
  vm.$children.reduce(function (acc, child) {
    return checkFormRules(acc, child);
  }, acc);

  if (vm.checkRules) {
    var msg = vm.checkRules();
    if (msg) acc.push({
      label: vm.label,
      msg: msg
    });
  }

  return acc;
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/forms/OrderFormSender.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var OrderFormSendervue_type_script_lang_js_ = ({
  props: {
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    from: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    }
  },
  components: {
    FormGroup: FormGroup,
    Field: Field
  },
  data: function data() {
    return {
      x_snd_name: this.name,
      x_snd_email: this.email,
      x_snd_phone: this.phone,
      x_to: this.to,
      x_from: this.from,
      x_message: this.message,
      confirmValidationMsg: ''
    };
  },
  methods: {
    getCardMessage: function getCardMessage(theme) {
      this.x_message = cardMessageSample(theme);
    },
    confirm: function confirm(ev) {
      this.confirmValidationMsg = '';
      var errors = checkFormRules([], this);

      if (errors.length > 0) {
        // eslint-disable-next-line
        console.log('Form Validation Errors', errors);
        this.confirmValidationMsg = "Please correct the following fields: ".concat(errors.map(function (a) {
          return a.label;
        }).join(', '), ".");
        ev.preventDefault();
      }
    }
  },
  watch: {}
});
// CONCATENATED MODULE: ./src/forms/OrderFormSender.vue?vue&type=script&lang=js&
 /* harmony default export */ var forms_OrderFormSendervue_type_script_lang_js_ = (OrderFormSendervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/forms/OrderFormSender.vue





/* normalize component */

var OrderFormSender_component = normalizeComponent(
  forms_OrderFormSendervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

OrderFormSender_component.options.__file = "OrderFormSender.vue"
/* harmony default export */ var OrderFormSender = (OrderFormSender_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/forms/OrderFormDelivery.vue?vue&type=template&id=882611fe&
var OrderFormDeliveryvue_type_template_id_882611fe_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{attrs:{"method":"post"},on:{"submit":_vm.confirm}},[_c('FormGroup',{attrs:{"label":"Recipient","top":""}},[_c('div',{staticClass:"clearfix"},[_c('div',{staticClass:"alert alert-dismissable",staticStyle:{"background-color":"#d5d1c7"},attrs:{"role":"alert"}},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"alert","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])]),_c('strong',[_vm._v("Contact Information:")]),_vm._v("\nPlease ensure you include a recipient phone number and that any Company Name is included in the delivery addresses or additional info. \nMany times our couriers are required to leave the flowers in the mail room of larger companies.\nIt is important to include the recipients contact number on the order.\n                ")])]),_c('Field',{staticClass:"col-md-4",attrs:{"label":"Name","helpMsg":"include first and last names","autocomplete":"name","rules":"text,required"},model:{value:(_vm.x_rcv_name),callback:function ($$v) {_vm.x_rcv_name=$$v},expression:"x_rcv_name"}}),_c('Field',{staticClass:"col-md-4",attrs:{"label":"Company / Business Name","autocomplete":"email","rules":"text"},model:{value:(_vm.x_rcv_business),callback:function ($$v) {_vm.x_rcv_business=$$v},expression:"x_rcv_business"}}),_c('Field',{staticClass:"col-md-4",attrs:{"label":"Phone","autocomplete":"phone","rules":"tel","helpMsg":"recipient's contact number"},model:{value:(_vm.x_rcv_phone),callback:function ($$v) {_vm.x_rcv_phone=$$v},expression:"x_rcv_phone"}}),_c('Field',{staticClass:"clearfix col-md-6",attrs:{"label":"Delivery Address","rules":"address,specific,nsw,required","helpMsg":"please start typing and select from the autocomplete list","placeholder":"Business Name or Street Address, City"},on:{"address-changed":_vm.updateAddress},model:{value:(_vm.x_rcv_address),callback:function ($$v) {_vm.x_rcv_address=$$v},expression:"x_rcv_address"}}),_c('Field',{staticClass:"col-md-6",attrs:{"label":"Additional Delivery Info","rules":"text","helpMsg":"please help the driver locate the recipient or delivery place","placeholder":"Suite, Unit, Floor, Level, Shop, Room, Where to leave"},model:{value:(_vm.x_rcv_special),callback:function ($$v) {_vm.x_rcv_special=$$v},expression:"x_rcv_special"}}),_c('Field',{directives:[{name:"show",rawName:"v-show",value:(false),expression:"false"}],model:{value:(_vm.x_rcv_email),callback:function ($$v) {_vm.x_rcv_email=$$v},expression:"x_rcv_email"}}),_c('Field',{directives:[{name:"show",rawName:"v-show",value:(false),expression:"false"}],model:{value:(_vm.x_rcv_street),callback:function ($$v) {_vm.x_rcv_street=$$v},expression:"x_rcv_street"}}),_c('Field',{directives:[{name:"show",rawName:"v-show",value:(false),expression:"false"}],model:{value:(_vm.x_rcv_city),callback:function ($$v) {_vm.x_rcv_city=$$v},expression:"x_rcv_city"}}),_c('Field',{directives:[{name:"show",rawName:"v-show",value:(false),expression:"false"}],model:{value:(_vm.x_rcv_zip),callback:function ($$v) {_vm.x_rcv_zip=$$v},expression:"x_rcv_zip"}}),_c('Field',{directives:[{name:"show",rawName:"v-show",value:(false),expression:"false"}],model:{value:(_vm.x_rcv_state),callback:function ($$v) {_vm.x_rcv_state=$$v},expression:"x_rcv_state"}}),_c('Field',{directives:[{name:"show",rawName:"v-show",value:(false),expression:"false"}],model:{value:(_vm.x_rcv_country),callback:function ($$v) {_vm.x_rcv_country=$$v},expression:"x_rcv_country"}}),_c('Field',{directives:[{name:"show",rawName:"v-show",value:(false),expression:"false"}],model:{value:(_vm.x_rcv_latitude),callback:function ($$v) {_vm.x_rcv_latitude=$$v},expression:"x_rcv_latitude"}}),_c('Field',{directives:[{name:"show",rawName:"v-show",value:(false),expression:"false"}],model:{value:(_vm.x_rcv_longitude),callback:function ($$v) {_vm.x_rcv_longitude=$$v},expression:"x_rcv_longitude"}}),_c('Field',{directives:[{name:"show",rawName:"v-show",value:(false),expression:"false"}],model:{value:(_vm.x_rcv_is_extra),callback:function ($$v) {_vm.x_rcv_is_extra=$$v},expression:"x_rcv_is_extra"}})],1),_c('FormGroup',{attrs:{"label":"Delivery Information"}},[_c('div',{staticClass:"clearfix"},[_c('div',{staticClass:"alert alert-dismissable",staticStyle:{"background-color":"#d5d1c7"},attrs:{"role":"alert"}},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"alert","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])]),_c('strong',[_vm._v("Delivery Times:")]),_vm._v("\nWe endeavor to deliver at the earliest possible times. Orders are dispatched from our store at 1pm every day. \nWe aim to deliver to businesses before 5pm and residential addresses before 7pm, but often we will deliver earlier.\nWhen your delivery is complicated or time critical please call us and we will do our best to accommodate. \nWe do have a VIP Courier service when flowers need to be delivered faster or earlier.\n                ")])]),_c('Field',{staticClass:"col-md-6",attrs:{"label":_vm.x_subscription? 'Starting Day' : 'Day of Delivery',"name":"x_start","rules":"date,future,before1pm,delivery,restrict","rulescontext":_vm.products,"helpMsg":"within next 90 days"},model:{value:(_vm.x_start),callback:function ($$v) {_vm.x_start=$$v},expression:"x_start"}}),_c('Field',{staticClass:"col-md-6",attrs:{"label":"Subscription Posy","disabled":"","helpMsg":"Order contains multiple deliveries","rules":"boolean"},model:{value:(_vm.x_subscription),callback:function ($$v) {_vm.x_subscription=$$v},expression:"x_subscription"}}),_c('FormTransition',{staticClass:"clearfix",attrs:{"show":_vm.x_subscription}},[_c('Field',{staticClass:"col-md-6",attrs:{"label":"Number of Deliveries","min":_vm.x_subscription ? 3 : 1,"max":_vm.x_subscription ? 50 : 1,"rules":"integer"},model:{value:(_vm.x_number),callback:function ($$v) {_vm.x_number=$$v},expression:"x_number"}}),_c('Field',{staticClass:"col-md-6",attrs:{"label":"Delivery Frequency","options":['Daily','Weekly','Fortnightly','Monthly','Other'],"rules":"enum"},model:{value:(_vm.x_freq),callback:function ($$v) {_vm.x_freq=$$v},expression:"x_freq"}}),_c('Field',{staticClass:"clearfix col-md-12",attrs:{"label":"Delivery Days","rules":"text, days"},model:{value:(_vm.x_days),callback:function ($$v) {_vm.x_days=$$v},expression:"x_days"}})],1)],1),_c('FormGroup',[(_vm.confirmValidationMsg)?_c('div',{staticClass:"has-error col-md-12"},[_c('p',{staticClass:"help-block text-right mt8 mb16"},[_vm._v(_vm._s(_vm.confirmValidationMsg))])]):_vm._e(),_c('div',{staticClass:"col-md-12"},[_c('a',{staticClass:"btn btn-default mb32",attrs:{"href":"/shop/cart"}},[_c('span',{staticClass:"fa fa-long-arrow-left"}),_vm._v(" Return to Cart")]),_c('button',{staticClass:"btn btn-default btn-primary pull-right mb32 ",attrs:{"href":"/shop/delivery"}},[_vm._v("Confirm "),_c('span',{staticClass:"fa fa-long-arrow-right"})])])])],1)}
var OrderFormDeliveryvue_type_template_id_882611fe_staticRenderFns = []


// CONCATENATED MODULE: ./src/forms/OrderFormDelivery.vue?vue&type=template&id=882611fe&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layout/FormTransition.vue?vue&type=template&id=b445a816&
var FormTransitionvue_type_template_id_b445a816_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"slide"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}]},[_vm._t("default")],2)])}
var FormTransitionvue_type_template_id_b445a816_staticRenderFns = []


// CONCATENATED MODULE: ./src/layout/FormTransition.vue?vue&type=template&id=b445a816&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/layout/FormTransition.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var FormTransitionvue_type_script_lang_js_ = ({
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {};
  }
});
// CONCATENATED MODULE: ./src/layout/FormTransition.vue?vue&type=script&lang=js&
 /* harmony default export */ var layout_FormTransitionvue_type_script_lang_js_ = (FormTransitionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/layout/FormTransition.vue?vue&type=style&index=0&lang=css&
var FormTransitionvue_type_style_index_0_lang_css_ = __webpack_require__("ddd8");

// CONCATENATED MODULE: ./src/layout/FormTransition.vue






/* normalize component */

var FormTransition_component = normalizeComponent(
  layout_FormTransitionvue_type_script_lang_js_,
  FormTransitionvue_type_template_id_b445a816_render,
  FormTransitionvue_type_template_id_b445a816_staticRenderFns,
  false,
  null,
  null,
  null
  
)

FormTransition_component.options.__file = "FormTransition.vue"
/* harmony default export */ var FormTransition = (FormTransition_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/forms/OrderFormDelivery.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var OrderFormDeliveryvue_type_script_lang_js_ = ({
  props: {
    name: {
      type: String,
      default: ''
    },
    business: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    special: {
      type: String,
      default: ''
    },
    // flags whether this is a special subscription order True or False
    products: {
      type: String,
      default: ''
    },
    // concatenation of the short descriptions of products ordered, passed as context to Start Date
    start: {
      type: String,
      default: ''
    },
    subscription: {
      type: String,
      default: 'False'
    },
    // Comes in as 'True' or 'False' from Odoo
    freq: {
      type: String,
      default: 'Daily'
    },
    number: {
      type: Number,
      default: 1
    },
    days: {
      type: String,
      default: ''
    }
  },
  components: {
    FormGroup: FormGroup,
    FormTransition: FormTransition,
    Field: Field
  },
  data: function data() {
    var d = {
      x_rcv_name: this.name,
      x_rcv_email: this.email,
      x_rcv_phone: this.phone,
      x_rcv_address: this.address,
      x_rcv_special: this.special,
      x_rcv_business: this.business,
      x_rcv_street: '',
      x_rcv_city: '',
      x_rcv_zip: '',
      x_rcv_state: '',
      x_rcv_country: '',
      x_rcv_latitude: '',
      x_rcv_longitude: '',
      x_rcv_is_extra: '',
      // flags whether an extra delivery charge is needed for hospitals, schools, malls
      x_start: getNextPossibleDeliveryDay(this.start),
      x_subscription: this.subscription == 'True',
      // convert to JS boolean true or false
      x_freq: this.freq ? this.freq : 'Daily',
      x_number: this.number ? Number(this.number) : 1,
      confirmValidationMsg: ''
    };
    d.x_number = d.x_subscription && d.x_number < 3 ? 3 : d.x_number; // clamp to min of 3 when order is a subscription

    d.x_days = this.days && this.freq == 'Other' ? this.days : deliveryDays(d.x_start, d.x_freq, d.x_number);
    return d;
  },
  watch: {
    'x_start': function x_start() {
      this.updateDeliveryDays();
    },
    'x_freq': function x_freq() {
      this.updateDeliveryDays();
    },
    'x_number': function x_number() {
      this.updateDeliveryDays();
    }
  },
  methods: {
    updateDeliveryDays: function updateDeliveryDays() {
      this.x_days = deliveryDays(this.x_start, this.x_freq, this.x_number);
    },
    updateAddress: function updateAddress(event) {
      var is_extra_schools_malls_medical = validate(event.types, 'extra');
      this.x_rcv_street = [event.subpremise ? event.subpremise + ' /' : undefined, event.street_number, event.street_name].filter(function (s) {
        return s;
      }).join(' ');
      this.x_rcv_city = event.city;
      this.x_rcv_zip = event.postcode;
      this.x_rcv_state = event.state;
      this.x_rcv_country = event.country;
      this.x_rcv_latitude = String(event.latitude);
      this.x_rcv_longitude = String(event.longitude);
      this.x_rcv_is_extra = is_extra_schools_malls_medical ? 'true' : 'false'; // force to 'true' or 'false'

      if (validate(event.types, 'establishment')) {
        this.x_rcv_special = event.address;
      }
    },
    confirm: function confirm(ev) {
      this.confirmValidationMsg = '';
      var errors = checkFormRules([], this);

      if (errors.length > 0) {
        // eslint-disable-next-line
        console.log('Form Validation Errors', errors);
        this.confirmValidationMsg = "Please correct the following fields: ".concat(errors.map(function (a) {
          return a.label;
        }).join(', '), ".");
        ev.preventDefault();
      }
    }
  }
});
// CONCATENATED MODULE: ./src/forms/OrderFormDelivery.vue?vue&type=script&lang=js&
 /* harmony default export */ var forms_OrderFormDeliveryvue_type_script_lang_js_ = (OrderFormDeliveryvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/forms/OrderFormDelivery.vue





/* normalize component */

var OrderFormDelivery_component = normalizeComponent(
  forms_OrderFormDeliveryvue_type_script_lang_js_,
  OrderFormDeliveryvue_type_template_id_882611fe_render,
  OrderFormDeliveryvue_type_template_id_882611fe_staticRenderFns,
  false,
  null,
  null,
  null
  
)

OrderFormDelivery_component.options.__file = "OrderFormDelivery.vue"
/* harmony default export */ var OrderFormDelivery = (OrderFormDelivery_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/forms/OrderFormDaily.vue?vue&type=template&id=4f37ea5c&
var OrderFormDailyvue_type_template_id_4f37ea5c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{attrs:{"method":"post","enctype":"multipart/form-data"}},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-12 ml16 mr16 mb32"},[_c('h1',[_vm._v("Daily Posy")]),_c('FieldInput',{directives:[{name:"show",rawName:"v-show",value:(false),expression:"false"}],attrs:{"name":"x_primary"}}),_c('FieldInput',{directives:[{name:"show",rawName:"v-show",value:(false),expression:"false"}],attrs:{"name":"x_small"}}),_c('FieldInput',{directives:[{name:"show",rawName:"v-show",value:(false),expression:"false"}],attrs:{"name":"x_medium"}}),_c('FieldInput',{directives:[{name:"show",rawName:"v-show",value:(false),expression:"false"}],attrs:{"name":"x_large"}}),_c('p',[_vm._v("Use this page to update the Daily Posy images and description. All images will be cropped to 1:1 aspect ratio and correct resolution.")]),_c('li',{staticClass:"text-muted"},[_vm._v("On a PC: DRAG/DROP files onto images to replace them. SCROLL to zoom. CLICK and DRAG to move.")]),_c('li',{staticClass:"text-muted"},[_vm._v("On a Phone: TAP an image to replace it. Select from Camera or Gallery. PINCH to zoom. DRAG to move.")])],1)]),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-8"},[_c('h4',[_vm._v(" ")]),_c('Field',{staticClass:"clearfix col-md-12",attrs:{"name":"x_description","rules":"textarea","label":"Product Description"},model:{value:(_vm.x_description),callback:function ($$v) {_vm.x_description=$$v},expression:"x_description"}}),_c('Field',{staticClass:"clearfix col-md-12",attrs:{"name":"x_duplicate","rules":"boolean","helpMsg":"Publish primary image for small, medium and large product variants","label":"Image options"},model:{value:(_vm.x_duplicate),callback:function ($$v) {_vm.x_duplicate=$$v},expression:"x_duplicate"}}),_c('div',{staticClass:"col-md-12"},[_c('button',{staticClass:"btn btn-default btn-lg btn-primary mb32",on:{"click":_vm.publish}},[_vm._v("Publish Now")])])],1),_c('div',{staticClass:"col-md-4"},[_c('div',{staticClass:"col-md-12"},[_c('h4',[_vm._v("Daily Posy (primary)")]),_c('croppa',{attrs:{"width":300,"height":300,"quality":2,"zoom-speed":8,"placeholder-font-size":18,"canvas-color":"#ccc","show-loading":"","replace-drop":"","accept":"image/*"},model:{value:(_vm.croppa_primary),callback:function ($$v) {_vm.croppa_primary=$$v},expression:"croppa_primary"}})],1)])]),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-4"},[_c('div',{staticClass:"col-md-12"},[_c('h4',[_vm._v("Daily Posy (small)")]),_c('croppa',{attrs:{"width":300,"height":300,"quality":2,"zoom-speed":8,"placeholder-font-size":18,"canvas-color":"#ccc","show-loading":"","replace-drop":"","accept":"image/*"},model:{value:(_vm.croppa_small),callback:function ($$v) {_vm.croppa_small=$$v},expression:"croppa_small"}})],1)]),_c('div',{staticClass:"col-md-4"},[_c('div',{staticClass:"col-md-12"},[_c('h4',[_vm._v("Daily Posy (medium)")]),_c('croppa',{attrs:{"width":300,"height":300,"quality":2,"zoom-speed":8,"placeholder-font-size":18,"canvas-color":"#ccc","show-loading":"","replace-drop":"","accept":"image/*"},model:{value:(_vm.croppa_medium),callback:function ($$v) {_vm.croppa_medium=$$v},expression:"croppa_medium"}})],1)]),_c('div',{staticClass:"col-md-4"},[_c('div',{staticClass:"col-md-12"},[_c('h4',[_vm._v("Daily Posy (large)")]),_c('croppa',{attrs:{"width":300,"height":300,"quality":2,"zoom-speed":8,"placeholder-font-size":18,"canvas-color":"#ccc","show-loading":"","replace-drop":"","accept":"image/*"},model:{value:(_vm.croppa_large),callback:function ($$v) {_vm.croppa_large=$$v},expression:"croppa_large"}})],1)])])])}
var OrderFormDailyvue_type_template_id_4f37ea5c_staticRenderFns = []


// CONCATENATED MODULE: ./src/forms/OrderFormDaily.vue?vue&type=template&id=4f37ea5c&

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: ./node_modules/vue-croppa/dist/vue-croppa.js
var vue_croppa = __webpack_require__("2896");
var vue_croppa_default = /*#__PURE__*/__webpack_require__.n(vue_croppa);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/forms/OrderFormDaily.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




 // import css from 'vue-croppa/dist/vue-croppa.min.css';

external_commonjs_vue_commonjs2_vue_root_Vue_default.a.use(vue_croppa_default.a);
/* harmony default export */ var OrderFormDailyvue_type_script_lang_js_ = ({
  props: {
    description: {
      type: String
    } // description of the Daily Posy

  },
  components: {
    FormGroup: FormGroup,
    FieldInput: FieldInput,
    Field: Field
  },
  data: function data() {
    return {
      croppa_primary: {},
      croppa_small: {},
      croppa_medium: {},
      croppa_large: {},
      x_description: this.description,
      x_duplicate: false,
      values: {}
    };
  },
  methods: {
    publish: function publish() {
      // ensure first four children of this component are input fields
      // for the primary, small, medium and large product variants
      this.$children[0].$el.value = this.croppa_primary.generateDataUrl().split(',').pop();
      this.$children[1].$el.value = this.croppa_small.generateDataUrl().split(',').pop();
      this.$children[2].$el.value = this.croppa_medium.generateDataUrl().split(',').pop();
      this.$children[3].$el.value = this.croppa_large.generateDataUrl().split(',').pop();
      console.log('Publishing Daily Posy Updates!!');
    }
  },
  watch: {}
});
// CONCATENATED MODULE: ./src/forms/OrderFormDaily.vue?vue&type=script&lang=js&
 /* harmony default export */ var forms_OrderFormDailyvue_type_script_lang_js_ = (OrderFormDailyvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/forms/OrderFormDaily.vue





/* normalize component */

var OrderFormDaily_component = normalizeComponent(
  forms_OrderFormDailyvue_type_script_lang_js_,
  OrderFormDailyvue_type_template_id_4f37ea5c_render,
  OrderFormDailyvue_type_template_id_4f37ea5c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

OrderFormDaily_component.options.__file = "OrderFormDaily.vue"
/* harmony default export */ var OrderFormDaily = (OrderFormDaily_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"47426207-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/forms/OrderFormDayOfWeek.vue?vue&type=template&id=cfd4d686&
var OrderFormDayOfWeekvue_type_template_id_cfd4d686_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',[_vm._v(" - "+_vm._s(_vm.delivery_day_of_week))])}
var OrderFormDayOfWeekvue_type_template_id_cfd4d686_staticRenderFns = []


// CONCATENATED MODULE: ./src/forms/OrderFormDayOfWeek.vue?vue&type=template&id=cfd4d686&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/forms/OrderFormDayOfWeek.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var OrderFormDayOfWeekvue_type_script_lang_js_ = ({
  props: {},
  components: {},
  computed: {
    delivery_day_of_week: function delivery_day_of_week() {
      return getNextPossibleDeliveryDayOfWeek();
    }
  },
  methods: {
    publish: function publish() {}
  }
});
// CONCATENATED MODULE: ./src/forms/OrderFormDayOfWeek.vue?vue&type=script&lang=js&
 /* harmony default export */ var forms_OrderFormDayOfWeekvue_type_script_lang_js_ = (OrderFormDayOfWeekvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/forms/OrderFormDayOfWeek.vue





/* normalize component */

var OrderFormDayOfWeek_component = normalizeComponent(
  forms_OrderFormDayOfWeekvue_type_script_lang_js_,
  OrderFormDayOfWeekvue_type_template_id_cfd4d686_render,
  OrderFormDayOfWeekvue_type_template_id_cfd4d686_staticRenderFns,
  false,
  null,
  null,
  null
  
)

OrderFormDayOfWeek_component.options.__file = "OrderFormDayOfWeek.vue"
/* harmony default export */ var OrderFormDayOfWeek = (OrderFormDayOfWeek_component.exports);
// CONCATENATED MODULE: ./src/orderForm.js





// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Sender", function() { return OrderFormSender; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Delivery", function() { return OrderFormDelivery; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Daily", function() { return OrderFormDaily; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DayOfWeek", function() { return OrderFormDayOfWeek; });




/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ });
});
//# sourceMappingURL=order_form.umd.js.map