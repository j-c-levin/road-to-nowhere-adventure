"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const function_1 = require("./function");
exports.node = {
    id: '2.3',
    // You stand at the...
    name: 'farm',
    data: {
        scavenged: false
    },
    function: function_1.main,
    interaction: function_1.interact,
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
