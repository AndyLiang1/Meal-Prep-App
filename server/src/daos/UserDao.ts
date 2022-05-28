import UserModel, { IUser, IUserDocument } from '../models/User';

export class UserDao {
    constructor(private model: typeof UserModel) {
    }
.
    public async create(user: IUser) {
        const newUser = await this.model.create(user)
        return newUser
    }



    public async get(userId: string) {
        const retUser = await this.model.findOne({ _id: userId });
        return retUser;
    }

    public async getEmail(email: string) {
        const retUser = await this.model.findOne({email: email})
        return retUser
    }
}
