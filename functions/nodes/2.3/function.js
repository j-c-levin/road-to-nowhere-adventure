"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../index");
const index_2 = require("../../index");
const floodedNode = '1.0';
const notScavengedDescription = `It's abandoned and emptied save for some pieces of chopped wood lying in the yard.`;
const scavengedDescription = `It's abandoned and empty.`;
function main(requestingNode) {
    const response = {
        // You stand at the [place], ...
        description: `It's abandoned and emptied save for some pieces of chopped wood lying in the yard.`,
        // To the north, ...
        observableDescription: 'a hill at the top from which there is a sound a bit like rushing water.'
    };
    return response;
}
exports.main = main;
const generateDescription = (requestingNode) => {
    return (requestingNode.data.scavenged === false) ? notScavengedDescription : scavengedDescription;
};
function interact(interaction) {
    let response;
    switch (interaction.interactionType) {
        case index_1.Interaction.Search:
            const tool = {
                name: 'wood',
                type: index_2.ToolType.Build
            };
            response = {
                message: `You pick up the wood.`,
                data: {
                    tools: tool
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
