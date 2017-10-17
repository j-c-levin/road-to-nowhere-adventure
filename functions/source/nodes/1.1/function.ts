import { Node, NodeData, Distance, InteractionType, InteractionResponse, Interaction, DefaultInteraction, InteractionData } from './../index';

const itemsExistDescription = 'clearly abandoned in a rush.  Most of the tents have been emptied but there are a few supply boxes around.';
const noItemsDescription = 'clearly abandoned in a rush.  It has already been scavenged.';

const numberOfFoodRations = 2;

export function main(requestingNode: Node): NodeData {
    const response = {
        // You stand at the Road to nowhere,...
        description: generateDescription(requestingNode),
        // To the north,...
        observableDescription: 'there appears to be the remains of a campsite.'
    };
    return response;
}

const generateDescription = (requestingNode: Node): string => {
    return (requestingNode.data.scavenged === false) ? itemsExistDescription : noItemsDescription;
};

export function interact(interaction: InteractionData): InteractionResponse {
    let response: InteractionResponse;
    switch (interaction.interactionType) {
        case Interaction.Search:
            response = {
                message: `You find ${numberOfFoodRations} food supplies.`,
                data: {
                    food: numberOfFoodRations
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