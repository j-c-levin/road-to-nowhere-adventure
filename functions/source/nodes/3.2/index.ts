import { main, interact, resetState } from './function';
import { Node, Distance } from '../index';

export const node: Node = {
    id: '3.2',
    // You stand at the...
    name: 'small settlement',
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
            id: undefined,
            distance: undefined
        },
        west: {
            id: undefined,
            distance: undefined
        }
    }
};