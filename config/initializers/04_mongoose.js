module.exports = function() {
    this.mongoose = require('mongoose');
    this.mongoose.connect('mongodb://localhost/hackaton-server');
}