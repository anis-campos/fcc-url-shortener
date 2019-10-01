const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const urlSchema = new Schema({
  short: Number,
  long: String
});
const UrlModel = mongoose.model('Url',urlSchema);


const urlSequenceSchema = new Schema({
  inc: {type:Number, default:0}
})
const urlSequenceModel =  mongoose.model('UrlSeq',urlSequenceSchema);


module.exports.UrlModel = UrlModel