import Logging from '../library/Logging';
import mongoose from 'mongoose';
import User from '../models/User';
import { Scalars } from '../generated/graphql-server';

const Query = {
    boop: (parent: any, args: any, context: any, info: any): any => {
        return 'Beep! Hello world! :D';
    },
    getMeals: async (parent: any, args: any, context: any, info: any) => {
        Logging.info('Getting meals')
        try {
            const { id }: { id: string } = args;
            const user = await User.findOne({ _id: id });
            console.log(user!.day1[0].name)
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
