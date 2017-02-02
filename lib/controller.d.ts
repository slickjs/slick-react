/// <reference types="react" />
import * as React from 'react';
import { Renderer } from 'slick';
export declare class Controller extends React.Component<any, any> {
    mount: Element;
    renderer: Renderer;
    controller: any;
    constructor(props: any, context: any);
    shouldComponentUpdate(nextProps: any): boolean;
    mountController(el: Element): void;
    componentWillUnmount(): void;
    render(): JSX.JSXElement;
    static contextTypes: {
        container: React.Requireable<any>;
    };
}
