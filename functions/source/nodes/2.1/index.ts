import { main, interact } from './function';
import { Node, Distance } from '../index';

export const node: Node = {
    id: '2.1',
    // You stand at the...
    name: 'hill viewpoint',
    data: {},
    function: main,
    interaction: interact,
    paths: {
        north: {
            id: '3.2',
            distance: 2
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