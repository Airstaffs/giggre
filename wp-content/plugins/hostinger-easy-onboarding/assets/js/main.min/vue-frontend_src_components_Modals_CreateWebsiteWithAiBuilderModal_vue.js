"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["vue-frontend_src_components_Modals_CreateWebsiteWithAiBuilderModal_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-24!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=script&lang=ts&setup=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-24!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=script&lang=ts&setup=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*@__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  __name: 'BaseModal',
  props: {
    title: {
      type: String,
      required: false
    },
    subtitle: {
      type: String,
      required: false
    },
    titleIcon: {
      type: Object,
      required: false
    },
    titleAlignment: {
      type: String,
      required: false,
      "default": 'left'
    }
  },
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    var __returned__ = {};
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-24!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=script&lang=ts&setup=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-24!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=script&lang=ts&setup=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var _hostinger_hcomponents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @hostinger/hcomponents */ "./node_modules/@hostinger/hcomponents/dist/hcomponents.js");
/* harmony import */ var _vue_frontend_components_Modals_Base_BaseModal_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vue-frontend/components/Modals/Base/BaseModal.vue */ "./vue-frontend/src/components/Modals/Base/BaseModal.vue");
/* harmony import */ var _vue_frontend_composables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vue-frontend/composables */ "./vue-frontend/src/composables/index.ts");
/* harmony import */ var _vue_frontend_stores_generalDataStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @vue-frontend/stores/generalDataStore */ "./vue-frontend/src/stores/generalDataStore.ts");
/* harmony import */ var _vue_frontend_stores_onboardingStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @vue-frontend/stores/onboardingStore */ "./vue-frontend/src/stores/onboardingStore.ts");
/* harmony import */ var _vue_frontend_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @vue-frontend/types */ "./vue-frontend/src/types/index.ts");
/* harmony import */ var _vue_frontend_utils_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @vue-frontend/utils/helpers */ "./vue-frontend/src/utils/helpers/index.ts");
/* harmony import */ var _vue_frontend_utils_services_translation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @vue-frontend/utils/services/translation */ "./vue-frontend/src/utils/services/translation.ts");
/* harmony import */ var vue3_toastify__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vue3-toastify */ "./node_modules/vue3-toastify/dist/index.mjs");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }











