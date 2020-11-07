import * as mongoose from 'mongoose'

export const ProductSchema = new mongoose.Schema({
    name: String,
    quantity: String,
    value: String,
    idClient: String
}, {
    timestamps: true, collection: 'Products'
});