"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./0.0/index");
const index_2 = require("./1.0/index");
const index_3 = require("./1.1/index");
const index_4 = require("./1.2/index");
const index_5 = require("./2.2/index");
const index_6 = require("./2.3/index");
exports.nodes = [
    index_1.node,
    index_2.node,
    index_3.node,
    index_4.node,
    index_5.node,
    index_6.node
];
exports.Distance = {
    Short: 1,
    Fair: 2,
    Moderate: 3,
    Significant: 4
};
exports.Interaction = {
    Search: 1,
    Build: 2
};
exports.DefaultInteraction = {
    message: 'Nothing comes of your actions.',
    data: {}
};
function GetRemoteNode(nodeId) {
    if (typeof nodeId === 'undefined') {
        console.error('Cannot get undefined remote node');
    }
    const response = exports.nodes.filter((node) => {
        return node.id === nodeId;
    })[0];
    if (response === null || typeof response === 'undefined') {
        console.error('No node found with id: ', nodeId);
    }
    return response;
}
exports.GetRemoteNode = GetRemoteNode;
function GetDistanceAsString(distance) {
    let response = '';
    switch (distance) {
        case exports.Distance.Short:
            response = 'short';
            break;
        case exports.Distance.Fair:
            response = 'fair';
            break;
        case exports.Distance.Moderate:
            response = 'moderate';
            break;
        case exports.Distance.Significant:
            response = 'significant';
            break;
    }
    return response;
}
exports.GetDistanceAsString = GetDistanceAsString;
function GetInteractionAsEnum(interaction) {
    switch (interaction) {
        case 'search':
            return exports.Interaction.Search;
        default:
            console.error(`no interaction of name ${interaction} defined`);
            return -1;
    }
}
exports.GetInteractionAsEnum = GetInteractionAsEnum;
