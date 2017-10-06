import * as winston from "winston";
import { WinstonMysqlTransport, WinstonMysqlTransportOptions } from "./winston-mysql"
import { config } from "./../config"

let _logger = new winston.Logger({
    exitOnError: false,
    transports: []
});

_logger.add(winston.transports.Console, {
    level: "debug",
    timestamp: true,
    colorize: true,
    prettyPrint: function(obj){ return JSON.stringify(obj); }
})

_logger.add(WinstonMysqlTransport as any, {
    host: config.connectors.default.host,
    user: config.connectors.default.user,
    database: config.connectors.default.database,
    password: config.connectors.default.password,
    table: "sys_log",
    level: "info",
    fields:{
        level: "level",
        meta: "meta",
        message: "message",
        timestamp: "timestamp"
    }
} as WinstonMysqlTransportOptions)

export const getLogger = () => _logger;