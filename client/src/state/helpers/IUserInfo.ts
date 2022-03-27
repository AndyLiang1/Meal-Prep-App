import { Day } from "../../types";

export interface UserInfoInterface {
    username: string;
    id: string;
    accessToken: string;
    loggedIn: boolean;
    days?: Day[]
}
