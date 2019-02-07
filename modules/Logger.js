const chalk = require('chalk');
const moment = require('moment');

class Logger {
    static log(content, type = "log") {
        const timestamp = `[${moment().format('DD-MM-YYYY HH:mm:ss')}]:`;

        switch(type)
        {
            case 'log':
                return console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content}`);
            case 'warn':
                return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content}`);
            case 'error':
                return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content}`);
            case 'debug':
                return console.log(`${timestamp} ${chalk.bgGreen(type.toUpperCase())} ${content}`);
            case 'cmd':
                return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
            case 'ready':
                return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
            default:
                throw new TypeError("Logger type must either be warn, debug, log, ready cmd or error");
        }
    }

    static error(content) {
        return this.log(content, "error");
    }

    static warn(content) {
        return this.log(content, "warn");
    }

    static debug(content) {
        return this.log(content, "debug");
    }

    static cmd(content) {
        return this.log(content, "cmd");
    }

    static ready(content) {
        return this.log(content, "ready");
    }
}

module.exports = Logger;