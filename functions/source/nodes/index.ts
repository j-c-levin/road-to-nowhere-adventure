import { node as node00 } from './0.0/index';

export interface Node {
    id: string;
    name: string;
    data: object;
    function: Function;
    paths: Paths;
}

export interface Paths {
    North: string;
    East: string | undefined;
    West: string | undefined;
}

export const nodes = [
    node00
];