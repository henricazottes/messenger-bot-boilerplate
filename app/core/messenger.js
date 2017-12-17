'use strict';

const { VERIFY_TOKEN, PAGE_ACCESS_TOKEN, WIT_TOKEN } = process.env;
const request = require('request');

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
      console.log('Message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}

module.exports = {
  handleMessage: async function (sender_psid, received_message) {
    let response;

    if (received_message.text) {
      response = {
        "text": `You sent the message: "${received_message.text}".`
      }
    }
    await callSendAPI(sender_psid, response);
  },
  handlePostback: async function (sender_psid, received_postback) {
    let response;
    let payload = received_postback.payload;

    if (payload === 'You are beautiful') {
      response = { "text": "Thanks!" }
    } else if (payload === 'Not my type') {
      response = { "text": "F**k off" }
    }
    await callSendAPI(sender_psid, response);
  }
}
