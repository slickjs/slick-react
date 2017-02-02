import { Renderer, MetaKeys, inject, Model, Container } from 'slick';
import { createElement, Component, PropTypes } from 'react';
import { EventEmitter } from 'eventsjs';
import * as ReactDom from 'react-dom';
export { Component, createElement } from 'react';
export { Controller } from './controller'


class Render extends Component<any, any> {
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
        return this.props.mod.render()
    }

    componentWilUnmount() {
        if (this.model) this.model.off('change', this._onChange, this);
    }

    static childContextTypes = {
        container: PropTypes.any
    }
}


@inject(MetaKeys.element)
export class ReactRenderer extends EventEmitter implements Renderer {
    model: Model
    constructor(public el: Element) {
        super();
    }

    render(mod: any, container: Container) {

        if (this.model) {
            this.stopListening(this.model);
        }

        this.model = Reflect.getMetadata(MetaKeys.bindable, mod);

        if (typeof mod.template === 'function') {
            return this._renderTemplate(mod);
        }

        ReactDom.render(createElement(Render, { container: container, mod: mod }), this.el)
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
    }

}