/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*@__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  __name: 'CreateWebsiteWithAiBuilderModal',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    var _useAmplitudeEvent = (0,_vue_frontend_composables__WEBPACK_IMPORTED_MODULE_3__.useAmplitudeEvent)(),
      sendAmplitudeEvent = _useAmplitudeEvent.sendAmplitudeEvent;
    var _useOnboardingStore = (0,_vue_frontend_stores_onboardingStore__WEBPACK_IMPORTED_MODULE_5__.useOnboardingStore)(),
      setStepIsCompleted = _useOnboardingStore.setStepIsCompleted;
    var _useGeneralDataStore = (0,_vue_frontend_stores_generalDataStore__WEBPACK_IMPORTED_MODULE_4__.useGeneralDataStore)(),
      astraPluginState = _useGeneralDataStore.astraPluginState,
      astraThemeState = _useGeneralDataStore.astraThemeState,
      siteUrl = _useGeneralDataStore.siteUrl,
      aiThemeState = _useGeneralDataStore.aiThemeState,
      adminPath = _useGeneralDataStore.adminPath;
    var isLoading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)({
      ai: false,
      themes: false
    });
    var isDisabled = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
      return Object.values(isLoading).some(Boolean);
    });
    var websiteOptions = [{
      id: 'ai',
      image: 'images/build-with-ai.png',
      title: (0,_vue_frontend_utils_services_translation__WEBPACK_IMPORTED_MODULE_8__.translate)('hostinger_create_website_with_ai'),
      description: (0,_vue_frontend_utils_services_translation__WEBPACK_IMPORTED_MODULE_8__.translate)('hostinger_ai_website_builder_description'),
      linkText: (0,_vue_frontend_utils_services_translation__WEBPACK_IMPORTED_MODULE_8__.translate)('hostinger_easy_onboarding_create_with_ai'),
      onClick: function () {
        var _onClick = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var _useThemeActivation, installAndActivateTheme, _yield$installAndActi, _yield$installAndActi2, _, themeError;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _useThemeActivation = (0,_vue_frontend_composables__WEBPACK_IMPORTED_MODULE_3__.useThemeActivation)(), installAndActivateTheme = _useThemeActivation.installAndActivateTheme;
                isLoading.ai = true;
                _context.next = 4;
                return installAndActivateTheme({
                  slug: _vue_frontend_types__WEBPACK_IMPORTED_MODULE_6__.THEME_SLUG.HOSTINGER_AI_THEME,
                  isThemeInstalled: aiThemeState.isInstalled,
                  isThemeActivated: aiThemeState.isActive,
                  isHostingerAiTheme: true
                });
              case 4:
                _yield$installAndActi = _context.sent;
                _yield$installAndActi2 = _slicedToArray(_yield$installAndActi, 2);
                _ = _yield$installAndActi2[0];
                themeError = _yield$installAndActi2[1];
                if (themeError) {
                  vue3_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.error((0,_vue_frontend_utils_services_translation__WEBPACK_IMPORTED_MODULE_8__.translate)('hostinger_easy_onboarding_installation_failed'));
                } else {
                  window.location.href = "".concat(siteUrl + adminPath, "admin.php?page=hostinger-ai-website-creation");
                }
              case 9:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        function onClick() {
          return _onClick.apply(this, arguments);
        }
        return onClick;
      }(),
      dataQa: 'ai-website-option'
    }, {
      id: 'themes',
      image: 'images/pre-built-themes.png',
      title: (0,_vue_frontend_utils_services_translation__WEBPACK_IMPORTED_MODULE_8__.translate)('hostinger_pre_built_websites_and_themes'),
      description: (0,_vue_frontend_utils_services_translation__WEBPACK_IMPORTED_MODULE_8__.translate)('hostinger_themes_description'),
      linkText: (0,_vue_frontend_utils_services_translation__WEBPACK_IMPORTED_MODULE_8__.translate)('hostinger_easy_onboarding_pre_built_websites_and_themes'),
      onClick: function () {
        var _onClick2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var _usePluginActivation, installAndActivatePlugin, _useThemeActivation2, installAndActivateTheme, _yield$installAndActi3, _yield$installAndActi4, themeError, _yield$installAndActi5, _yield$installAndActi6, pluginError;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _usePluginActivation = (0,_vue_frontend_composables__WEBPACK_IMPORTED_MODULE_3__.usePluginActivation)(), installAndActivatePlugin = _usePluginActivation.installAndActivatePlugin;
                _useThemeActivation2 = (0,_vue_frontend_composables__WEBPACK_IMPORTED_MODULE_3__.useThemeActivation)(), installAndActivateTheme = _useThemeActivation2.installAndActivateTheme;
                isLoading.themes = true;
                _context2.next = 5;
                return installAndActivateTheme({
                  slug: _vue_frontend_types__WEBPACK_IMPORTED_MODULE_6__.THEME_SLUG.ASTRA,
                  isThemeInstalled: astraThemeState.isInstalled,
                  isThemeActivated: astraThemeState.isActive
                });
              case 5:
                _yield$installAndActi3 = _context2.sent;
                _yield$installAndActi4 = _slicedToArray(_yield$installAndActi3, 2);
                themeError = _yield$installAndActi4[1];
                _context2.next = 10;
                return installAndActivatePlugin({
                  slug: _vue_frontend_types__WEBPACK_IMPORTED_MODULE_6__.PLUGIN_SLUG.ASTRA_SITES,
                  isInstalled: astraPluginState.isInstalled,
                  isActive: astraPluginState.isActive
                });
              case 10:
                _yield$installAndActi5 = _context2.sent;
                _yield$installAndActi6 = _slicedToArray(_yield$installAndActi5, 2);
                pluginError = _yield$installAndActi6[1];
                // Extract the actual errors from each result
                // Check if either operation had an error
                if (pluginError || themeError) {
                  vue3_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.error((0,_vue_frontend_utils_services_translation__WEBPACK_IMPORTED_MODULE_8__.translate)('hostinger_easy_onboarding_installation_failed'));
                  isLoading.themes = false;
                } else {
                  window.location.href = "".concat(siteUrl + adminPath, "themes.php?page=starter-templates&ci=1");
                }
              case 14:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        function onClick() {
          return _onClick2.apply(this, arguments);
        }
        return onClick;
      }(),
      dataQa: 'themes-website-option'
    }];
    var __returned__ = {
      sendAmplitudeEvent: sendAmplitudeEvent,
      setStepIsCompleted: setStepIsCompleted,
      astraPluginState: astraPluginState,
      astraThemeState: astraThemeState,
      siteUrl: siteUrl,
      aiThemeState: aiThemeState,
      adminPath: adminPath,
      isLoading: isLoading,
      isDisabled: isDisabled,
      websiteOptions: websiteOptions,
      get HIcon() {
        return _hostinger_hcomponents__WEBPACK_IMPORTED_MODULE_1__.HIcon;
      },
      BaseModal: _vue_frontend_components_Modals_Base_BaseModal_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
      get getAssetSource() {
        return _vue_frontend_utils_helpers__WEBPACK_IMPORTED_MODULE_7__.getAssetSource;
      },
      get translate() {
        return _vue_frontend_utils_services_translation__WEBPACK_IMPORTED_MODULE_8__.translate;
      }
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-24!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=template&id=55e26cde&scoped=true&ts=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-24!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=template&id=55e26cde&scoped=true&ts=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "base-modal"
};
var _hoisted_2 = {
  key: 1,
  "class": "base-modal__title"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_HIcon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("HIcon");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["base-modal__title-container", {
      'base-modal__title-container--centered': $props.titleAlignment === 'centered'
    }])
  }, [$props.titleIcon ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_HIcon, {
    key: 0,
    "class": "h-mr-8",
    name: $props.titleIcon.name,
    color: $props.titleIcon.color
  }, null, 8 /* PROPS */, ["name", "color"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $props.title ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("h2", _hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.title), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */), $props.subtitle ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
    key: 0,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["base-modal__subtitle", {
      'base-modal__subtitle--centered': $props.titleAlignment === 'centered'
    }])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.subtitle), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderSlot)(_ctx.$slots, "default", {}, undefined, true)]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-24!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=template&id=36641848&scoped=true&ts=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-24!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=template&id=36641848&scoped=true&ts=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "create-website-options"
};
var _hoisted_2 = ["data-qa", "onClick"];
var _hoisted_3 = {
  "class": "create-website-option__image"
};
var _hoisted_4 = ["src", "alt"];
var _hoisted_5 = {
  "class": "create-website-option__content"
};
var _hoisted_6 = {
  "class": "create-website-option__description"
};
var _hoisted_7 = {
  "class": "create-website-option__link"
};
var _hoisted_8 = {
  "class": "create-website-option__title text-bold-2"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_HCircleLoader = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("HCircleLoader");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)($setup["BaseModal"], {
    title: $setup.translate('hostinger_start_creating_your_site'),
    "has-close-button": "",
    size: "large",
    "data-qa": "create-website-modal"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.websiteOptions, function (option) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
          key: option.id,
          "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["create-website-option", ["create-website-option--".concat(option.id), {
            'create-website-option--disabled': $setup.isDisabled && !$setup.isLoading[option.id]
          }]]),
          "data-qa": option.dataQa,
          onClick: function onClick($event) {
            return !$setup.isDisabled && option.onClick();
          }
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
          src: $setup.getAssetSource(option.image),
          alt: option.title,
          "class": "create-website-option__img"
        }, null, 8 /* PROPS */, _hoisted_4)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.isLoading[option.id] ? $setup.translate('hostinger_easy_onboarding_setting_up') : option.linkText), 1 /* TEXT */), !$setup.isLoading[option.id] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)($setup["HIcon"], {
          key: 0,
          name: "ic-chevron-right-16",
          color: "neutral--600",
          "class": "create-website-option__icon"
        })) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_HCircleLoader, {
          key: 1,
          size: "small"
        }))])])], 10 /* CLASS, PROPS */, _hoisted_2);
      }), 64 /* STABLE_FRAGMENT */))])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["title"]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-14.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-14.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-14.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=style&index=0&id=55e26cde&lang=scss&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-14.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-14.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-14.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=style&index=0&id=55e26cde&lang=scss&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".base-modal__title-container[data-v-55e26cde] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 4px;\n  justify-content: flex-start;\n}\n.base-modal__title-container--centered[data-v-55e26cde] {\n  justify-content: center;\n}\n.base-modal__title[data-v-55e26cde] {\n  font-size: 20px;\n  color: var(--neutral--600);\n  margin: 0;\n  font-weight: 700;\n}\n.base-modal__subtitle[data-v-55e26cde] {\n  font-size: 14px;\n  margin-top: 4px;\n  margin-bottom: 24px;\n  color: var(--neutral--300);\n}\n.base-modal__subtitle--centered[data-v-55e26cde] {\n  text-align: center;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-14.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-14.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-14.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=style&index=0&id=36641848&lang=scss&scoped=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-14.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-14.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-14.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=style&index=0&id=36641848&lang=scss&scoped=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".create-website-options[data-v-36641848] {\n  display: flex;\n  gap: 24px;\n  margin: 24px 0;\n}\n.create-website-option[data-v-36641848] {\n  flex: 1;\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--neutral--200);\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  cursor: pointer;\n}\n.create-website-option[data-v-36641848]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);\n}\n.create-website-option:hover .create-website-option__icon[data-v-36641848] {\n  transform: translateX(4px);\n}\n.create-website-option__image[data-v-36641848] {\n  height: 180px;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  border-bottom: 1px solid var(--neutral--200);\n}\n.create-website-option__img[data-v-36641848] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.create-website-option__content[data-v-36641848] {\n  padding: 20px 24px;\n}\n.create-website-option__title[data-v-36641848] {\n  margin: 0;\n  color: var(--neutral--600);\n}\n.create-website-option__description[data-v-36641848] {\n  color: var(--neutral--300);\n  margin-bottom: 24px;\n  line-height: 1.5;\n}\n.create-website-option__link[data-v-36641848] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  color: var(--neutral--600);\n  font-weight: 500;\n  cursor: pointer;\n}\n.create-website-option__icon[data-v-36641848] {\n  transition: transform 0.2s;\n}\n.create-website-option--ai .create-website-option__image[data-v-36641848] {\n  background: linear-gradient(to right, var(--primary--700), var(--primary--900));\n}\n.create-website-option--themes .create-website-option__image[data-v-36641848] {\n  background: var(--h-color-grey-100);\n}\n.create-website-option--disabled[data-v-36641848] {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.create-website-option--disabled[data-v-36641848]:hover {\n  transform: none;\n  box-shadow: none;\n}\n.create-website-option--disabled:hover .create-website-option__icon[data-v-36641848] {\n  transform: none;\n}\n@media (max-width: 768px) {\n.create-website-options[data-v-36641848] {\n    flex-direction: column;\n    max-width: 616px;\n}\n.create-website-option[data-v-36641848] {\n    margin-bottom: 16px;\n}\n.create-website-option__image[data-v-36641848] {\n    height: 180px;\n}\n.create-website-option__content[data-v-36641848] {\n    padding: 16px;\n}\n.create-website-option__title[data-v-36641848] {\n    font-size: 18px;\n    margin-bottom: 8px;\n}\n.create-website-option__description[data-v-36641848] {\n    margin-bottom: 16px;\n}\n}\n.vs-code-gradient[data-v-36641848] {\n  background: linear-gradient(90deg, var(--primary--700), var(--primary--900));\n  padding: 8px 16px;\n  border-radius: 4px;\n  background: var(--neutral--100);\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-14.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-14.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-14.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=style&index=0&id=55e26cde&lang=scss&scoped=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-14.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-14.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-14.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=style&index=0&id=55e26cde&lang=scss&scoped=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_14_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_14_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_14_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseModal_vue_vue_type_style_index_0_id_55e26cde_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-14.use[1]!../../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-14.use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-14.use[3]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BaseModal.vue?vue&type=style&index=0&id=55e26cde&lang=scss&scoped=true */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-14.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-14.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-14.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=style&index=0&id=55e26cde&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_14_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_14_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_14_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseModal_vue_vue_type_style_index_0_id_55e26cde_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_14_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_14_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_14_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseModal_vue_vue_type_style_index_0_id_55e26cde_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-14.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-14.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-14.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=style&index=0&id=36641848&lang=scss&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-14.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-14.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-14.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=style&index=0&id=36641848&lang=scss&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_14_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_14_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_14_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateWebsiteWithAiBuilderModal_vue_vue_type_style_index_0_id_36641848_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-14.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-14.use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-14.use[3]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CreateWebsiteWithAiBuilderModal.vue?vue&type=style&index=0&id=36641848&lang=scss&scoped=true */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-14.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-14.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-14.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=style&index=0&id=36641848&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_14_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_14_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_14_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateWebsiteWithAiBuilderModal_vue_vue_type_style_index_0_id_36641848_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_14_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_14_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_14_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateWebsiteWithAiBuilderModal_vue_vue_type_style_index_0_id_36641848_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./vue-frontend/src/components/Modals/Base/BaseModal.vue":
/*!***************************************************************!*\
  !*** ./vue-frontend/src/components/Modals/Base/BaseModal.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseModal_vue_vue_type_template_id_55e26cde_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseModal.vue?vue&type=template&id=55e26cde&scoped=true&ts=true */ "./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=template&id=55e26cde&scoped=true&ts=true");
/* harmony import */ var _BaseModal_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseModal.vue?vue&type=script&lang=ts&setup=true */ "./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=script&lang=ts&setup=true");
/* harmony import */ var _BaseModal_vue_vue_type_style_index_0_id_55e26cde_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseModal.vue?vue&type=style&index=0&id=55e26cde&lang=scss&scoped=true */ "./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=style&index=0&id=55e26cde&lang=scss&scoped=true");
/* harmony import */ var _Users_daniels_martinovs_Sites_wordpress_ai_builder_wp_content_plugins_hostinger_easy_onboarding_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_Users_daniels_martinovs_Sites_wordpress_ai_builder_wp_content_plugins_hostinger_easy_onboarding_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_BaseModal_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_BaseModal_vue_vue_type_template_id_55e26cde_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-55e26cde"],['__file',"vue-frontend/src/components/Modals/Base/BaseModal.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=script&lang=ts&setup=true":
/*!**************************************************************************************************!*\
  !*** ./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=script&lang=ts&setup=true ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_24_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseModal_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_24_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseModal_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/ts-loader/index.js??clonedRuleSet-24!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BaseModal.vue?vue&type=script&lang=ts&setup=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-24!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=script&lang=ts&setup=true");
 

/***/ }),

