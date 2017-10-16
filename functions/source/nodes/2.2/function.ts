import { Node, NodeData, Distance, InteractionType, InteractionResponse, Interaction, DefaultInteraction, InteractionData, GetRemoteNode } from './../index';
import { Player, ToolType, Tool } from '../../index';

const floodedNode = '1.0';

export function main(requestingNode: Node): NodeData {
    const response = {
        // You stand at the [place], ...
        description: 'it has been partially destroyed and water freely gushes down into the river.',
        // To the north, ...
        observableDescription: 'a hill at the top from which there is a sound a bit like rushing water.'
    };
    return response;
}

export function interact(interaction: InteractionData): InteractionResponse {
    let response: InteractionResponse;
    switch (interaction.interactionType) {
        case Interaction.Build:
            response = {
                message: buildDam(interaction),
                data: {}
            };
            break;
        default:
            response = DefaultInteraction;
            break;
    }
    return response;
}

function buildDam(interaction: InteractionData): string {
    if (interaction.requestingNode.data.isFixed === true) {
        return `There isn't any more work to be done on the dam`;
    }
    interaction.requestingNode.data.isFixed = true;
    const player = interaction.player;
    const usableTool: Tool = player.tools.filter((tool) => {
        return tool.type === ToolType.Build;
    })[0];
    if (typeof usableTool !== 'undefined') {
        // Remove the tool from the player
        const removeIndex: number = player.tools.findIndex((tool) => {
            return tool === usableTool;
        });
        player.tools.splice(removeIndex);
        // Un-floor the water at 1.0
        const node: Node = GetRemoteNode(floodedNode);
        node.data.isFlooded = false;
        return 'The wood blocks the dam up some way, water no longer flows through so fast';
    } else {
        return 'You have nothing to repair the dam with';
    }
}