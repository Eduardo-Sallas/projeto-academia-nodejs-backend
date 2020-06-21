const express = require('express');
const router = express.Router();
const Produto = require('../models/produtos');
const mongoose = require('mongoose');

//requisição de GET
router.get('/', (req, res, next)=>{
    Produto.find()
    .exec()
    .then(doc=>{
        res.status(200).json(doc);
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    });
});

//requisição de POST
router.post('/', (req, res, next)=>{

    const produto = new Produto({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        preco: req.body.preco
    });
    produto.save()
    .then(result => {
        res.status(201).json({
            message: 'POST request para /produtos',
            produtoCriado: produto
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    }); 
});

//requisição de GET de produto específico pelo ID; 
router.get('/:produtoId', (req, res, next)=>{
    const id = req.params.produtoId;
    Produto.findById(id)
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error:err})
    })
});

router.delete('/:produtoId', (req, res, next) => {
    const id = req.params.produtoId;
    Produto.findByIdAndDelete(id)
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error:err});
    })  
});

router.put('/:produtoId', (req, res, next) => {
    const id = req.params.produtoId;
    Produto.findByIdAndUpdate(id, req.body, {new:true})
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error:err});
    })  
});

module.exports = router;