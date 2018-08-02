(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["order_form"] = factory();
	else
		root["order_form"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "da45");
/******/ })
/************************************************************************/
/******/ ({

/***/ "00dc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_mini_css_extract_plugin_dist_loader_js_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_css_loader_index_js_ref_6_oneOf_1_1_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_vue_loader_lib_loaders_stylePostLoader_js_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_cache_loader_dist_cjs_js_ref_0_0_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d582");
/* harmony import */ var _nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_mini_css_extract_plugin_dist_loader_js_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_css_loader_index_js_ref_6_oneOf_1_1_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_vue_loader_lib_loaders_stylePostLoader_js_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_cache_loader_dist_cjs_js_ref_0_0_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_mini_css_extract_plugin_dist_loader_js_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_css_loader_index_js_ref_6_oneOf_1_1_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_vue_loader_lib_loaders_stylePostLoader_js_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_cache_loader_dist_cjs_js_ref_0_0_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_mini_css_extract_plugin_dist_loader_js_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_css_loader_index_js_ref_6_oneOf_1_1_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_vue_loader_lib_loaders_stylePostLoader_js_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_cache_loader_dist_cjs_js_ref_0_0_nvm_versions_node_v10_7_0_lib_node_modules_vue_cli_service_global_node_modules_vue_loader_lib_index_js_vue_loader_options_FormGroup_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "5592":
/***/ (function(module, exports, __webpack_require__) {

// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}


/***/ }),

/***/ "d582":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "da45":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: /home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
var setPublicPath = __webpack_require__("5592");

// CONCATENATED MODULE: /home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"/home/jdm/Projects/tpp-ecommerce/odoo_sale_addons/website_tpp/vue/node_modules/.cache/vue-loader","cacheIdentifier":"61570f66-vue-loader-template"}!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js??ref--0-0!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib??vue-loader-options!./OrderForm.vue?vue&type=template&id=7bbb9e14&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('FormGroup',{attrs:{"label":"Sender"}},[_c('FieldInput',{staticClass:"col-md-4",attrs:{"label":"Name"},model:{value:(_vm.sender.name),callback:function ($$v) {_vm.$set(_vm.sender, "name", $$v)},expression:"sender.name"}}),_c('FieldInput',{staticClass:"col-md-4",attrs:{"label":"Email","type":"email"},model:{value:(_vm.sender.email),callback:function ($$v) {_vm.$set(_vm.sender, "email", $$v)},expression:"sender.email"}}),_c('FieldInput',{staticClass:"col-md-4",attrs:{"label":"Phone","type":"tel"},model:{value:(_vm.sender.phone),callback:function ($$v) {_vm.$set(_vm.sender, "phone", $$v)},expression:"sender.phone"}})],1),_c('FormGroup',{attrs:{"label":"Recipient"}},[_c('FieldInput',{staticClass:"col-md-4",attrs:{"label":"Name"},model:{value:(_vm.receiver.name),callback:function ($$v) {_vm.$set(_vm.receiver, "name", $$v)},expression:"receiver.name"}}),_c('FieldInput',{staticClass:"col-md-4",attrs:{"label":"Email","type":"email"},model:{value:(_vm.receiver.email),callback:function ($$v) {_vm.$set(_vm.receiver, "email", $$v)},expression:"receiver.email"}}),_c('FieldInput',{staticClass:"col-md-4",attrs:{"label":"Phone","type":"tel"},model:{value:(_vm.receiver.phone),callback:function ($$v) {_vm.$set(_vm.receiver, "phone", $$v)},expression:"receiver.phone"}}),_c('FieldInput',{staticClass:"col-md-6",attrs:{"label":"Delivery Address","type":"textarea","placeholder":"Street Address, City, Postcode"}}),_c('FieldInput',{staticClass:"col-md-6",attrs:{"label":"Special Delivery Instructions","type":"textarea","placeholder":"Business Name, Suite, Unit, Floor, Location, etc"}})],1),_c('FormGroup',{attrs:{"label":"Delivery Information"}},[_c('FieldInput',{staticClass:"col-md-4",attrs:{"label":"No. Deliveries"},model:{value:(_vm.sender.name),callback:function ($$v) {_vm.$set(_vm.sender, "name", $$v)},expression:"sender.name"}}),_c('FieldInput',{staticClass:"col-md-4",attrs:{"label":"Frequency"},model:{value:(_vm.sender.name),callback:function ($$v) {_vm.$set(_vm.sender, "name", $$v)},expression:"sender.name"}}),_c('FieldInput',{staticClass:"col-md-4",attrs:{"label":"Starting Day"},model:{value:(_vm.sender.name),callback:function ($$v) {_vm.$set(_vm.sender, "name", $$v)},expression:"sender.name"}}),_c('FieldInput',{staticClass:"col-md-12",attrs:{"label":"Delivery Days"}})],1),_c('FormGroup',{attrs:{"label":"Personalised Card"}},[_c('FieldInput',{staticClass:"col-md-6",attrs:{"label":"A Posy For"},model:{value:(_vm.card.to),callback:function ($$v) {_vm.$set(_vm.card, "to", $$v)},expression:"card.to"}}),_c('FieldInput',{staticClass:"col-md-6",attrs:{"label":"From"},model:{value:(_vm.card.from),callback:function ($$v) {_vm.$set(_vm.card, "from", $$v)},expression:"card.from"}}),_c('FieldInput',{staticClass:"col-md-12",attrs:{"label":"Message","type":"textarea"},model:{value:(_vm.card.message),callback:function ($$v) {_vm.$set(_vm.card, "message", $$v)},expression:"card.message"}})],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./OrderForm.vue?vue&type=template&id=7bbb9e14&

// CONCATENATED MODULE: /home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"/home/jdm/Projects/tpp-ecommerce/odoo_sale_addons/website_tpp/vue/node_modules/.cache/vue-loader","cacheIdentifier":"61570f66-vue-loader-template"}!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js??ref--0-0!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib??vue-loader-options!./FormGroup.vue?vue&type=template&id=33838e8c&
var lib_vue_loader_options_FormGroupvue_type_template_id_33838e8c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h3',{staticClass:"page-header clearfix"},[_vm._v("\n      "+_vm._s(_vm.label)+"\n  ")]),_vm._t("default")],2)}
var lib_vue_loader_options_FormGroupvue_type_template_id_33838e8c_staticRenderFns = []


// CONCATENATED MODULE: ./FormGroup.vue?vue&type=template&id=33838e8c&

// CONCATENATED MODULE: /home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/thread-loader/dist/cjs.js!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/babel-loader/lib??ref--12-1!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js??ref--0-0!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib??vue-loader-options!./FormGroup.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var lib_vue_loader_options_FormGroupvue_type_script_lang_js_ = ({
  props: {
    label: {
      type: String,
      default: 'Default Label'
    }
  }
});
// CONCATENATED MODULE: ./FormGroup.vue?vue&type=script&lang=js&
 /* harmony default export */ var FormGroupvue_type_script_lang_js_ = (lib_vue_loader_options_FormGroupvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./FormGroup.vue?vue&type=style&index=0&lang=css&
var FormGroupvue_type_style_index_0_lang_css_ = __webpack_require__("00dc");

// CONCATENATED MODULE: /home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/runtime/componentNormalizer.js
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

// CONCATENATED MODULE: ./FormGroup.vue






/* normalize component */

var component = normalizeComponent(
  FormGroupvue_type_script_lang_js_,
  lib_vue_loader_options_FormGroupvue_type_template_id_33838e8c_render,
  lib_vue_loader_options_FormGroupvue_type_template_id_33838e8c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FormGroup = (component.exports);
// CONCATENATED MODULE: /home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"/home/jdm/Projects/tpp-ecommerce/odoo_sale_addons/website_tpp/vue/node_modules/.cache/vue-loader","cacheIdentifier":"61570f66-vue-loader-template"}!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js??ref--0-0!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib??vue-loader-options!./FieldInput.vue?vue&type=template&id=bb58cace&
var lib_vue_loader_options_FieldInputvue_type_template_id_bb58cace_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.listClasses()},[_c('label',{staticClass:"control-label",attrs:{"for":_vm.name}},[_vm._v("\n    "+_vm._s(_vm.label)+"\n  ")]),(_vm.isTextArea())?_c('textarea',{staticClass:"form-control",attrs:{"placeholder":_vm.placeholder,"rows":"3"},on:{"input":_vm.onInput}}):_vm._e(),(_vm.isInput())?_c('input',{staticClass:"form-control",attrs:{"type":_vm.type,"name":_vm.name,"placeholder":_vm.placeholder},domProps:{"value":_vm.value},on:{"input":_vm.onInput}}):_vm._e(),_c('small',{staticClass:"help-block"},[_vm._v("\n    "+_vm._s(_vm.helpText)+"\n  ")])])}
var lib_vue_loader_options_FieldInputvue_type_template_id_bb58cace_staticRenderFns = []


