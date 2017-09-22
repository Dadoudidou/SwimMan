export const UpdateArgs = (args: any) => {
    let __args: any = {};
    for(let key in args){
        if(typeof(args[key]) == "string"){
            __args[key] = { $like: "%" + args[key] + "%" }
        } else {
            __args[key] = args[key];
        }
    }
    return __args;
}