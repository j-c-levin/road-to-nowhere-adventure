import ActionsOnGoogle = require('actions-on-google');
import * as functions from 'firebase-functions';
import { nodes, Node, GetRemoteNode, GetDistanceAsString, PathObject } from './nodes/index';

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

const DialogFlowApp = ActionsOnGoogle.DialogflowApp;
let currentConnections: Node;

const getRandomValue = array => array[Math.floor(Math.random() * array.length)];

const unhandledDeepLinks = app => {
    app.tell('you aren\'t making any sense');
};

const test = app => {
    app.tell('Well, you made your test work. Good job hero.');
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
    currentConnections = nodes[0];
    let message = `\nYour journey begins.\n`;
    message += generateLocationMessage();
    message += generatePlayerStatus();
    message += '\n';
    message += 'Where will you journey?';
    console.log(message);
    app.ask(message);
};

const generateLocationMessage = (): string => {
    let message = 'You stand at';
    message += ' ';
    message += `${currentConnections.name},`;
    message += ' ';
    message += currentConnections.function().description;
    message += ' ';
    Object.keys(currentConnections.paths).forEach((direction: string) => {
        if (typeof currentConnections.paths[direction] === 'undefined') {
            return;
        }
        const path: PathObject = currentConnections.paths[direction];
        const node: Node = GetRemoteNode(path.id);
        const distance: string = GetDistanceAsString(currentConnections.paths[direction]);
        message += '\n';
        message += `To the east, a ${distance} away, ${node.function().observableDescription}`;
    });
    return message;
};

const Actions = {
    UNRECOGNIZED_DEEP_LINK: 'deeplink.unknown',
    TEST: 'action.test',
    BEGIN: 'road.begin'
};

const actionMap = new Map();
actionMap.set(Actions.UNRECOGNIZED_DEEP_LINK, unhandledDeepLinks);
actionMap.set(Actions.TEST, test);
actionMap.set(Actions.BEGIN, begin);

const handleAdventure = functions.https.onRequest((request, response) => {
    console.log(DialogFlowApp);
    const app = new DialogFlowApp({ request, response });
    console.log(`Request headers: ${JSON.stringify(request.headers)}\n\n`);
    console.log(`Request body: ${JSON.stringify(request.body)}`);
    app.handleRequest(actionMap);
});

const testing = values => {
    begin(undefined);
};

module.exports = {
    handleAdventure,
    testing
};
