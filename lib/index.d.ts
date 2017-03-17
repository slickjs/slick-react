import { Renderer, Model, Container } from 'slick';
import { EventEmitter } from 'eventsjs';
export { Component, createElement } from 'react';
export { Controller } from './controller';
export declare class ReactRenderer extends EventEmitter implements Renderer {
    el: Element;
    model: Model;
    constructor(el: Element);
    render(mod: any, container: Container, options?: any): void;
    private _renderTemplate(mod);
    drop(): void;
}
