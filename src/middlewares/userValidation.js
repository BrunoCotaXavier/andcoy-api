const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  rua: Joi.string().required(),
  cep: Joi.number().required(),
  number_home: Joi.number().required(),
  complement: Joi.string(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  validateUser: (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  },
};
