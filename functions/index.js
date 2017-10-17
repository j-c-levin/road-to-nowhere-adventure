"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionsOnGoogle = require("actions-on-google");
const DialogFlowApp = ActionsOnGoogle.DialogflowApp;
const functions = require("firebase-functions");
const index_1 = require("./nodes/index");
var ToolType;
(function (ToolType) {
    ToolType[ToolType["Build"] = 0] = "Build";
})(ToolType = exports.ToolType || (exports.ToolType = {}));
const player = {
    food: 2,
    tools: []
};
const startingNode = '0.0';
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
        message += ', ';
        message += tool.name;
    });
    message += '.';
    return message;
};
const resetPlayer = () => {
    player.food = 2;
    player.tools = [];
};
const resetNodes = () => {
    index_1.nodes.forEach((node) => {
        node.reset(node);
    });
};
const begin = (app) => {
    resetPlayer();
    resetNodes();
    currentNode = index_1.GetRemoteNode(startingNode);
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
const generalStatus = (app) => {
    app.ask(locationMessage());
};
const endJourney = (app) => {
    const message = 'Out of food, your journey ends here.  However, endings are beginnings anew, will you journey again?';
    app.ask(message);
};
const endOfGame = (app) => {
    const message = `You step towards the unknown.  Maybe you'll find something.  Maybe your story will vanish without a trace.  Or maybe someone journeying along the Road to Nowhere will someday chance across a patchily repaired dam and wonder how that came to pass.  For now though, there is only Away.`;
    app.ask(message);
};
const handleJourneyDirection = (app) => {
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
    }
    else if (typeof currentNode.paths[direction].id === 'undefined') {
        app.ask('There is nothing to go to in that direction.');
    }
    else {
        player.food -= currentNode.paths[direction].distance;
        currentNode = index_1.GetRemoteNode(currentNode.paths[direction].id);
        app.ask(locationMessage());
    }
};
const handleInteraction = (app) => {
    const interaction = app.getContext('journey-active').parameters['journey-interaction'];
    const p = player;
    const interactionData = {
        interactionType: index_1.GetInteractionAsEnum(interaction),
        requestingNode: currentNode,
        player: p
    };
    const interactionResponse = currentNode.interaction(interactionData);
    // Augment the player with whatever the interaction achieved
    Object.keys(interactionResponse.data).forEach((element) => {
        if (element !== 'tools') {
            player[element] += interactionResponse.data[element];
        }
        else {
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
