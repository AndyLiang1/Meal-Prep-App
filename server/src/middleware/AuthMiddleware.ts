import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import services from '../services/services';

const checkAuth = async (resolve: any, parent: any, args: any, context: any, info: any) => {
    if (!context.authorization) {
        console.error(`Error in ${info.path.key}: no auth token`);
        return {
            ok: false,
            message: `Error in ${info.path.key}: no auth token`
        };
    }
    const accessToken = context.authorization;

    try {
        const decoded = jwt.verify(accessToken, config.server.JWT_SECRET);
        if (typeof decoded != 'string' && decoded.id) {
            const user = await services.userService.get(decoded.id);
            if (!user) {
                return {
                    ok: false,
                    message: 'No user found with that id'
                };
            }
            const argsWithUser = { user, ...args };
            console.log('got user: ', user)
            const result = await resolve(parent, argsWithUser, context, info);
            return result;
        }
    } catch (err) {
        return {
            ok: false,
            message: err
        };
    }
};

const authMiddleware = {
    Query: {
        getFoodList: checkAuth,
        getMealListMeal: checkAuth
    },

    Mutation: {
        createFoodList: checkAuth,
        editFoodList: checkAuth,
        deleteFoodList: checkAuth,

        createMealListMeal: checkAuth, 
        deleteMealListMeal: checkAuth, 

        createMealListFood: checkAuth,
        editMealListFood: checkAuth, 
        deleteMealListFood: checkAuth
    }
};

export default authMiddleware;
