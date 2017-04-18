const __prop = function (obj: any, prop: any, val?: any) {

    //console.log("Prop", obj, prop, val);
    if (obj === undefined || obj === null) return undefined;

    if (typeof (prop) === 'string') {
        return __prop(obj, prop.split('.') as any, val);
    } else if (prop === undefined) {
        return undefined;
    } else {

        if (prop.length === 0) {
            return obj;
        } else {

            //Matches Array : d[e], d[key=value], d[], ...
            var matchesArray = prop[0].match(/(.*)\[(.*)\]/);
            if (matchesArray) {

                var matchProp = matchesArray[1];
                var matchArgs = matchesArray[2];

                var tempObj = (matchProp !== '') ? obj[matchProp] : obj;

                if (Array.isArray(tempObj)) {

                    if (matchArgs.match(/(.+)=(.+)/)) {
                        // [key=value]
                        var matchesExpr = matchArgs.match(/(.+)=(.+)/);
                        var i = 0, trouve = false;
                        while (!trouve && i < tempObj.length) {
                            if (String(tempObj[i][matchesExpr[1]]) === String(matchesExpr[2]))
                                trouve = true;
                            i++;
                        }
                        if (trouve) return __prop(tempObj[i - 1], prop.slice(1), val);

                        //ajout dans un tableau si besoin
                        if (val !== undefined) {
                            var nobj = {};
                            nobj[matchesExpr[1]] = matchesExpr[2];
                            tempObj.push(nobj);
                            return __prop(tempObj[tempObj.length - 1], prop.slice(1), val);
                        }

                        return undefined;

                    } else if (parseInt(matchArgs) != Number.NaN) {
                        // [0], [1], [2], ...
                        let matchesExpr = parseInt(matchArgs);
                        return __prop(tempObj[matchesExpr], prop.slice(1), val);
                    } else {
                        return undefined;
                    }

                } else {

                    return undefined;
                }

            } else {

                if (prop.length === 1 && val !== undefined) {
                    //insertion valeur
                    return obj[prop[0]] = val;
                } else {

                    //retour de l'objet suivant
                    if (obj === undefined || obj === null) return undefined;
                    return __prop(obj[prop[0]], prop.slice(1), val);
                }
            }

        }

    }
};

export const get = (obj: any, prop: string) => { return __prop(obj, prop); }
export const set = (obj: any, prop: string, val: any) => { return __prop(obj, prop, val); }