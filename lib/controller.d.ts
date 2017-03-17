/// <reference types="react" />
import * as React from 'react';
import { Renderer } from 'slick';
export interface ControllerProperties {
    name: string;
    options?: any;
}
export declare class Controller extends React.Component<ControllerProperties, any> {
    mount: Element;
    renderer: Renderer;
    controller: any;
    constructor(props: any, context: any);
    shouldComponentUpdate(nextProps: any): boolean;
    mountController(el: Element): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    static contextTypes: {
        container: React.Requireable<any>;
    };
}
