const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  quantity: Joi.string().required(),
  image: Joi.binary,
});

module.exports = {
  validateProduct: (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  },
};
