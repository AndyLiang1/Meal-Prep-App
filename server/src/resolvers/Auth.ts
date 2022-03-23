export const RegisterResult = {
    __resolveType(obj: any) {
        if (obj.message) return 'RegisterError';
        if (obj.user) return 'RegisterSuccess';
        return null;
    }
};

export const LoginResult = {
    __resolveType(obj: any) {
        if (obj.message) return 'LoginError';
        if (obj.user) return 'LoginSuccess';
        return null;
    }
};

