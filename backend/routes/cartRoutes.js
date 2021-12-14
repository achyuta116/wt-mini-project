const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController')

router.post('/cart/:id', cartController.cart_item_post);

router.delete('/cart/:id', cartController.cart_item_delete);

router.get('/cart/:email', cartController.cart_items_get);

router.post('/order-history', cartController.order_history_post);

router.get('/order-history', cartController.order_history_get);

module.exports = router;