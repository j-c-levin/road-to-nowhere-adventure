"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("./function");
exports.node = {
    id: '1.0',
    // You stand at the...
    name: 'river bank',
    data: {
        isFlooded: true
    },
    function: function_1.main,
    interaction: function_1.interact,
    reset: function_1.resetState,
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
