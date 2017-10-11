'use strict';

const { ApiAiApp } = require('actions-on-google');
const functions = require('firebase-functions');
const nodes = require('./nodes').nodes;

const player = {
    food: 5,
    weapons: 0,
    tools: 0
};

let currentConnections = [];

const getRandomValue = array => array[Math.floor(Math.random() * array.length)];

const unhandledDeepLinks = app => {
    app.tell('you aren\'t making any sense');
};

const test = app => {
    app.tell('Well, you made your test work. Good job hero.');
};

const generatePlayerStatus = () => {
    return `\nYou have ${player.food} food rations, ${player.weapons} weapons and ${player.tools} tools.
    `;
};

const getRandomPaths = details => {
    let response = [];
    if (details.number > 3) {
        console.log(`There cannot be more than 3 possible directions, tried to ask for ${details.number} directions`);
    }
    for (let i = 0; i < details.number; i++) {
        let destination = getRandomValue(nodes);
        // Check for unique destinations
        while (response.indexOf(destination) !== -1) {
            destination = nodes[getRandomValue(nodes)];
        }
        response.push(destination);
    }
    return response;
};

const begin = app => {
    let message = `\nYour journey begins.${generatePlayerStatus()}`;
    currentConnections = getRandomPaths({ number: 2 });
    currentConnections.forEach((connection) => {
        message += '\n';
        message += `To the ${connection.direction}, `;
        message += connection.description;
    });
    message += '\n\n';
    message += 'Where will you journey?';
    app.ask(message);
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
    begin();
};

module.exports = {
    handleAdventure,
    testing
};
