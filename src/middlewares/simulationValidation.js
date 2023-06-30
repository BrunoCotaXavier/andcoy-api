const Joi = require('joi');

const simulationSchema = Joi.object({
    cepOrigem: Joi.string().required(),
    cepDestino: Joi.string().required(),
    vlrMerc: Joi.number().required(),
    pesoMerc: Joi.number().required(),
    produtos: [
        {
            peso: Joi.number().required(),
            altura: Joi.number().required(),
            largura: Joi.number().required(),
            comprimento: Joi.number().required(),
            valor: Joi.number().required(),
            quantidade: Joi.number().required(),
        }
    ],
    servicos: [Joi.string().required()]
});


module.exports = {
    simulationValidation: (req, res, next) => {
        const { error } = simulationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    }
}
