"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionsOnGoogle = require("actions-on-google");
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
const DialogFlowApp = ActionsOnGoogle.DialogflowApp;
let currentConnections;
const getRandomValue = array => array[Math.floor(Math.random() * array.length)];
const unhandledDeepLinks = app => {
    app.tell('you aren\'t making any sense');
};
const test = app => {
    app.tell('Well, you made your test work. Good job hero.');
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
    currentConnections = index_1.nodes[0];
    let message = `\nYour journey begins.\n`;
    message += generateLocationMessage();
    message += generatePlayerStatus();
    message += '\n';
    message += 'Where will you journey?';
    console.log(message);
    app.ask(message);
};
const generateLocationMessage = () => {
    let message = 'You stand at';
    message += ' ';
    message += `${currentConnections.name},`;
    message += ' ';
    message += currentConnections.function().description;
    message += ' ';
    Object.keys(currentConnections.paths).forEach((direction) => {
        if (typeof currentConnections.paths[direction] === 'undefined') {
            return;
        }
        const path = currentConnections.paths[direction];
        const node = index_1.GetRemoteNode(path.id);
        const distance = index_1.GetDistanceAsString(currentConnections.paths[direction]);
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
//# sourceMappingURL=index.js.map