"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../index");
function main(requestingNode) {
    const response = {
        // You stand at the [place], ...
        description: `a peak overlooking the patchy brown terrain ahead.`,
        // To the north, ...
        observableDescription: 'a hill peak.'
    };
    return response;
}
exports.main = main;
function interact(interaction) {
    return index_1.DefaultInteraction;
}
exports.interact = interact;
