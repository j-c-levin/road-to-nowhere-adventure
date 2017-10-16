import { main, interact } from './function';
import { Node, Distance } from '../index';

export const node: Node = {
    id: '1.0',
    // You stand at the...
    name: 'river bank',
    data: {
        isFlooded: true
    },
    function: main,
    interaction: interact,
    paths: {
        north: {
            id: undefined,
            distance: undefined
        },
        east: {
            id: '1.1',
            distance: 1
        },
        west: {
            id: undefined,
            distance: undefined
        }
    }
};