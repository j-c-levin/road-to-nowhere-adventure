import { NodeData, Interaction, InteractionType, InteractionResponse, DefaultInteraction, InteractionData } from './../index';

export function main(): NodeData {
    const response = {
        description: 'a barren plain with a single path leading Away.',
        observableDescription: 'a place where everything is Away, and nothing Behind.  There is no going back.'
    };
    return response;
}

export function interact(Interaction: InteractionData): InteractionResponse {
    return DefaultInteraction;
}