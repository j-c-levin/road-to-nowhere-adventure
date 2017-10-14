"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./0.0/index");
const index_2 = require("./1.1/index");
exports.Distance = {
    Short: 1,
    Fair: 2,
    Moderate: 3,
    Significant: 4
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
exports.nodes = [
    index_1.node,
    index_2.node
];
