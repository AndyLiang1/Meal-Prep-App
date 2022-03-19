import Logging from "../library/Logging";

const Query = {
    boop: (parent: any, args: any, context: any, info: any):any => {
        return 'Beep! Hello world! :D';
    }
}


export default Query