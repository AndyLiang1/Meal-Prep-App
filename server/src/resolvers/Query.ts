import Logging from '../library/Logging';
import mongoose from 'mongoose';
import User from '../models/User';

const Query = {
    boop: (parent: any, args: any, context: any, info: any): any => {
        return 'Beep! Hello world! :D';
    },

    getUser: async (parent: any, args: any, context: any, info: any) => {
        try {
            const { id } = args;
            return await User.findOne({ id: id });
        } catch (error) {
            Logging.error(error);
        }
    },

    // =========================================================================
    // For testing
    // =========================================================================

    clearDb: async () => {
        await User.deleteMany();
        return null;
    }
};

export default Query;