// CONCATENATED MODULE: ./FieldInput.vue?vue&type=template&id=bb58cace&

// CONCATENATED MODULE: ./validate.js
var validationTerms = {
  required: {
    isMatched: function isMatched(s) {
      return !/.+/.test(s);
    },
    helpState: 'isError',
    helpText: 'This field is required.'
  },
  email: {
    isMatched: function isMatched(s) {
      return !/[a-z]+@[a-z]+/.test(s);
    },
    helpState: 'isError',
    helpText: 'Please enter a valid email address.'
  }
};
function validate(s, t) {
  if (validationTerms[t].isMatched(s)) return validationTerms[t];
  return {
    helpText: '',
    helpState: ''
  };
}
// CONCATENATED MODULE: /home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/thread-loader/dist/cjs.js!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/babel-loader/lib??ref--12-1!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js??ref--0-0!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib??vue-loader-options!./FieldInput.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var lib_vue_loader_options_FieldInputvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      helpText: '',
      helpState: ''
    };
  },
  props: {
    label: {
      type: String,
      default: 'Default Label'
    },
    name: {
      type: String,
      default: 'Name'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    isInput: function isInput() {
      return this.type != "textarea";
    },
    isTextArea: function isTextArea() {
      return this.type == "textarea";
    },
    listClasses: function listClasses() {
      return {
        'form-group': true,
        'has-error': this.helpState == "isError",
        'has-warning': this.helpState == "isWarning",
        'has-success': this.helpState == "isSuccess"
      };
    },
    onInput: function onInput(event) {
      var v = validate(event.target.value, 'required');
      this.helpText = v.helpText;
      this.helpState = v.helpState;
      this.$emit('input', event.target.value);
    }
  }
});
// CONCATENATED MODULE: ./FieldInput.vue?vue&type=script&lang=js&
 /* harmony default export */ var FieldInputvue_type_script_lang_js_ = (lib_vue_loader_options_FieldInputvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./FieldInput.vue





/* normalize component */

var FieldInput_component = normalizeComponent(
  FieldInputvue_type_script_lang_js_,
  lib_vue_loader_options_FieldInputvue_type_template_id_bb58cace_render,
  lib_vue_loader_options_FieldInputvue_type_template_id_bb58cace_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FieldInput = (FieldInput_component.exports);
// CONCATENATED MODULE: /home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/thread-loader/dist/cjs.js!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/babel-loader/lib??ref--12-1!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js??ref--0-0!/home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib??vue-loader-options!./OrderForm.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var lib_vue_loader_options_OrderFormvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      sender: {
        name: 'Joe Blogs',
        phone: '02 94577909',
        email: 'joe@ogecko.com'
      },
      receiver: {
        name: 'Mary Blogs',
        phone: '02 94999909',
        email: 'mary@ogecko.com',
        address: '2 Railway Close, Gordon, 2022, NSW',
        special: 'Unit 5'
      },
      delivery: {
        days: '1/1/2018'
      },
      card: {
        from: 'Joe',
        to: 'Mary',
        message: 'Just for you'
      }
    };
  },
  components: {
    FormGroup: FormGroup,
    FieldInput: FieldInput
  }
});
// CONCATENATED MODULE: ./OrderForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var OrderFormvue_type_script_lang_js_ = (lib_vue_loader_options_OrderFormvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./OrderForm.vue





/* normalize component */

var OrderForm_component = normalizeComponent(
  OrderFormvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var OrderForm = (OrderForm_component.exports);
// CONCATENATED MODULE: /home/jdm/.nvm/versions/node/v10.7.0/lib/node_modules/@vue/cli-service-global/node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (OrderForm);



/***/ })

/******/ })["default"];
});
//# sourceMappingURL=order_form.umd.js.map