/***/ "./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=style&index=0&id=55e26cde&lang=scss&scoped=true":
/*!************************************************************************************************************************!*\
  !*** ./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=style&index=0&id=55e26cde&lang=scss&scoped=true ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_14_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_14_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_14_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseModal_vue_vue_type_style_index_0_id_55e26cde_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-14.use[1]!../../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-14.use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-14.use[3]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BaseModal.vue?vue&type=style&index=0&id=55e26cde&lang=scss&scoped=true */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-14.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-14.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-14.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=style&index=0&id=55e26cde&lang=scss&scoped=true");


/***/ }),

/***/ "./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=template&id=55e26cde&scoped=true&ts=true":
/*!*****************************************************************************************************************!*\
  !*** ./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=template&id=55e26cde&scoped=true&ts=true ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_24_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseModal_vue_vue_type_template_id_55e26cde_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_24_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BaseModal_vue_vue_type_template_id_55e26cde_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/ts-loader/index.js??clonedRuleSet-24!../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BaseModal.vue?vue&type=template&id=55e26cde&scoped=true&ts=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-24!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/Base/BaseModal.vue?vue&type=template&id=55e26cde&scoped=true&ts=true");


/***/ }),

/***/ "./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue":
/*!********************************************************************************!*\
  !*** ./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CreateWebsiteWithAiBuilderModal_vue_vue_type_template_id_36641848_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateWebsiteWithAiBuilderModal.vue?vue&type=template&id=36641848&scoped=true&ts=true */ "./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=template&id=36641848&scoped=true&ts=true");
