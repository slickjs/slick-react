import { Renderer, MetaKeys, inject, Model, Container, isDroppable } from 'slick';
import { createElement, Component, PropTypes } from 'react';
import { EventEmitter } from 'eventsjs';
import * as ReactDom from 'react-dom';
export { Component, createElement } from 'react';
export { Controller } from './controller'


interface RenderProps {
    mod: any;
    container: Container;
    options: any;
}

class Render extends Component<RenderProps, any> {
    model: any;
    count: number;
    constructor(props, context) {
        super(props, context);
        this.model = Reflect.getMetadata(MetaKeys.bindable, props.mod);

        this.count = 0;
        if (this.model) {
            this.model.on('change', this._onChange, this);
        }

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

    componentWilUnmount() {
        if (this.model) this.model.off('change', this._onChange, this);
    }

    drop () {
        if (isDroppable(this.props.mod)) {
            this.props.mod.drop();
        } 
    }

    static childContextTypes = {
        container: PropTypes.instanceOf(Container)
    }
}


@inject(MetaKeys.element)
export class ReactRenderer extends EventEmitter implements Renderer {
    model: Model
    private component: Render;
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


        this.component = ReactDom.render(createElement(Render, { container: container, mod: mod, options: options }), this.el)
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