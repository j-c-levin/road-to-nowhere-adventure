import { Node, NodeData, Distance, InteractionType, InteractionResponse, Interaction, DefaultInteraction, InteractionData, GetRemoteNode } from './../index';
import { Player, ToolType, Tool } from '../../index';

export function main(requestingNode: Node): NodeData {
    const response = {
        // You stand at the [place], ...
        description: `wheat used to grow here.  It's all gone now, scorchedy dry, the earth seared.  There can be no life here.`,
        // To the north, ...
        observableDescription: 'a field of dark earth.'
    };
    return response;
}

export function interact(interaction: InteractionData): InteractionResponse {
    return DefaultInteraction;
}

export function resetState(requestingNode: Node): void {
    // Intentionally empty
}