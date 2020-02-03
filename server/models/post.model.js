const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let PostSchema = new mongoose.Schema({
    content: {type: String},
    title: {type: String},
    subtitle: {type: String},
    creator: { type: String},
    createdBy: {type: mongoose.Schema.Types.ObjectId},
    createdAt: {type: Date},
})


exports.Post = mongoose.model('Post', PostSchema);
