const RegisterResult = {
    __resolveType(obj: any) {
        if (obj.message) return 'RegisterError';
        if (obj.user) return 'RegisterSuccess';
        return null;
    }
};

export default RegisterResult
