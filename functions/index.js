"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionsOnGoogle = require("actions-on-google");
const DialogFlowApp = ActionsOnGoogle.DialogflowApp;
const functions = require("firebase-functions");
const index_1 = require("./nodes/index");
var ToolType;
(function (ToolType) {
    ToolType[ToolType["Weapon"] = 0] = "Weapon";
    ToolType[ToolType["Equipment"] = 1] = "Equipment";
    ToolType[ToolType["Special"] = 2] = "Special";
})(ToolType || (ToolType = {}));
const player = {
    food: 5,
    tools: []
};
let currentNode;
const getRandomValue = array => array[Math.floor(Math.random() * array.length)];
const unhandledDeepLinks = app => {
    app.tell('you aren\'t making any sense');
};
const test = app => {
    app.tell('Well, you made your test work. Good job hero.');
};
const generateLocationMessage = () => {
    let message = 'You stand at the';
    message += ' ';
    message += `${currentNode.name},`;
    message += ' ';
    message += currentNode.function(currentNode).description;
    message += ' ';
    Object.keys(currentNode.paths).forEach((direction) => {
        if (typeof currentNode.paths[direction].id === 'undefined') {
            return;
        }
        const path = currentNode.paths[direction];
        const node = index_1.GetRemoteNode(path.id);
        const distance = index_1.GetDistanceAsString(currentNode.paths[direction].distance);
        message += '\n';
        message += `To the ${direction}, a ${distance} distance away, ${node.function(node).observableDescription}`;
    });
    return message;
};
const generatePlayerStatus = () => {
    let message = `\n`;
    message += `You have ${player.food} food rations`;
    player.tools.forEach((tool) => {
        message += ',';
        message += ` a ${tool.name}`;
    });
    message += '.';
    return message;
};
const begin = (app) => {
    currentNode = index_1.nodes[0];
    let message = `\nYour journey begins.\n`;
    message += locationMessage();
    app.ask(message);
};
const locationMessage = () => {
    let message = generateLocationMessage();
    message += generatePlayerStatus();
    message += '\n';
    message += 'Where will you journey?';
    return message;
};
const handleJourneyDirection = (app) => {
    const direction = app.getContext('journey-direction').parameters['journey-direction'];
    if (direction === 'south') {
        app.ask('There is no going back.');
    }
    else if (typeof currentNode.paths[direction].id === 'undefined') {
        app.ask('There is nothing to go to in that direction.');
    }
    else {
        player.food - currentNode.paths[direction].distance;
        currentNode = index_1.GetRemoteNode(currentNode.paths[direction].id);
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
