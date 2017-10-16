import { Node, NodeData, Distance, InteractionType, InteractionResponse, Interaction, DefaultInteraction, InteractionData, GetRemoteNode } from './../index';
import { Player, ToolType, Tool } from '../../index';

const floodedNode = '1.0';

const notScavengedDescription = `It's abandoned and emptied save for some pieces of chopped wood lying in the yard.`;
const scavengedDescription = `It's abandoned and empty.`;

export function main(requestingNode: Node): NodeData {
    const response = {
        // You stand at the [place], ...
        description: `It's abandoned and emptied save for some pieces of chopped wood lying in the yard.`,
        // To the north, ...
        observableDescription: 'a hill at the top from which there is a sound a bit like rushing water.'
    };
    return response;
}

const generateDescription = (requestingNode: Node): string => {
    return (requestingNode.data.scavenged === false) ? notScavengedDescription : scavengedDescription;
};

export function interact(interaction: InteractionData): InteractionResponse {
    let response: InteractionResponse;
    switch (interaction.interactionType) {
        case Interaction.Search:
            const tool: Tool = {
                name: 'wood',
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