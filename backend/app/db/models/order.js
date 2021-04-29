const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean
        } 
    },
    {
        timestamps: true
    } 
) 

OrderSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order