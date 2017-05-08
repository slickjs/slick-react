/// <reference types="react" />
import * as React from 'react';
import { Container } from 'slick';
export interface ControllerProperties {
    name: string;
    options?: any;
}
export declare class Controller extends React.Component<ControllerProperties, any> {
    mount: Element;
    controller: any;
    context: {
        container: Container;
    };
    constructor(props: any, context: any);
    shouldComponentUpdate(nextProps: any): boolean;
    mountController(el: Element): void;
    componentWillUnmount(): void;
    componentWillMount(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private _call(fn);
    render(): JSX.Element;
    static contextTypes: {
        container: React.Requireable<any>;
    };
}
