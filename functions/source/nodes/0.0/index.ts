import { main, interact } from './function';
import { Node, Distance } from '../index';

export const node: Node = {
    id: '0.0',
    name: 'Road to Nowhere',
    data: {},
    function: main,
    interaction: interact,
    paths: {
        north: {
            id: '1.1',
            distance: 1
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