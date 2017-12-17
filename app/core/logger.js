const winston = require('winston');

const combined = new winston.transports.File({ filename: 'combined.log' });
const error = new winston.transports.File({ filename: 'error.log', level: 'error' });
const cons = new winston.transports.Console({format: winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.simple()
)});

winston.add(error);
winston.add(combined);
winston.add(cons);

module.exports = winston;
