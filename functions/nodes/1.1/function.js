"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../index");
const itemsExistDescription = 'clearly abandoned in a rush.  Most of the tents have been emptied but there are a few supply boxes around.';
const noItemsDescription = 'clearly abandoned in a rush.  It has already been scavenged.';
const numberOfFoodRations = 2;
function main(requestingNode) {
    const response = {
        // You stand at the Road to nowhere,...
        description: generateDescription(requestingNode),
        // To the north,...
        observableDescription: 'there appears to be the remains of a campsite.'
    };
    return response;
}
exports.main = main;
const generateDescription = (requestingNode) => {
    return (requestingNode.data.scavenged === false) ? itemsExistDescription : noItemsDescription;
};
function interact(interaction) {
    let response;
    switch (interaction.interactionType) {
        case index_1.Interaction.Search:
            response = {
                message: `You find ${numberOfFoodRations} food supplies.`,
                data: {
                    food: numberOfFoodRations
                }
            };
            interaction.requestingNode.data.scavenged = true;
            break;
        default:
            response = index_1.DefaultInteraction;
            break;
    }
    return response;
}
exports.interact = interact;
