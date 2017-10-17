"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("./function");
exports.node = {
    id: '2.1',
    // You stand at the...
    name: 'hill viewpoint',
    data: {},
    function: function_1.main,
    interaction: function_1.interact,
    paths: {
        north: {
            id: '3.2',
            distance: 2
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
