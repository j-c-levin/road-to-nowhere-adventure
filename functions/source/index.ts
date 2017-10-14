import ActionsOnGoogle = require('actions-on-google');
const DialogFlowApp = ActionsOnGoogle.DialogflowApp;
import * as functions from 'firebase-functions';
import { nodes, Node, GetRemoteNode, GetDistanceAsString, PathObject, Distance } from './nodes/index';

enum ToolType {
    Weapon,
    Equipment,
    Special
}

interface Tool {
    name: string;
    type: ToolType;
}

interface Player {
    food: number;
    tools: Array<Tool>;
}

const player: Player = {
    food: 5,
    tools: []
};

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
        message += ',';
        message += ` a ${tool.name}`;
    });
    message += '.';
    return message;
};

const begin = (app): void => {
    currentNode = nodes[0];
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

const handleJourneyDirection = (app): void => {
    const direction = app.getContext('journey-direction').parameters['journey-direction'];
    if (direction === 'south') {
        app.ask('There is no going back.');
    } else if (typeof currentNode.paths[direction].id === 'undefined') {
        app.ask('There is nothing to go to in that direction.');
    } else {
        player.food - currentNode.paths[direction].distance;
        currentNode = GetRemoteNode(currentNode.paths[direction].id);
        app.ask(locationMessage());
    }
};

const Actions = {
    UNRECOGNIZED_DEEP_LINK: 'deeplink.unknown',
    TEST: 'action.test',
    BEGIN: 'road.begin',
    DIRECTION: 'road.direction'
};

const actionMap = new Map();
actionMap.set(Actions.UNRECOGNIZED_DEEP_LINK, unhandledDeepLinks);
actionMap.set(Actions.TEST, test);
actionMap.set(Actions.BEGIN, begin);
actionMap.set(Actions.DIRECTION, handleJourneyDirection);

const handleAdventure = functions.https.onRequest((request, response) => {
    const app = new DialogFlowApp({ request, response });
    // console.log(`Request headers: ${JSON.stringify(request.headers)}\n\n`);
    // console.log(`Request body: ${JSON.stringify(request.body)}`);
    app.handleRequest(actionMap);
});

const testing = values => {
    handleJourneyDirection(undefined);
};

module.exports = {
    handleAdventure,
    testing
};
