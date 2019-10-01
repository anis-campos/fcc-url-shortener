const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const urlSchema = new Schema({
  short: {default:-1,type:Number},
  long: {type:String, unique:true}
});
const UrlModel = mongoose.model('Url',urlSchema);


const urlSequenceSchema = new Schema({
  inc: {type:Number, default:0}
})
const urlSequenceModel =  mongoose.model('UrlSeq',urlSequenceSchema);


module.exports.Url = UrlModel
module.exports.UrlSeq = urlSequenceModel