const express = require('express')
const router = express.Router()

const orderController = require('../controllers/orderController') 

router.get('/',  orderController.getAllOrders)          // get all orders
router.get('/processing', orderController.getUncompletedOrders) // show uncompleted orders
router.get('/:id', orderController.getOrderById)       // get order by id
router.post('/', orderController.saveOrder)            // save order
router.put('/:id', orderController.updateOrder)        // update order
router.delete('/:id', orderController.deleteOrderById) // delete order by id
router.delete('/', orderController.deleteAllOrders)    // delete all orders

module.exports = router