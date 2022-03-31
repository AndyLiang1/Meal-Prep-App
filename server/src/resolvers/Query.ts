import Logging from '../library/Logging';
import mongoose from 'mongoose';
import User from '../models/User';
import { Scalars } from '../generated/graphql-server';

const Query = {
    boop: (parent: any, args: any, context: any, info: any): any => {
        return 'Beep! Hello world! :D';
    },
    getUser: async (parent: any, args: any, context: any, info: any) => {
        try {
            const { id }: { id: string } = args;
            const user = await User.findOne({ _id: id });
            return user;
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
