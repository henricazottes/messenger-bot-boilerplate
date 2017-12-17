'use strict';
require('dotenv');
const { VERIFY_TOKEN, PAGE_ACCESS_TOKEN } = process.env;

const logger = require('./logger');
const messages = require('./messages');
const request = require('request');

const NLP_TRESHOLD = 0.8;

async function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  await request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      logger.info('Message sent!')
    } else {
      logger.error("Unable to send message:" + err);
    }
  });
}

function firstEntity(nlp, name) {
  return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
}

module.exports = {
  handleMessage: async function (event) {
    const sender_psid = event.sender.id;
    const received_message = event.message;
    let response;
    let greeting = firstEntity(received_message.nlp, 'greeting');

    if (greeting && greeting.confidence > NLP_TRESHOLD) {
      response = {
        'text': 'Hi there! :) Type "help" when you need it.'
      };
    } else if (received_message.text == "help") {
      response = {
        'text': `You can use following messages to trigger actions:
        - help
        - button
        - menu
        - default
        - image
        - generic`
      };
    } else {
      if (messages[received_message.text]) {
        response = messages[received_message.text]
      } else {
        response = {
          "text": `You sent: "${received_message.text}".`
        };
      }
    }
    await callSendAPI(sender_psid, response);
  },

  handlePostback: async function (event) {
    const sender_psid = event.sender.id;
    const payload = event.postback.payload;
    let response;

    if (payload === 'pretty') {
      response = { "text": "Thanks!" };
    } else if (payload === 'ugly') {
      response = { "text": "F**k off" };
    }
    await callSendAPI(sender_psid, response);
  }
}
