import { main, interact } from './function';
import { Node, Distance } from '../index';

export const node: Node = {
    id: '1.2',
    // You stand at the...
    name: 'dusty car',
    data: {},
    function: main,
    interaction: interact,
    paths: {
        north: {
            id: '2.3',
            distance: 1
        },
        east: {
            id: undefined,
            distance: undefined
        },
        west: {
            id: '1.1',
            distance: 1
        }
    }
};