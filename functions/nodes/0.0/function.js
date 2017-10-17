"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../index");
function main() {
    const response = {
        description: 'a barren plain with a single path leading Away.',
        observableDescription: 'a place where everything is Away, and nothing Behind.  There is no going back.'
    };
    return response;
}
exports.main = main;
function interact(Interaction) {
    return index_1.DefaultInteraction;
}
exports.interact = interact;
function resetState(requestingNode) {
    // Intentionally empty
}
exports.resetState = resetState;
