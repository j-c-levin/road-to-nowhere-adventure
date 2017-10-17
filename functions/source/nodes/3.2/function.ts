import { Node, NodeData, Distance, InteractionType, InteractionResponse, Interaction, DefaultInteraction, InteractionData, GetRemoteNode } from './../index';
import { Player, ToolType, Tool } from '../../index';

export function main(requestingNode: Node): NodeData {
    const response = {
        // You stand at the [place], ...
        description: `where life continue nonetheless.`,
        // To the north, ...
        observableDescription: 'signs of life above a collection of tents.'
    };
    return response;
}

export function interact(interaction: InteractionData): InteractionResponse {
    return DefaultInteraction;
}

export function resetState(requestingNode: Node): void {
    // Intentionally empty
}