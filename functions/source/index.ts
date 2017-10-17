import { Player } from './index';
import ActionsOnGoogle = require('actions-on-google');
const DialogFlowApp = ActionsOnGoogle.DialogflowApp;
import * as functions from 'firebase-functions';
import { nodes, Node, GetRemoteNode, GetDistanceAsString, PathObject, Distance, GetInteractionAsEnum, InteractionData } from './nodes/index';

export enum ToolType {
    Build
}

export interface Tool {
    name: string;
    type: ToolType;
}

export interface Player {
    food: number;
    tools: Array<Tool>;
}

const player: Player = {
    food: 2,
    tools: []
};

const startingNode = '0.0';
let currentNode: Node;

const getRandomValue = array => array[Math.floor(Math.random() * array.length)];

const unhandledDeepLinks = app => {
    app.tell('you aren\'t making any sense');
};

const test = app => {
    app.tell('Well, you made your test work. Good job hero.');
};

const generateLocationMessage = (): string => {
    let message = 'You stand at the';
    message += ' ';
    message += `${currentNode.name},`;
    message += ' ';
    message += currentNode.function(currentNode).description;
    message += ' ';
    Object.keys(currentNode.paths).forEach((direction: string) => {
        if (typeof currentNode.paths[direction].id === 'undefined') {
            return;
        }
        const path: PathObject = currentNode.paths[direction];
        const node: Node = GetRemoteNode(path.id);
        const distance: string = GetDistanceAsString(currentNode.paths[direction].distance);
        message += '\n';
        message += `To the ${direction}, a ${distance} distance away, ${node.function(node).observableDescription}`;
    });
    return message;
};

const generatePlayerStatus = (): string => {
    let message = `\n`;
    message += `You have ${player.food} food rations`;
    player.tools.forEach((tool) => {
        message += ', ';
        message += tool.name;
    });
    message += '.';
    return message;
};

const resetPlayer = (): void => {
    player.food = 2;
    player.tools = [];
};

const resetNodes = (): void => {
    nodes.forEach((node) => {
        node.reset(node);
    });
};

const begin = (app): void => {
    resetPlayer();
    resetNodes();
    currentNode = GetRemoteNode(startingNode);
    let message = `\nYour journey begins.\n`;
    message += locationMessage();
    app.ask(message);
};

const locationMessage = (): string => {
    let message = generateLocationMessage();
    message += generatePlayerStatus();
    message += '\n';
    message += 'Where will you journey?';
    return message;
};

const generalStatus = (app): void => {
    app.ask(locationMessage());
};

const endJourney = (app): void => {
    const message = 'Out of food, your journey ends here.  However, endings are beginnings anew, will you journey again?';
    app.ask(message);
};

const endOfGame = (app): void => {
    const message = `You step towards the unknown.  Maybe you'll find something.  Maybe your story will vanish without a trace.  Or maybe someone journeying along the Road to Nowhere will someday chance across a patchily repaired dam and wonder how that came to pass.  For now though, there is only Away.`;
    app.ask(message);
};

const handleJourneyDirection = (app): void => {
    // Player has no food, end journey
    if (player.food === 0) {
        endJourney(app);
        return;
    }
    const direction = app.getContext('journey-active').parameters['journey-direction'];
    // Edge case for ending the game
    if (currentNode.id === '2.1') {
        endOfGame(app);
        return;
    }
    if (direction === 'south') {
        app.ask('There is no going back.');
    } else if (typeof currentNode.paths[direction].id === 'undefined') {
        app.ask('There is nothing to go to in that direction.');
    } else {
        player.food -= currentNode.paths[direction].distance;
        currentNode = GetRemoteNode(currentNode.paths[direction].id);
        app.ask(locationMessage());
    }
};

const handleInteraction = (app): void => {
    const interaction = app.getContext('journey-active').parameters['journey-interaction'];
    const p = player;
    const interactionData: InteractionData = {
        interactionType: GetInteractionAsEnum(interaction),
        requestingNode: currentNode,
        player: p
    };
    const interactionResponse = currentNode.interaction(interactionData);
    // Augment the player with whatever the interaction achieved
    Object.keys(interactionResponse.data).forEach((element) => {
        if (element !== 'tools') {
            player[element] += interactionResponse.data[element];
        } else {
            player[element].push(interactionResponse.data[element]);
        }
    });
    const message = interactionResponse.message;
    app.ask(message);
};

const Actions = {
    UNRECOGNIZED_DEEP_LINK: 'deeplink.unknown',
    TEST: 'action.test',
    BEGIN: 'road.begin',
    DIRECTION: 'road.direction',
    SEARCH: 'road.interaction',
    STATUS: 'road.status'
};

const actionMap = new Map();
actionMap.set(Actions.UNRECOGNIZED_DEEP_LINK, unhandledDeepLinks);
actionMap.set(Actions.TEST, test);
actionMap.set(Actions.BEGIN, begin);
actionMap.set(Actions.DIRECTION, handleJourneyDirection);
actionMap.set(Actions.SEARCH, handleInteraction);
actionMap.set(Actions.STATUS, generalStatus);

const handleAdventure = functions.https.onRequest((request, response) => {
    const app = new DialogFlowApp({ request, response });
    // console.log(`Request headers: ${JSON.stringify(request.headers)}\n\n`);
    // console.log(`Request body: ${JSON.stringify(request.body)}`);
    app.handleRequest(actionMap);
});

module.exports = {
    handleAdventure
};
