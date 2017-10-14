import { NodeData, DistanceType } from './index';
import { node as node00 } from './0.0/index';
import { node as node11 } from './1.1/index';

export interface Node {
    id: string;
    name: string;
    data: any;
    function(requestingNode: Node): NodeData;
    paths: Paths;
}

export interface Paths {
    north: PathObject;
    east: PathObject;
    west: PathObject;
}

export interface PathObject {
    id: string | undefined;
    distance: number | undefined;
}

export interface NodeData {
    description: string;
    observableDescription: string;
    interact(requestingNode: Node): NodeData | void;
}

export interface DistanceType {
    Short: number;
    Fair: number;
    Moderate: number;
    Significant: number;
}

export const Distance: DistanceType = {
    Short: 1,
    Fair: 2,
    Moderate: 3,
    Significant: 4
};

export function GetRemoteNode(nodeId: string | undefined): Node {
    if (typeof nodeId === 'undefined') {
        console.error('Cannot get undefined remote node');
    }

    const response: Node = nodes.filter((node) => {
        return node.id === nodeId;
    })[0];

    if (response === null || typeof response === 'undefined') {
        console.error('No node found with id: ', nodeId);
    }

    return response;
}

export function GetDistanceAsString(distance: number): string {
    let response = '';
    switch (distance) {
        case Distance.Short:
            response = 'short';
            break;
        case Distance.Fair:
            response = 'fair';
            break;
        case Distance.Moderate:
            response = 'moderate';
            break;
        case Distance.Significant:
            response = 'significant';
            break;
    }
    return response;
}

export const nodes = [
    node00,
    node11
];