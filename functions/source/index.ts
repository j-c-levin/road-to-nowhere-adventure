import * as ApiAiApp from 'actions-on-google';
import * as functions from 'firebase-functions';
import { nodes, Node } from './nodes/index';

interface Player {
    food: number;
    weapons: number;
    tools: number;
}

const player: Player = {
    food: 5,
    weapons: 0,
    tools: 0
};

let currentConnections: Node;

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

const begin = (app): void => {
    let message = `\nYour journey begins.${generatePlayerStatus()}`;
    currentConnections = nodes[0];
    message += '\n';
    message += 'Where will you journey?';
    console.log(message);
    app.ask(message);
};

const generateLocationMessage = (): void => {

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
    const app = new ApiAiApp({ request, response });
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
