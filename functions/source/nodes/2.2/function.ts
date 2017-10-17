import { Node, NodeData, Distance, InteractionType, InteractionResponse, Interaction, DefaultInteraction, InteractionData, GetRemoteNode } from './../index';
import { Player, ToolType, Tool } from '../../index';

const floodedNode = '1.0';

export function main(requestingNode: Node): NodeData {
    const response = {
        // You stand at the [place], ...
        description: 'it has been partially destroyed and water freely gushes down into the river.',
        // To the north, ...
        observableDescription: 'a hill with the house of rushing water.'
    };
    return response;
}

export function interact(interaction: InteractionData): InteractionResponse {
    if (GetRemoteNode(floodedNode).data.isFlooded === false) {
        return DefaultInteraction;
    }
    let response: InteractionResponse;
    switch (interaction.interactionType) {
        case Interaction.Build:
            // Check the player has wood to repair the dam
            const hasBuildingTool = interaction.player.tools.some((tool) => {
                return tool.type === ToolType.Build;
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
            GetRemoteNode(floodedNode).data.isFlooded = false;
            GetRemoteNode(floodedNode).paths.north = {
                id: '2.1',
                distance: 1
            };
            break;
        default:
            response = DefaultInteraction;
            break;
    }
    return response;
}

function buildDam(interaction: InteractionData): string {
    const playerTools = interaction.player.tools;
    let toolIndex = -1;
    const usableTool: Tool = playerTools.filter((tool, index) => {
        if (tool.type === ToolType.Build) {
            toolIndex = index;
            return true;
        } else {
            return false;
        }
    })[0];
    if (toolIndex !== -1) {
        // Remove the tool from the player
        playerTools.splice(toolIndex);
        // Un-floor the water at 1.0
        const node: Node = GetRemoteNode(floodedNode);
        node.data.isFlooded = false;
        return 'The wood blocks the dam up some way, water no longer flows through so fast';
    } else {
        return 'You have nothing to repair the dam with';
    }
}