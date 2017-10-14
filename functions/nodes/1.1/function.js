"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const itemsExistDescription = 'a campsite abandoned in a hurry.  Most of the tents have been emptied but a few unopened boxes and crates remain.';
const noItemsDescription = 'a campsite abandoned in a hurry.  It has already been looted';
function main(requestingNode) {
    const response = {
        // You stand at the Road to nowhere,...
        description: generateDescription(requestingNode),
        // To the north,...
        observableDescription: 'a path towards mountain range there appears to be the remains of a campsite.',
        interact: this.interact
    };
    return response;
}
exports.main = main;
const generateDescription = (requestingNode) => {
    return (requestingNode.data.hasLooted === false) ? itemsExistDescription : noItemsDescription;
};
const interact = (requestingNode) => {
    // if ()
};
