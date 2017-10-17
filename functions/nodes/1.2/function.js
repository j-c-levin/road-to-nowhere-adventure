"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../index");
function main(requestingNode) {
    const response = {
        // You stand at the [place], ...
        description: 'abandoned to the elements. The keys are in the ignition but nothing responds when they are turned.',
        // To the north, ...
        observableDescription: 'some kind of vehicle stands apart.'
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
