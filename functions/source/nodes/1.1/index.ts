import { main, interact, resetState } from './function';
import { Node, Distance } from '../index';

export const node: Node = {
    id: '1.1',
    // You stand at the...
    name: 'abandoned campsite',
    data: {
        scavenged: false
    },
    function: main,
    interaction: interact,
    reset: resetState,
    paths: {
        north: {
            id: undefined,
            distance: undefined
        },
        east: {
            id: '1.2',
            distance: 1
        },
        west: {
            id: '1.0',
            distance: 1
        }
    }
};