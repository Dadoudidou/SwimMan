/*function isObject(avar) {
    // cosntructor.name tested for `function Animal(){}; var a = new Animal(); isObject(a);` will return true otherwise as it is [Object object]
    return Object.prototype.toString.call(avar) === '[object Object]' && avar.constructor.name === 'Object';
}

export function createGqlQuery2(obj) {
    let shape = [];

    for(let key in obj){
        let val = obj[key];
        shape.push(isObject(val) ? `${key} { ${createGqlQuery2(val)} }` : key);
    }

    //for (let [key, val] of Object.entries(obj))
    //    shape.push(isObject(val) ? `${key} { ${createGqlQuery(val)} }` : key);

    return shape.join(' ');
}*/

/*export function createGQLQuery(obj) {
    let result = Object.keys(obj).map((k) => {
        let query = `${k}`;
        let element = obj[k];
        if (element) {
            if (element.aliasFor) {
                query = `${k}:${element.aliasFor}`;
            }
            if (element.fragment) {
                query = `fragment ${k} on ${element.fragment}`;
            }
            if (element.args) {
                let args = Object.keys(element.args).map((argKey) => {
                    let argVar = "", processed = false;
                    if (element.processArgs) {
                        if (element.processArgs[argKey]) {
                            argVar = element.processArgs[argKey](element.args[argKey]);
                            processed = true;
                        }
                    }
                    if (!processed) {
                        if (typeof element.args[argKey] === "object") {
                            argVar = JSON.stringify(element.args[argKey]).replace(/\"([^(\")"]+)\":/g, "$1:");
                        } else {
                            argVar = `"${element.args[argKey]}"`;
                        }
                    }
                    return `${argKey}:${argVar}`;
                }).join();
                query = `${query}(${args})`;
            }
            if (element.fields) {
                let fields = createGQLQuery(element.fields);
                query = `${query}${fields}`;
            }
        }
        return `${query}`;
    }).join();
    return `{${result}}`;
}*/

const isObject = (obj) => typeof(obj) == "object" && !Array.isArray(obj) && obj!=null;
const isUndefined = (obj) => typeof(obj) == "undefined";
const isArray = (obj) => Array.isArray(obj);
const isString = (obj) => typeof(obj) == "string";
const isNumber = (obj) => typeof(obj) == "number";
const isBoolean = (obj) => typeof(obj) == "boolean";
const isFunction = (obj) => typeof(obj) == "function";

export function makeGraphQlQuery(obj: any){
    let _shape = [];


    if(isUndefined(obj)){
    } else if(isObject(obj)){

        for(let key in obj){
            let val = obj[key];
            if(isObject(val)){
                _shape.push(`${key} { ${makeGraphQlQuery(val)} }`);
            } else if(isFunction(val)){
                //_shape.push(`${key} ${makeGraphQlQuery(val)}`);
            } else {
                _shape.push(`${key}${makeGraphQlQuery(val)}`);
            }
        }

    } else if(isArray(obj)){
    } else if(isFunction(obj)){
    } else if(isString(obj)){
        _shape.push(`:"${obj}"`)
    } else if(isNumber(obj)){
        _shape.push(`:${obj}`)
    } else if(isBoolean(obj)){
        _shape.push(`:${(obj) ? "true" : "false"}`)
    } else {
    }

    return _shape.join(' ')
}