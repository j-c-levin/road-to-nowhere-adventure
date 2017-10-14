import { Node, NodeData, Distance } from './../index';

const itemsExistDescription = 'a campsite abandoned in a hurry.  Most of the tents have been emptied but a few unopened boxes and crates remain.';
const noItemsDescription = 'a campsite abandoned in a hurry.  It has already been looted';

export function main(requestingNode: Node): NodeData {
    const response = {
        // You stand at the Road to nowhere,...
        description: generateDescription(requestingNode),
        // To the north,...
        observableDescription: 'a path towards mountain range there appears to be the remains of a campsite.',
        interact: this.interact
    };
    return response;
}

const generateDescription = (requestingNode: Node): string => {
    return (requestingNode.data.hasLooted === false) ? itemsExistDescription : noItemsDescription;
};

const interact = (requestingNode: Node): void => {
    // if ()
};