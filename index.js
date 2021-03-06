'use strict';
require('dotenv');
const { VERIFY_TOKEN, PAGE_ACCESS_TOKEN } = process.env;
const { handleMessage, handlePostback } = require('./app/core/messenger');
const { asyncMiddleware } = require('./app/middlewares/asyncMiddleware');
const logger = require('./app/core/logger');
const
  request = require('request-promise'),
  express = require('express'),
  body_parser = require('body-parser'),
  path = require('path'),
  app = express().use(body_parser.json()); // creates express http server

app.listen(process.env.PORT || 1337, () => logger.info(`Server listening on port ${process.env.PORT || 1337}`));

// Serve static files
app.use('/', express.static(path.join(__dirname, 'public'),{extensions:['html']}));

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
        logger.debug("Event:", event);
        if (event.message) {
          handleMessage(event);
        } else if (event.postback) {
          handlePostback(event);
        } else {
          logger.info("Webhook received unknown event: ", event);
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
    logger.info("Webhook validated.");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    logger.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
}));
