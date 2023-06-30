const Joi = require('joi');

const shippingSchema = Joi.object({
    gerarPdf: Joi.boolean().required(),
    formatoPdf: Joi.string().required(),
    pedido: {
        tipo: Joi.string().required(),
        numero: Joi.string(),
        serie: Joi.string(),
        chave: Joi.string(),
        chaveCTe: Joi.string(),
        xml: Joi.string(),
        numeroCli: Joi.string(),
        vlrMerc: Joi.number(),
        pesoMerc: Joi.number()
    },
    remetente: {
        nome: Joi.string().required(),
        cnpjCpf: Joi.string(),
        endereco: {
            logradouro: Joi.string().required(),
            numero: Joi.string().required(),
            complemento: Joi.string(),
            bairro: Joi.string().required(),
            cep: Joi.string().required(),
            cidade: Joi.string().required(),
            uf: Joi.string().required(),
        },
        contato: Joi.string().required(),
        email: Joi.string(),
        celular: Joi.string(),
    },
    destinatario: {
        nome: Joi.string().required(),
        cnpjCpf: Joi.string(),
        endereco: {
            logradouro: Joi.string().required(),
            numero: Joi.string().required(),
            complemento: Joi.string(),
            bairro: Joi.string().required(),
            cep: Joi.string().required(),
            cidade: Joi.string().required(),
            uf: Joi.string().required(),
        },
        contato: Joi.string().required(),
        email: Joi.string(),
        celular: Joi.string(),
    },
    /* volumes: [
        {
            peso: req.body.peso,
            altura: req.body.altura,
            largura: req.body.largura,
            comprimento: req.body.comprimento,
            tipo: req.body.tipo,
            produto: req.body.produto,
            ean: req.body.ean,
            valor: req.body.valor,
            quantidade: req.body.quantidade,
            numeroCli: req.body.numeroCli
        }
    ], */
    produtos: [
        {
            peso: Joi.number().required(),
            altura: Joi.number().required(),
            largura: Joi.number().required(),
            comprimento: Joi.number().required(),
            produto: Joi.string().required(),
            valor: Joi.number().required(),
            quantidade: Joi.number().required(),
        }
    ],
    referencia: Joi.string(),
    servicos: Joi.array().required()
});


module.exports = {
    shippingValidation: (req, res, next) => {
        const { error } = shippingSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    }
}
