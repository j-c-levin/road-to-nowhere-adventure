"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../index");
const floodedDescription = 'the river is exceedingly swollen and the surrounding area is flooded.  It is not possible to journey past here.';
const dryDescription = 'the land is sodden after the flooding but the river now flows calmly beneath the bridge.';
const floodedObservableDescription = 'a raging river winding its way down towards flooded land.';
const dryObservableDescription = 'a bridge over a river.';
function main(requestingNode) {
    const response = {
        // You stand at the [place], ...
        description: generateDescription(requestingNode),
        // To the north,...
        observableDescription: generateObservableDescription(requestingNode)
    };
    return response;
}
exports.main = main;
const generateDescription = (requestingNode) => {
    return (requestingNode.data.isFlooded === false) ? floodedDescription : dryDescription;
};
const generateObservableDescription = (requestingNode) => {
    return (requestingNode.data.isFlooded === false) ? floodedObservableDescription : dryObservableDescription;
};
function interact(Interaction) {
    return index_1.DefaultInteraction;
}
exports.interact = interact;
function resetState(requestingNode) {
    // Intentionally empty
}
exports.resetState = resetState;
