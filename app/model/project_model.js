var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    url: { type: String, required: true },
    name: { type: String, required: true }
});

module.exports = mongoose.model('ProjectModel', ProjectSchema);