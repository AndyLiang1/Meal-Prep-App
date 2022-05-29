import Joi from 'joi';


const register = (email: string) => {
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } })
    });
    const { error } = schema.validate({ email: email });
    return error
    
}

const validator = {
    register
}

export default validator