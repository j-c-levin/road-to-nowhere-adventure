"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionsOnGoogle = require("actions-on-google");
const functions = require("firebase-functions");
const index_1 = require("./nodes/index");
const player = {
    food: 5,
    weapons: 0,
    tools: 0
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
    return `\nYou have ${player.food} food rations, ${player.weapons} weapons and ${player.tools} tools.`;
};
const begin = (app) => {
    let message = `\nYour journey begins.${generatePlayerStatus()}`;
    currentConnections = index_1.nodes[0];
    message += '\n';
    message += 'Where will you journey?';
    console.log(message);
    app.ask(message);
};
const generateLocationMessage = () => {
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