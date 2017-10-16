import { main, interact } from './function';
import { Node, Distance } from '../index';

export const node: Node = {
    id: '2.3',
    // You stand at the...
    name: 'farm',
    data: {
        scavenged: false
    },
    function: main,
    interaction: interact,
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
            id: '2.2',
            distance: 1
        }
    }
};