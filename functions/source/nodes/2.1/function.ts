import { Node, NodeData, Distance, InteractionType, InteractionResponse, Interaction, DefaultInteraction, InteractionData, GetRemoteNode } from './../index';
import { Player, ToolType, Tool } from '../../index';

export function main(requestingNode: Node): NodeData {
    const response = {
        // You stand at the [place], ...
        description: `a peak overlooking the patchy brown terrain ahead.`,
        // To the north, ...
        observableDescription: 'a hill peak.'
    };
    return response;
}

export function interact(interaction: InteractionData): InteractionResponse {
    return DefaultInteraction;
}