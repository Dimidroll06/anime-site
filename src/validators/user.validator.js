const Joi = require('joi');

const editProfileSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(10),
    
    email: Joi.string()
        .email() 
})
    .unknown(false);

const validateEditProfile = async (req, res, next) => {
    try {
        await editProfileSchema.validateAsync(req.body || {});
        next();
    } catch (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }
};

const editPasswordSchema = Joi.object({
    password: Joi.string()
        .min(8)
        .required(),
    
        repeat_password: Joi.ref('password')
})
    .with('password', 'repeat_password')
    .unknown(false);

const validateEditPassword = async (req, res, next) => {
    try {
        await editPasswordSchema.validateAsync(req.body || {});
        next();
    } catch (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }
};

module.exports = {
    validateEditProfile,
    validateEditPassword,
};