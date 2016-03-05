'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Promise = require('bluebird');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Category = mongoose.model('Category');


//get pending order by user or session
router.get('/user/session/:userid', (req, res, next) => {
  console.log('do we get here?', req.session);
  Order.findOne({user: req.params.userid, status: 'pending'}).populate('products.product').exec()
    .then(order => {
      console.log('ORDER', order);
      if(order) res.json(order)
      else return Order.findOne({sessionId: req.session.id, status: 'pending'}).populate('products.product').exec()
    })
    .then(sessionOrder => {
      res.json(sessionOrder);
    })
    .then(null, next);
})

router.get('/session/', (req, res, next) => {
  //get any current pending orders for the current session Id
  console.log('heres the session', req.session.id)
  Order.findOne({sessionId: req.session.id , status: 'pending'}).populate({
    path: 'products.product',
    model: 'Product',
    populate: {
      path: 'categories',
      model: 'Category'
    }
  }).exec()
  .then(order => {
    console.log('did we get the order', order);
    res.json(order)
  })
  .then(null, next)
})

router.get('/', (req, res, next) => {
  Order.find({}).populate('products.product').exec()
  .then(orders => res.json(orders))
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  console.log('or  here', req.session);
  Order.findById(req.params.id).populate('products.product').exec()
  .then(order => res.json(order))
  .then(null, next)
})

router.post('/', (req, res, next) => {
  //req.body will be the productId, quantity to add
    var newOrder = new Order();
    if (req.user && req.user.id) {
      newOrder.user =req.user._id
    } else {
      newOrder.sessionId = req.session.id
    }
    newOrder.save()
    //then add the products to the order
    .then(order => {
      order.addOrCreateProduct(req.body)
      return order
    })
    .then(order => res.status(201).json(order))
    .then(null, next)
})

router.put('/:id', (req, res, next) => {
  //req.body will be the product, new quantity
  console.log('id', req.params.id);
  Order.findById(req.params.id)
  .then(order => {
    console.log('got here?');
    return order.addOrCreateProduct(req.body)
  })
  .then(updatedOrder => res.status(202).json(updatedOrder))
  .then(null, next)
})


router.put('/purchase/:id', (req, res, next) => {
  Order.findById(req.params.id).
  then(order => order.purchaseById())
  .then(order => res.json(order))
  .then(null, next)
})

router.put('/status/:id/:status', (req, res, next) => {
  Order.findById(req.params.id)
  .then(order => order.updateStatus(req.params.status))
  .then(updatedOrder => res.json(updatedOrder))
  .then(null, next)
})


router.delete('/:id', (req, res, next) => {
  //delete the order and the delete the order within the user
  Order.remove({_id: req.params.id})
  .then(() => {
    //delete the order from the users list of orders
    res.sendStatus(204)
  })
  .then(null, next)
})


router.delete('/:orderId/:userId', (req, res, next) => {
  Order.remove({_id: req.params.orderId})
  .then(() => res.sendStatus(204))
  .then(null, next)
})

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
