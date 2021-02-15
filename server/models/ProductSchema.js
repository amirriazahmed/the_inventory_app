const mongoose = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: Number,
  item: String,
  quantity: Number,
  supplier: String,
  brand: String,
  category: String
});

// productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model('Product', productSchema, 'Product');
module.exports = productModel