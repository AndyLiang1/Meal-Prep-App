import Logging from "../library/Logging";

const loggingMiddleware = async (resolve: any, root: any, args: any, context: any, info: any) => {
    const result = await resolve(root, args, context, info);
    // Logging.info(`Successfully hit endpoint. Request type: ${info.path.typename} | Request name: ${info.path.key} `);
    return result;
};

export default loggingMiddleware