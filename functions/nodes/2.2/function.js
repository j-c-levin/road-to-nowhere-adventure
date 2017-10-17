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
        observableDescription: 'a hill with the house of rushing water.'
    };
    return response;
}
exports.main = main;
function interact(interaction) {
    if (index_1.GetRemoteNode(floodedNode).data.isFlooded === false) {
        return index_1.DefaultInteraction;
    }
    let response;
    switch (interaction.interactionType) {
        case index_1.Interaction.Build:
            // Check the player has wood to repair the dam
            const hasBuildingTool = interaction.player.tools.some((tool) => {
                return tool.type === index_2.ToolType.Build;
            });
            if (hasBuildingTool === false) {
                return {
                    message: 'You have no material to fix the dam with.',
                    data: {}
                };
            }
            response = {
                message: buildDam(interaction),
                data: {}
            };
            // Open up node 1.0
            index_1.GetRemoteNode(floodedNode).data.isFlooded = false;
            index_1.GetRemoteNode(floodedNode).paths.north = {
                id: '2.1',
                distance: 1
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
    const playerTools = interaction.player.tools;
    let toolIndex = -1;
    const usableTool = playerTools.filter((tool, index) => {
        if (tool.type === index_2.ToolType.Build) {
            toolIndex = index;
            return true;
        }
        else {
            return false;
        }
    })[0];
    if (toolIndex !== -1) {
        // Remove the tool from the player
        playerTools.splice(toolIndex);
        // Un-floor the water at 1.0
        const node = index_1.GetRemoteNode(floodedNode);
        node.data.isFlooded = false;
        return 'The wood blocks the dam up some way, water no longer flows through so fast';
    }
    else {
        return 'You have nothing to repair the dam with';
    }
}
