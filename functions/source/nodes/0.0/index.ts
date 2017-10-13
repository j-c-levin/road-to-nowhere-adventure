import { main } from './function';
import { Node, Distance } from '../index';

export const node: Node = {
    id: '0',
    name: 'The Road to Nowhere',
    data: {},
    function: main,
    paths: {
        north: {
            id: '1.1',
            distance: Distance.Short
        },
        east: {
            id: undefined,
            distance: undefined
        },
        west: {
            id: undefined,
            distance: undefined
        }
    }
};