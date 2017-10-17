"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("./function");
exports.node = {
    id: '3.2',
    // You stand at the...
    name: 'small settlement',
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
            id: undefined,
            distance: undefined
        },
        west: {
            id: undefined,
            distance: undefined
        }
    }
};
