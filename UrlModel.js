const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const urlSchema = new Schema({
  short: Number,
  long: String
});

const UrlModel = mongoose.model('Url',urlSchema);

module.exports.UrlModel = UrlModel