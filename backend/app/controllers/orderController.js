const Order = require('../db/models/order')


exports.getAllOrders = (req, res) => {
    Order.find({})
        .then( orders => {
            res.status(200).json(orders)
        })
        .catch( err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving from database" })
        })
}

exports.getOrderById = (req, res) => {
    const id = req.params.id
    Order
        .findOne({ _id: id })
        .then( order => {
            if ( !order ) {
                res.status(404).send({ message: `Not found order with id ${id}` })
            } else {
                res.status(200).json(order)
            }
        })
        .catch (err => {
            res.status(500).send({ message: `Error while retrieving order with id ${id}` })
        })
}

exports.saveOrder = (req, res) => {
    const title = req.body.title
    const content = req.body.content
    const completed = req.body.completed || false
    if ( !title || !content ) {
        res.status(400).send({ message: "There's no valid content" })
        return
    }
    const order = new Order({ title, content, completed })
 
    order
        .save(order)
        .then( data => {
            res.status(201).json(order)
        })
        .catch(err => {
            res.status(500).send({ message: err.messgae || "Some error occurred while sending order to the database" })
        })
    
}

exports.updateOrder = (req, res) => {
    
    const id = req.params.id

    if ( !req.body ) {
        res.status(400).send({ message: "Error: no data"})
    }
    
    Order
        .findOne({ _id: id })
        .then( order => {
            if ( !order ) {
                res.status(404).send({ message: `Not found order with id ${id}` })
            } else {
                order.title = req.body.title
                order.content = req.body.content
                order.completed = req.body.completed
 
                order
                    .save()
                    .then( data => {
                        res.status(200).json(order)
                    })
                    .catch(err => {
                        res.status(500).send({ message: err.messgae || "Some error occurred while sending order to the database" })
                    })
            }
        })
        .catch (err => {
            res.status(500).send({ message: `Error while retrieving order with id ${id}` })
        })
}

exports.deleteOrderById = (req, res) => {

    const id = req.params.id
    
    Order
        .findOne({ _id: id })
        .then( order => {
            if ( !order ) {
                res.status(404).send({ message: `Not found order with id ${id}` })
            } else {
                order
                    .deleteOne({ _id: id })
                    .then( () => {
                        res.sendStatus(204)
                    })
                    .catch(err => {
                        res.status(500).send({ message: "Error during deleting" });
                    })
            }
        })
        .catch (err => {
            res.status(500).send({ message: `Error while retrieving order with id ${id}` })
        })
}

exports.deleteAllOrders = (req, res) => {
    Order
        .deleteMany({})
        .then( data => {
            res.status(200).send({ message: `${data.deletedCount} item(s) deleted` })
        })
        .catch( err => {
            res.status(500).send({ message: err.message || "Some error occurred while removing from database" })
        })
}

exports.getUncompletedOrders = (req, res) => {
    Order
        .find({ completed: false })
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            res.status(500).send({ message: err.messsage || "Some error occured while retrieving from database" })
        })
}
   