/* harmony import */ var _CreateWebsiteWithAiBuilderModal_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateWebsiteWithAiBuilderModal.vue?vue&type=script&lang=ts&setup=true */ "./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=script&lang=ts&setup=true");
/* harmony import */ var _CreateWebsiteWithAiBuilderModal_vue_vue_type_style_index_0_id_36641848_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateWebsiteWithAiBuilderModal.vue?vue&type=style&index=0&id=36641848&lang=scss&scoped=true */ "./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=style&index=0&id=36641848&lang=scss&scoped=true");
/* harmony import */ var _Users_daniels_martinovs_Sites_wordpress_ai_builder_wp_content_plugins_hostinger_easy_onboarding_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_Users_daniels_martinovs_Sites_wordpress_ai_builder_wp_content_plugins_hostinger_easy_onboarding_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_CreateWebsiteWithAiBuilderModal_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_CreateWebsiteWithAiBuilderModal_vue_vue_type_template_id_36641848_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-36641848"],['__file',"vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=script&lang=ts&setup=true":
/*!*******************************************************************************************************************!*\
  !*** ./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=script&lang=ts&setup=true ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_24_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateWebsiteWithAiBuilderModal_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_24_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateWebsiteWithAiBuilderModal_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/ts-loader/index.js??clonedRuleSet-24!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CreateWebsiteWithAiBuilderModal.vue?vue&type=script&lang=ts&setup=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-24!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=script&lang=ts&setup=true");
 

/***/ }),

