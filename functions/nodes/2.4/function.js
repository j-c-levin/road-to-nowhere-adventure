"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../index");
function main(requestingNode) {
    const response = {
        // You stand at the [place], ...
        description: `wheat used to grow here.  It's all gone now, scorchedy dry, the earth seared.  There can be no life here.`,
        // To the north, ...
        observableDescription: 'a field of dark earth.'
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
