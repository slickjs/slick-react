import * as React from 'react';
import {Container, Renderer, MetaKeys} from 'slick'

export interface ControllerProperties {
    name:string;
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
            el: this.mount
        }).then( mod => {
            this.controller = mod;
            this.renderer = factory.container.get(MetaKeys.renderer);
        })
    }

    componentWillUnmount() {

    }

    render() {
        return <div ref={(i) => this.mountController(i)}></div>
    }
    
    static contextTypes = {container: React.PropTypes.instanceOf(Container)};
}


