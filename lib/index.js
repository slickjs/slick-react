"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const slick_1 = require("slick");
const react_1 = require("react");
const eventsjs_1 = require("eventsjs");
const ReactDom = require("react-dom");
var react_2 = require("react");
exports.Component = react_2.Component;
exports.createElement = react_2.createElement;
var controller_1 = require("./controller");
exports.Controller = controller_1.Controller;
const utils_1 = require("./utils");
class ControllerRenderer extends react_1.Component {
    constructor(props, context) {
        super(props, context);
        this.model = Reflect.getMetadata(slick_1.MetaKeys.bindable, props.mod);
        this.count = 0;
    }
    _onChange() {
        this.setState({
            renderCount: ++this.count
        });
    }
    getChildContext() {
        return { container: this.props.container };
    }
    render() {
        return this.props.mod.render(this.props.options);
    }
    componentWillMount() {
        if (this.model) {
            this.model.on('change', this._onChange, this);
        }
        if (this.props.mod && utils_1.isFunction(this.props.mod.componentWillMount)) {
            this.props.mod.componentWillMount();
        }
    }
    componentWillUnmount() {
        if (this.model)
            this.model.off('change', this._onChange, this);
        if (this.props.mod && utils_1.isFunction(this.props.mod.componentWillUnmount)) {
            this.props.mod.componentWillUnmount();
        }
    }
    drop() {
        if (slick_1.isDroppable(this.props.mod)) {
            this.props.mod.drop();
        }
        if (this.model) {
            this.model.off('change', this._onChange, this);
        }
    }
}
ControllerRenderer.childContextTypes = {
    container: react_1.PropTypes.instanceOf(slick_1.Container)
};
let ReactRenderer = class ReactRenderer extends eventsjs_1.EventEmitter {
    constructor(el) {
        super();
        this.el = el;
    }
    render(mod, container, options) {
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
    _renderTemplate(mod) {
        let out = ReactDom.render(react_1.createElement(mod.template(), mod), this.el);
        if (this.model) {
            this.listenTo(this.model, 'change', (o) => {
                out.setState(o);
            });
        }
    }
    drop() {
        this.destroy();
        ReactDom.unmountComponentAtNode(this.el);
        if (this.component) {
            this.component.drop();
        }
    }
};
ReactRenderer = tslib_1.__decorate([
    slick_1.inject(slick_1.MetaKeys.element),
    tslib_1.__metadata("design:paramtypes", [Element])
], ReactRenderer);
exports.ReactRenderer = ReactRenderer;
