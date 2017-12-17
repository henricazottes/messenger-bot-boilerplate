const chalk = require('chalk');
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'green',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'magenta'
}

const logger = Object.keys(levels).map(level => {
  return (...args) => {
    if (levels[level] <= levels[(process.env.LOG_LEVEL || 2)]) {
      args.map(arg => {
        if (typeof arg === 'object') {
          text = JSON.stringify(arg);
        }
        console.log(chalk[colors[level]](text));
      });
    }
  }
});

console.log("logger info:" , logger.info);

module.exports = logger;
