"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../index");
const index_2 = require("../../index");
const floodedNode = '1.0';
function main(requestingNode) {
    const response = {
        // You stand at the [place], ...
        description: 'it has been partially destroyed and water freely gushes down into the river.',
        // To the north, ...
        observableDescription: 'a hill at the top from which there is a sound a bit like rushing water.'
    };
    return response;
}
exports.main = main;
function interact(interaction) {
    let response;
    switch (interaction.interactionType) {
        case index_1.Interaction.Build:
            response = {
                message: buildDam(interaction),
                data: {}
            };
            break;
        default:
            response = index_1.DefaultInteraction;
            break;
    }
    return response;
}
exports.interact = interact;
function buildDam(interaction) {
    if (interaction.requestingNode.data.isFixed === true) {
        return `There isn't any more work to be done on the dam`;
    }
    interaction.requestingNode.data.isFixed = true;
    const player = interaction.player;
    const usableTool = player.tools.filter((tool) => {
        return tool.type === index_2.ToolType.Build;
    })[0];
    if (typeof usableTool !== 'undefined') {
        // Remove the tool from the player
        const removeIndex = player.tools.findIndex((tool) => {
            return tool === usableTool;
        });
        player.tools.splice(removeIndex);
        // Un-floor the water at 1.0
        const node = index_1.GetRemoteNode(floodedNode);
        node.data.isFlooded = false;
        return 'The wood blocks the dam up some way, water no longer flows through so fast';
    }
    else {
        return 'You have nothing to repair the dam with';
    }
}
