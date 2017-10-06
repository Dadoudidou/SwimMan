import * as winston from "winston"
import * as mysql from "mysql2"

export type WinstonMysqlTransportOptions = {
    host: string
    user: string
    database: string
    table: string
    password?: string
    fields?: { [key: string]: string }
} & winston.TransportOptions

export class WinstonMysqlTransport extends winston.Transport {

    silent = true
    name = "mysql"
    options: Partial<WinstonMysqlTransportOptions> = {
        fields: {
            level: "level",
            meta: "meta",
            message: "message",
            timestamp: "timestamp"
        }
    }
    connection = undefined

    constructor(opts: WinstonMysqlTransportOptions){
        super(opts);
        if(!opts.host) throw new Error("the database host is required");
        if(!opts.user) throw new Error("the database user is required");
        if(!opts.database) throw new Error("the database name is required");
        if(!opts.table) throw new Error("the database table is required");
        this.options = {
            ...this.options,
            ...opts
        }
        //this.connection = mysql.createConnection(opts);
    }

    log(level: string, msg: string, metaOrCallback: winston.LogCallback | any | any[], callback: winston.LogCallback){

        function formatQuotes(req: string): string {
            if(!req) return null;
            return req.replace(/'/,"\'").replace(/"/,"\"");
        }

        let _cols: string[] = [];
        let _vals: string[] = [];

        for(let key in this.options.fields){
            switch(key){
                case "level" : 
                _cols.push(this.options.fields.level);
                _vals.push(formatQuotes(level));
                break;

                case "message" : 
                _cols.push(this.options.fields.message);
                _vals.push(formatQuotes(msg));
                break;

                case "timestamp" : 
                _cols.push(this.options.fields.timestamp);
                _vals.push(new Date().toISOString());
                break;

                case "meta" : 
                if(typeof metaOrCallback != "function"){
                    _cols.push(this.options.fields.meta);
                    _vals.push(formatQuotes(JSON.stringify(metaOrCallback)));
                }
                break;

                default:
                if(typeof metaOrCallback != "function" && 
                typeof metaOrCallback == "object" && 
                !Array.isArray(metaOrCallback)){
                    if(metaOrCallback[key] != undefined && 
                    (typeof metaOrCallback[key] == "string" ||
                    typeof metaOrCallback[key] == "number")) {
                        _cols.push(this.options.fields[key]);
                        _vals.push(formatQuotes(String(metaOrCallback[key])));
                    }
                }
            }
        }


        // -- construction requete
        let _req = `INSERT INTO ${this.options.table} (${_cols.join(", ")}) VALUES ('${_vals.join("','")}')`;
        //console.log(_req);
        // -- sauvegarde en bdd
        //this.connection.execute(_req);

        // -- callback
        if(typeof metaOrCallback == "function"){
            metaOrCallback(undefined, level, msg, metaOrCallback);
        } else if(callback) {
            callback(undefined, level, msg, metaOrCallback);
        }
    }

}