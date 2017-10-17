"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("./function");
exports.node = {
    id: '1.2',
    // You stand at the...
    name: 'dusty car',
    data: {},
    function: function_1.main,
    interaction: function_1.interact,
    reset: function_1.resetState,
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
