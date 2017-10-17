"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("./function");
exports.node = {
    id: '2.4',
    // You stand at the...
    name: 'barren fields',
    data: {},
    function: function_1.main,
    interaction: function_1.interact,
    reset: function_1.resetState,
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
