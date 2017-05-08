"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const slick_1 = require("slick");
const utils_1 = require("./utils");
class Controller extends React.Component {
    constructor(props, context) {
        super(props, context);
        if (!this.props.name) {
            throw new Error('no name');
        }
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.name !== this.props.name;
    }
    mountController(el) {
        this.mount = el;
        let name = this.props.name;
        let factory = this.context.container.get(name);
        factory.create({
            el: this.mount,
            options: this.props.options
        }).then(mod => {
            this.controller = mod;
            //this.renderer = factory.container.get(MetaKeys.renderer);
        });
    }
    componentWillUnmount() {
        this._call('componentWillUnmount');
        if (slick_1.isDroppable(this.controller)) {
            this.controller.drop();
        }
        this.controller = null;
    }
    componentWillMount() {
        this._call('componentWillMount');
    }
    componentDidMount() {
        this._call('componentDidMount');
    }
    componentDidUpdate() {
        this._call('componentDidUpdate');
    }
    _call(fn) {
        if (this.controller && utils_1.isFunction(this.controller[fn])) {
            this.controller[fn].call(this.controller);
        }
    }
    render() {
        return React.createElement("div", { ref: (i) => this.mountController(i) });
    }
}
Controller.contextTypes = { container: React.PropTypes.instanceOf(slick_1.Container) };
exports.Controller = Controller;
