import { NodeData, Distance } from './../index';

export function main(requestingNode?: Node): NodeData {
    const response = {
        // You stand at the Road to nowhere,...
        description: 'a campsite abandoned in a hurry.  Most of the tents have been emptied but a few unopened boxes and crates remain.',
        // To the north,...
        observableDescription: 'a path towards mountain range there appears to be the remains of a campsite.'
    };
    return response;
}