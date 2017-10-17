import { main, interact } from './function';
import { Node, Distance } from '../index';

export const node: Node = {
    id: '2.2',
    // You stand at the...
    name: 'dam',
    data: {},
    function: main,
    interaction: interact,
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