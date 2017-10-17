import { NodeData, DistanceType, InteractionType, InteractionData } from './index';
import { node as node00 } from './0.0/index';
import { node as node10 } from './1.0/index';
import { node as node11 } from './1.1/index';
import { node as node12 } from './1.2/index';
import { node as node21 } from './2.1/index';
import { node as node22 } from './2.2/index';
import { node as node23 } from './2.3/index';
import { node as node24 } from './2.4/index';
import { node as node32 } from './3.2/index';
import { Player } from '../index';

export const nodes = [
    node00,
    node10,
    node11,
    node12,
    node21,
    node22,
    node23,
    node24,
    node32
];

export const Distance: DistanceType = {
    Short: 1,
    Fair: 2,
    Moderate: 3,
    Significant: 4
};

export const Interaction: InteractionType = {
    Search: 1,
    Build: 2
};

export interface Node {
    id: string;
    name: string;
    data: any;
    function(requestingNode: Node): NodeData;
    interaction(interaction: InteractionData): InteractionResponse;
    reset(requestingNode: Node): void;
    paths: Paths;
}

export interface InteractionResponse {
    message: string;
    data: any;
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
}

export interface DistanceType {
    Short: number;
    Fair: number;
    Moderate: number;
    Significant: number;
}

export interface InteractionType {
    Search: number;
    Build: number;
}

export interface InteractionData {
    interactionType: number;
    requestingNode: Node;
    player: Player;
}

export const DefaultInteraction: InteractionResponse = {
    message: 'Nothing comes of your actions.',
    data: {}
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

export function GetInteractionAsEnum(interaction: string): number {
    switch (interaction) {
        case 'search':
            return Interaction.Search;
        case 'build':
            return Interaction.Build;
        default:
            console.error(`no interaction of name ${interaction} defined`);
            return -1;
    }
}