/***/ "./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=style&index=0&id=36641848&lang=scss&scoped=true":
/*!*****************************************************************************************************************************************!*\
  !*** ./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=style&index=0&id=36641848&lang=scss&scoped=true ***!
  \*****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_14_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_14_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_14_use_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateWebsiteWithAiBuilderModal_vue_vue_type_style_index_0_id_36641848_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-14.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-14.use[2]!../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-14.use[3]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CreateWebsiteWithAiBuilderModal.vue?vue&type=style&index=0&id=36641848&lang=scss&scoped=true */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-14.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-14.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-14.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=style&index=0&id=36641848&lang=scss&scoped=true");


/***/ }),

/***/ "./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=template&id=36641848&scoped=true&ts=true":
/*!**********************************************************************************************************************************!*\
  !*** ./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=template&id=36641848&scoped=true&ts=true ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_24_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateWebsiteWithAiBuilderModal_vue_vue_type_template_id_36641848_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_ts_loader_index_js_clonedRuleSet_24_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateWebsiteWithAiBuilderModal_vue_vue_type_template_id_36641848_scoped_true_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/ts-loader/index.js??clonedRuleSet-24!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CreateWebsiteWithAiBuilderModal.vue?vue&type=template&id=36641848&scoped=true&ts=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/ts-loader/index.js??clonedRuleSet-24!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./vue-frontend/src/components/Modals/CreateWebsiteWithAiBuilderModal.vue?vue&type=template&id=36641848&scoped=true&ts=true");


/***/ })

}]);