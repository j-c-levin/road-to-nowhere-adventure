import { NodeData, Node, Interaction, InteractionType, InteractionResponse, DefaultInteraction, InteractionData } from './../index';

const floodedDescription = 'the river is exceedingly swollen and the surrounding area is flooded.  It is not possible to journey past here.';
const dryDescription = 'the land is sodden after the flooding but the river now flows calmly beneath the bridge.';

const floodedObservableDescription = 'a raging river winding its way down towards flooded land.';
const dryObservableDescription = 'a bridge over a river.';

export function main(requestingNode: Node): NodeData {
    const response = {
        // You stand at the [place], ...
        description: generateDescription(requestingNode),
        // To the north,...
        observableDescription: generateObservableDescription(requestingNode)
    };
    return response;
}

const generateDescription = (requestingNode: Node): string => {
    return (requestingNode.data.isFlooded === false) ? floodedDescription : dryDescription;
};

const generateObservableDescription = (requestingNode: Node): string => {
    return (requestingNode.data.isFlooded === false) ? floodedObservableDescription : dryObservableDescription;
};

export function interact(Interaction: InteractionData): InteractionResponse {
    return DefaultInteraction;
}

export function resetState(requestingNode: Node): void {
    // Intentionally empty
}