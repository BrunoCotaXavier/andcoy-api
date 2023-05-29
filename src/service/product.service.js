const db = require('../models/index')
const fs = require('fs');
const path = require('path');

const createProduct = async (data) => {
    try {
        const newProduct = await db.Product.create({
            name: data.name,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            image: data.image,
        })
        return newProduct;
    } catch (error) {
        throw new Error('Erro ao criar produto: '+ error);
    }
}

const getAllProducts = async () => {
    try {
        const products = await db.Product.findAll()
        return products;
    } catch (error) {
        throw new Error('Erro ao listar produtos: '+ error);
    }
}

const getProductById = async (id) => {
    try {
        const product = await db.Product.findByPk(id)
        return product;
    } catch (error) {
        throw new Error('Erro ao pegar produto: '+ error);
    }
}

const deleteProduct = async (data) => {
    try {
        const product = await db.Product.findByPk(data.id) 
        const pathProject = path.resolve(__dirname , '../../')
        const imgPath = pathProject + `/public/images/${product.image}`
        fs.unlink(imgPath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Imagem excluída com sucesso!');
          });
        return await product.destroy();
    } catch (error) {
        throw new Error('Erro ao deletar produto: '+ error);
    }
}

const editProduct = async (data) => {
    try {
        const newProduct = await db.Product.findByPk(data.id) 
        newProduct.name = data.name? data.name : newProduct.name
        newProduct.price = data.price? data.price : newProduct.price
        newProduct.quantity = data.quantity? data.quantity : newProduct.quantity
        newProduct.description = data.description? data.description : newProduct.description
        newProduct.save()
        return newProduct;
    } catch (error) {
        throw new Error('Erro ao alterar produto: '+ error);
    }
}

const removeOne = async (data) => {
    try {
        const newProduct = await db.Product.findByPk(data.id) 
        if(newProduct.quantity === 0){
            return 
        }
        newProduct.quantity = parseFloat(newProduct.quantity) - 1
        newProduct.save()
        return newProduct;
    } catch (error) {
        throw new Error('Erro ao remover um produto: '+ error);
    }
}


module.exports = {
    createProduct,
    getAllProducts,
    deleteProduct,
    editProduct,
    getProductById,
    removeOne
}