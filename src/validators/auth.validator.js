const Joi = require('joi');

const regsiterSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(10)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(8)
        .required(),

    repeat_password: Joi.ref('password')

})
    .with('password', 'repeat_password')
    .unknown(false);

const validateRegister = async (req, res, next) => {
    try {
        await regsiterSchema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }
};

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(8)
        .required()
}).unknown(false);

const validateLogin = async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }
};

module.exports = {
    validateRegister,
    validateLogin
};
