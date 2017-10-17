import { main, interact, resetState } from './function';
import { Node, Distance } from '../index';

export const node: Node = {
    id: '2.4',
    // You stand at the...
    name: 'barren fields',
    data: {},
    function: main,
    interaction: interact,
    reset: resetState,
    paths: {
        north: {
            id: undefined,
            distance: undefined
        },
        east: {
            id: '2.3',
            distance: 1
        },
        west: {
            id: undefined,
            distance: undefined
        }
    }
};