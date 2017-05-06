import { Renderer, MetaKeys, inject, Model, Container, isDroppable } from 'slick';
import { createElement, Component, PropTypes } from 'react';
import { EventEmitter } from 'eventsjs';
import * as ReactDom from 'react-dom';
export { Component, createElement } from 'react';
export { Controller } from './controller'

function isFunction(a: any): a is Function {
    return typeof a === 'function';
}

interface RenderProps {
    mod: any;
    container: Container;
    options: any;
}

class ControllerRenderer extends Component<RenderProps, any> {
    model: any;
    count: number;
    constructor(props, context) {
        super(props, context);
        this.model = Reflect.getMetadata(MetaKeys.bindable, props.mod);
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
        return this.props.mod.render(this.props.options)
    }

    componentWillMount() {
        if (this.model) {
            this.model.on('change', this._onChange, this);
        }
        if (this.props.mod && isFunction(this.props.mod.componentWillMount)) {
            this.props.mod.componentWillMount()
        }
    }

    componentWillUnmount() {
        if (this.model) this.model.off('change', this._onChange, this);
        if (this.props.mod && isFunction(this.props.mod.componentWillUnmount)) {
            this.props.mod.componentWillUnmount()
        }
    }

    drop () {
        if (isDroppable(this.props.mod)) {
            this.props.mod.drop();
        } 
        if (this.model) {
            this.model.off('change', this._onChange, this);
        }
    }

    static childContextTypes = {
        container: PropTypes.instanceOf(Container)
    }
}


@inject(MetaKeys.element)
export class ReactRenderer extends EventEmitter implements Renderer {
    model: Model
    private component: ControllerRenderer;
    constructor(public el: Element) {
        super();
    }

    render(mod: any, container: Container, options?: any) {

        if (this.model) {
            this.stopListening(this.model);
        }

        this.model = Reflect.getMetadata(MetaKeys.bindable, mod);

        if (typeof mod.template === 'function') {
            return this._renderTemplate(mod);
        }

        if (typeof mod.render !== 'function') {
            throw new TypeError('the controller needs a render method');

        }

        this.component = ReactDom.render(createElement(ControllerRenderer, { container: container, mod: mod, options: options }), this.el)
    }

    private _renderTemplate(mod: any) {
        let out = ReactDom.render(createElement(mod.template(), mod), this.el);
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

}