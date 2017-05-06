(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("slick"), require("react"), require("eventsjs"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["slick", "react", "eventsjs", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["react"] = factory(require("slick"), require("react"), require("eventsjs"), require("react-dom"));
	else
		root["slick"] = root["slick"] || {}, root["slick"]["react"] = factory(root["slick"], root["React"], root["eventsjs"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = __webpack_require__(1);
	var slick_1 = __webpack_require__(2);
	var react_1 = __webpack_require__(3);
	var eventsjs_1 = __webpack_require__(4);
	var ReactDom = __webpack_require__(5);
	var react_2 = __webpack_require__(3);
	exports.Component = react_2.Component;
	exports.createElement = react_2.createElement;
	var controller_1 = __webpack_require__(6);
	exports.Controller = controller_1.Controller;
	function isFunction(a) {
	    return typeof a === 'function';
	}

	var ControllerRenderer = function (_react_1$Component) {
	    _inherits(ControllerRenderer, _react_1$Component);

	    function ControllerRenderer(props, context) {
	        _classCallCheck(this, ControllerRenderer);

	        var _this = _possibleConstructorReturn(this, (ControllerRenderer.__proto__ || Object.getPrototypeOf(ControllerRenderer)).call(this, props, context));

	        _this.model = Reflect.getMetadata(slick_1.MetaKeys.bindable, props.mod);
	        _this.count = 0;
	        return _this;
	    }

	    _createClass(ControllerRenderer, [{
	        key: "_onChange",
	        value: function _onChange() {
	            this.setState({
	                renderCount: ++this.count
	            });
	        }
	    }, {
	        key: "getChildContext",
	        value: function getChildContext() {
	            return { container: this.props.container };
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return this.props.mod.render(this.props.options);
	        }
	    }, {
	        key: "componentWillMount",
	        value: function componentWillMount() {
	            if (this.model) {
	                this.model.on('change', this._onChange, this);
	            }
	            if (this.props.mod && isFunction(this.props.mod.componentWillMount)) {
	                this.props.mod.componentWillMount();
	            }
	        }
	    }, {
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	            if (this.model) this.model.off('change', this._onChange, this);
	            if (this.props.mod && isFunction(this.props.mod.componentWillUnmount)) {
	                this.props.mod.componentWillUnmount();
	            }
	        }
	    }, {
	        key: "drop",
	        value: function drop() {
	            if (slick_1.isDroppable(this.props.mod)) {
	                this.props.mod.drop();
	            }
	            if (this.model) {
	                this.model.off('change', this._onChange, this);
	            }
	        }
	    }]);

	    return ControllerRenderer;
	}(react_1.Component);

	ControllerRenderer.childContextTypes = {
	    container: react_1.PropTypes.instanceOf(slick_1.Container)
	};
	var ReactRenderer = function (_eventsjs_1$EventEmit) {
	    _inherits(ReactRenderer, _eventsjs_1$EventEmit);

	    function ReactRenderer(el) {
	        _classCallCheck(this, ReactRenderer);

	        var _this2 = _possibleConstructorReturn(this, (ReactRenderer.__proto__ || Object.getPrototypeOf(ReactRenderer)).call(this));

	        _this2.el = el;
	        return _this2;
	    }

	    _createClass(ReactRenderer, [{
	        key: "render",
	        value: function render(mod, container, options) {
	            if (this.model) {
	                this.stopListening(this.model);
	            }
	            this.model = Reflect.getMetadata(slick_1.MetaKeys.bindable, mod);
	            if (typeof mod.template === 'function') {
	                return this._renderTemplate(mod);
	            }
	            if (typeof mod.render !== 'function') {
	                throw new TypeError('the controller needs a render method');
	            }
	            this.component = ReactDom.render(react_1.createElement(ControllerRenderer, { container: container, mod: mod, options: options }), this.el);
	        }
	    }, {
	        key: "_renderTemplate",
	        value: function _renderTemplate(mod) {
	            var out = ReactDom.render(react_1.createElement(mod.template(), mod), this.el);
	            if (this.model) {
	                this.listenTo(this.model, 'change', function (o) {
	                    out.setState(o);
	                });
	            }
	        }
	    }, {
	        key: "drop",
	        value: function drop() {
	            this.destroy();
	            ReactDom.unmountComponentAtNode(this.el);
	            if (this.component) {
	                this.component.drop();
	            }
	        }
	    }]);

	    return ReactRenderer;
	}(eventsjs_1.EventEmitter);
	ReactRenderer = tslib_1.__decorate([slick_1.inject(slick_1.MetaKeys.element), tslib_1.__metadata("design:paramtypes", [Element])], ReactRenderer);
	exports.ReactRenderer = ReactRenderer;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	/* global global, define, System, Reflect, Promise */
	var __extends;
	var __assign;
	var __rest;
	var __decorate;
	var __param;
	var __metadata;
	var __awaiter;
	var __generator;
	var __exportStar;
	var __values;
	var __read;
	var __spread;
	var _await;
	var __asyncGenerator;
	var __asyncDelegator;
	var __asyncValues;
	(function (factory) {
	    var root = (typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" ? global : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : _typeof(this) === "object" ? this : {};
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (exports) {
	            factory(createExporter(root, createExporter(exports)));
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
	        factory(createExporter(root, createExporter(module.exports)));
	    } else {
	        factory(createExporter(root));
	    }
	    function createExporter(exports, previous) {
	        return function (id, v) {
	            return exports[id] = previous ? previous(id, v) : v;
	        };
	    }
	})(function (exporter) {
	    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
	        d.__proto__ = b;
	    } || function (d, b) {
	        for (var p in b) {
	            if (b.hasOwnProperty(p)) d[p] = b[p];
	        }
	    };

	    __extends = function __extends(d, b) {
	        extendStatics(d, b);
	        function __() {
	            this.constructor = d;
	        }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };

	    __assign = Object.assign || function (t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) {
	                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	            }
	        }
	        return t;
	    };

	    __rest = function __rest(s, e) {
	        var t = {};
	        for (var p in s) {
	            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	        }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	            if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
	        }return t;
	    };

	    __decorate = function __decorate(decorators, target, key, desc) {
	        var c = arguments.length,
	            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	            d;
	        if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	            if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	        }return c > 3 && r && Object.defineProperty(target, key, r), r;
	    };

	    __param = function __param(paramIndex, decorator) {
	        return function (target, key) {
	            decorator(target, key, paramIndex);
	        };
	    };

	    __metadata = function __metadata(metadataKey, metadataValue) {
	        if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
	    };

	    __awaiter = function __awaiter(thisArg, _arguments, P, generator) {
	        return new (P || (P = Promise))(function (resolve, reject) {
	            function fulfilled(value) {
	                try {
	                    step(generator.next(value));
	                } catch (e) {
	                    reject(e);
	                }
	            }
	            function rejected(value) {
	                try {
	                    step(generator["throw"](value));
	                } catch (e) {
	                    reject(e);
	                }
	            }
	            function step(result) {
	                result.done ? resolve(result.value) : new P(function (resolve) {
	                    resolve(result.value);
	                }).then(fulfilled, rejected);
	            }
	            step((generator = generator.apply(thisArg, _arguments || [])).next());
	        });
	    };

	    __generator = function __generator(thisArg, body) {
	        var _ = { label: 0, sent: function sent() {
	                if (t[0] & 1) throw t[1];return t[1];
	            }, trys: [], ops: [] },
	            f,
	            y,
	            t,
	            g;
	        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
	            return this;
	        }), g;
	        function verb(n) {
	            return function (v) {
	                return step([n, v]);
	            };
	        }
	        function step(op) {
	            if (f) throw new TypeError("Generator is already executing.");
	            while (_) {
	                try {
	                    if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
	                    if (y = 0, t) op = [0, t.value];
	                    switch (op[0]) {
	                        case 0:case 1:
	                            t = op;break;
	                        case 4:
	                            _.label++;return { value: op[1], done: false };
	                        case 5:
	                            _.label++;y = op[1];op = [0];continue;
	                        case 7:
	                            op = _.ops.pop();_.trys.pop();continue;
	                        default:
	                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
	                                _ = 0;continue;
	                            }
	                            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
	                                _.label = op[1];break;
	                            }
	                            if (op[0] === 6 && _.label < t[1]) {
	                                _.label = t[1];t = op;break;
	                            }
	                            if (t && _.label < t[2]) {
	                                _.label = t[2];_.ops.push(op);break;
	                            }
	                            if (t[2]) _.ops.pop();
	                            _.trys.pop();continue;
	                    }
	                    op = body.call(thisArg, _);
	                } catch (e) {
	                    op = [6, e];y = 0;
	                } finally {
	                    f = t = 0;
	                }
	            }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
	        }
	    };

	    __exportStar = function __exportStar(m, exports) {
	        for (var p in m) {
	            if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	        }
	    };

	    __values = function __values(o) {
	        var m = typeof Symbol === "function" && o[Symbol.iterator],
	            i = 0;
	        if (m) return m.call(o);
	        return {
	            next: function next() {
	                if (o && i >= o.length) o = void 0;
	                return { value: o && o[i++], done: !o };
	            }
	        };
	    };

	    __read = function __read(o, n) {
	        var m = typeof Symbol === "function" && o[Symbol.iterator];
	        if (!m) return o;
	        var i = m.call(o),
	            r,
	            ar = [],
	            e;
	        try {
	            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
	                ar.push(r.value);
	            }
	        } catch (error) {
	            e = { error: error };
	        } finally {
	            try {
	                if (r && !r.done && (m = i["return"])) m.call(i);
	            } finally {
	                if (e) throw e.error;
	            }
	        }
	        return ar;
	    };

	    __spread = function __spread() {
	        for (var ar = [], i = 0; i < arguments.length; i++) {
	            ar = ar.concat(__read(arguments[i]));
	        }return ar;
	    };

	    _await = function __await(v) {
	        return this instanceof _await ? (this.v = v, this) : new _await(v);
	    };

	    __asyncGenerator = function __asyncGenerator(thisArg, _arguments, generator) {
	        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	        var g = generator.apply(thisArg, _arguments || []),
	            i,
	            q = [];
	        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
	            return this;
	        }, i;
	        function verb(n) {
	            if (g[n]) i[n] = function (v) {
	                return new Promise(function (a, b) {
	                    q.push([n, v, a, b]) > 1 || resume(n, v);
	                });
	            };
	        }
	        function resume(n, v) {
	            try {
	                step(g[n](v));
	            } catch (e) {
	                settle(q[0][3], e);
	            }
	        }
	        function step(r) {
	            r.value instanceof _await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
	        }
	        function fulfill(value) {
	            resume("next", value);
	        }
	        function reject(value) {
	            resume("throw", value);
	        }
	        function settle(f, v) {
	            if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
	        }
	    };

	    __asyncDelegator = function __asyncDelegator(o) {
	        var i, p;
	        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.iterator] = function () {
	            return this;
	        }, i;
	        function verb(n) {
	            if (o[n]) i[n] = function (v) {
	                return (p = !p) ? { value: _await(o[n](v)), done: n === "return" } : v;
	            };
	        }
	    };

	    __asyncValues = function __asyncValues(o) {
	        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	        var m = o[Symbol.asyncIterator];
	        return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
	    };

	    exporter("__extends", __extends);
	    exporter("__assign", __assign);
	    exporter("__rest", __rest);
	    exporter("__decorate", __decorate);
	    exporter("__param", __param);
	    exporter("__metadata", __metadata);
	    exporter("__awaiter", __awaiter);
	    exporter("__generator", __generator);
	    exporter("__exportStar", __exportStar);
	    exporter("__values", __values);
	    exporter("__read", __read);
	    exporter("__spread", __spread);
	    exporter("__await", _await);
	    exporter("__asyncGenerator", __asyncGenerator);
	    exporter("__asyncDelegator", __asyncDelegator);
	    exporter("__asyncValues", __asyncValues);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	Object.defineProperty(exports, "__esModule", { value: true });
	var React = __webpack_require__(3);
	var slick_1 = __webpack_require__(2);

	var Controller = function (_React$Component) {
	    _inherits(Controller, _React$Component);

	    function Controller(props, context) {
	        _classCallCheck(this, Controller);

	        var _this = _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this, props, context));

	        if (!_this.props.name) {
	            throw new Error('no name');
	        }
	        return _this;
	    }

	    _createClass(Controller, [{
	        key: "shouldComponentUpdate",
	        value: function shouldComponentUpdate(nextProps) {
	            return nextProps.name !== this.props.name;
	        }
	    }, {
	        key: "mountController",
	        value: function mountController(el) {
	            var _this2 = this;

	            this.mount = el;
	            var name = this.props.name;
	            var factory = this.context.container.get(name);
	            factory.create({
	                el: this.mount,
	                options: this.props.options
	            }).then(function (mod) {
	                _this2.controller = mod;
	                _this2.renderer = factory.container.get(slick_1.MetaKeys.renderer);
	            });
	        }
	    }, {
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	            if (slick_1.isDroppable(this.controller)) {
	                this.controller.drop();
	            }
	            this.controller = null;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this3 = this;

	            return React.createElement("div", { ref: function ref(i) {
	                    return _this3.mountController(i);
	                } });
	        }
	    }]);

	    return Controller;
	}(React.Component);

	Controller.contextTypes = { container: React.PropTypes.instanceOf(slick_1.Container) };
	exports.Controller = Controller;

/***/ }
/******/ ])
});
;