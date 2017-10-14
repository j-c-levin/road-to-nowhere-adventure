import { main } from './function';
import { Node, Distance } from '../index';

export const node: Node = {
    id: '1.1',
    // You stand at the...
    name: 'abandoned campsite',
    data: {},
    function: main,
    paths: {
        north: {
            id: undefined,
            distance: undefined
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