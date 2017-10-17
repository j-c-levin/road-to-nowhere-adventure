import { Node, NodeData, Distance, InteractionType, InteractionResponse, Interaction, DefaultInteraction, InteractionData } from './../index';


export function main(requestingNode: Node): NodeData {
    const response = {
        // You stand at the [place], ...
        description: 'abandoned to the elements. The keys are in the ignition but nothing responds when they are turned.',
        // To the north, ...
        observableDescription: 'some kind of vehicle stands apart.'
    };
    return response;
}

export function interact(interaction: InteractionData): InteractionResponse {
    return DefaultInteraction;
}

export function resetState(requestingNode: Node): void {
    // Intentionally empty
}