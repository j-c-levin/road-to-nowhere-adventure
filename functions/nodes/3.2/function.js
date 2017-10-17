"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../index");
function main(requestingNode) {
    const response = {
        // You stand at the [place], ...
        description: `where life continue nonetheless.`,
        // To the north, ...
        observableDescription: 'signs of life above a collection of tents.'
    };
    return response;
}
exports.main = main;
function interact(interaction) {
    return index_1.DefaultInteraction;
}
exports.interact = interact;
function resetState(requestingNode) {
    // Intentionally empty
}
exports.resetState = resetState;
