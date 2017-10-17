import { Node, NodeData, Distance, InteractionType, InteractionResponse, Interaction, DefaultInteraction, InteractionData, GetRemoteNode } from './../index';
import { Player, ToolType, Tool } from '../../index';

const floodedNode = '1.0';

const notScavengedDescription = `it's abandoned and emptied save for some pieces of chopped wood lying in the yard.`;
const scavengedDescription = `it's abandoned and empty.`;

export function main(requestingNode: Node): NodeData {
    const response = {
        // You stand at the [place], ...
        description: generateDescription(requestingNode),
        // To the north, ...
        observableDescription: 'a farmhouse on the top of a hill'
    };
    return response;
}

const generateDescription = (requestingNode: Node): string => {
    return (requestingNode.data.scavenged === false) ? notScavengedDescription : scavengedDescription;
};

export function interact(interaction: InteractionData): InteractionResponse {
    // Ensure someone can only loot once
    if (interaction.requestingNode.data.scavenged === true) {
        interaction.interactionType = -1;
    }
    let response: InteractionResponse;
    switch (interaction.interactionType) {
        case Interaction.Search:
            const tool: Tool = {
                name: 'some pieces of wood',
                type: ToolType.Build
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
            response = DefaultInteraction;
            break;
    }
    return response;
}