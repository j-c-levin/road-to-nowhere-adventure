import { main } from './function';
import { Node } from '../index';

export const node: Node = {
    id: '0',
    name: 'Ford',
    data: {
        waterLevel: 0
    },
    function: main,
    paths: {
        North: '1.0',
        East: undefined,
        West: undefined
    }
};