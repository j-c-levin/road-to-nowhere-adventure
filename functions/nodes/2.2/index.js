"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("./function");
exports.node = {
    id: '2.2',
    // You stand at the...
    name: 'dam',
    data: {
        isFixed: false
    },
    function: function_1.main,
    interaction: function_1.interact,
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
