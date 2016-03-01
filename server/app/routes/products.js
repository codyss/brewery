'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/products');


router.get('/', (req, res, next) => {
  Product.find()
  .then(products => res.json(products))
  .then(null,next);
});

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .then(product => res.json(product))
  .then(null,next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
  .then(product => res.json(product))
  .then(null,next);
});

router.put('/:id', (req, res, next) => {
  Product.findBydId(req.params.id)
  .then(Product => {
    Product = req.body;
    Product.save();
    res.json(Product);
  })
  .then(null, next);
});

router.delete('/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .then(Product => {
    Product.remove();
    res.sendStatus(204);
  })
  .then(null, next);
});


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});