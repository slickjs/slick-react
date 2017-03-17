import * as React from 'react';
import {Container, Renderer, MetaKeys, isDroppable} from 'slick'

export interface ControllerProperties {
    name:string;
    options?: any;
}

export class Controller extends React.Component<ControllerProperties,any> {
    mount:  Element
    renderer: Renderer;
    controller: any;
    constructor(props, context) {
        super(props, context)
        if (!this.props.name) {
            throw new Error('no name')
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.name !== this.props.name
    }

    mountController(el: Element) {
       
        this.mount = el

        let name = this.props.name;
        let factory = this.context.container.get(name)
        
        factory.create({
            el: this.mount,
            options: this.props.options
        }).then( mod => {
            this.controller = mod;
            this.renderer = factory.container.get(MetaKeys.renderer);
        })
    }

    componentWillUnmount() {
        if (isDroppable(this.controller)) {
            this.controller.drop();
        }
        this.controller = null;
    }

    render() {
        return <div ref={(i) => this.mountController(i)}></div>
    }
    
    static contextTypes = {container: React.PropTypes.instanceOf(Container)};
}


