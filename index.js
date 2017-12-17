'use strict';
require('dotenv');
const { VERIFY_TOKEN, PAGE_ACCESS_TOKEN } = process.env;
const { handleMessage, handlePostback } = require('./app/core/messenger');
const { asyncMiddleware } = require('./app/middlewares/asyncMiddleware');

const
  request = require('request-promise'),
  express = require('express'),
  body_parser = require('body-parser'),
  path = require('path'),
  app = express().use(body_parser.json()); // creates express http server

app.listen(process.env.PORT || 1337, () => console.log(`Server listening on port ${process.env.PORT || 1337}`));

// Serve static files
app.use('/', express.static(path.join(__dirname, 'public')));

app.post('/webhook', asyncMiddleware(async (req, res) => {
  const data = req.body;
  // Make sure this is a page subscription
  if (data.object === 'page') {
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      const pageID = entry.id;
      const timeOfEvent = entry.time;
      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          handleMessage(event);
        } else if (event.postback) {
          handlePostback(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
}));

app.get('/webhook', asyncMiddleware(async (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    console.log("Webhook validated.");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
}));
