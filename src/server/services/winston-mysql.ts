import * as winston from "winston"
import * as mysql from "mysql2"

export type WinstonMysqlTransportOptions = {
    host: string
    user: string
    database: string
    table: string
    password?: string
    fields?: { [key: string]: string }
    metaFunc?: (level: string, msg: string, meta: any) => any
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
        this.connection = mysql.createConnection(opts);
    }

    log(level: string, msg: string, metaOrCallback: winston.LogCallback | any | any[], callback: winston.LogCallback){

        function formatQuotes(req: string): string {
            if(!req) return null;
            return req.replace(/(['"])/g,"\\$1");
        }

        let _cols: string[] = [];
        let _vals: string[] = [];

        let _callback = (typeof(metaOrCallback) != "function") ? callback : metaOrCallback;
        let _meta = (typeof(metaOrCallback) != "function") ? metaOrCallback : undefined;
        if(this.options.metaFunc){
            _meta = this.options.metaFunc(level, msg, _meta)
        }

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
                if(_meta != undefined && _meta != null){
                    let __meta = {};
                    for(let key in _meta){
                        if( this.options.fields[key] == undefined ) __meta[key] = _meta[key];
                    }
                    _cols.push(this.options.fields.meta);
                    _vals.push(formatQuotes(JSON.stringify(__meta)));
                }
                break;

                default:
                if(typeof _meta != "function" && 
                typeof _meta == "object" && 
                !Array.isArray(_meta)){
                    if(_meta[key] != undefined && 
                    (typeof _meta[key] == "string" ||
                    typeof _meta[key] == "number")) {
                        _cols.push(this.options.fields[key]);
                        _vals.push(formatQuotes(String(_meta[key])));
                    }
                }
            }
        }

        
        // -- construction requete
        let _req = `INSERT INTO ${this.options.table} (${_cols.join(", ")}) VALUES ('${_vals.join("','")}')`;
        //console.log(_req);
        // -- sauvegarde en bdd
        this.connection.execute(_req);

        // -- callback
        if(_callback) {
            _callback(undefined, level, msg, _meta);
        }
    }

}