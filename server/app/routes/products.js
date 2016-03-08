'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Store = mongoose.model('Store');
var _ = require('lodash');

router.get('/', (req, res, next) => {
  Product.find()
  .then(products => res.json(products))
  .then(null,next);
});

router.get('/store/:id', (req, res, next) => {
  Products.find({store: req.params.id})
  .populate('categories')
  .then(products => res.json(products))
  .then(null, next);
})

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .populate('categories')
  .then(product => res.json(product))
  .then(null,next);
});



router.get('/category/:cat', (req, res, next) => {
  Product.findByCategory(req.params.cat)
  .then(products => res.json(products))
  .then(null,next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
  .then(product => res.json(product))
  .then(null,next);
});

router.put('/:id', (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(function(updatedProd) {
    res.json(updatedProd);
    next();
  })
  .then(null,next)

});

router.delete('/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .then(product => {
    product.remove();
    res.sendStatus(204);
  })
  .then(null, next);
});

module.exports = router;
