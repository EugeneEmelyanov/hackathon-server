module.exports = function() {
    this.mongoose = require('mongoose');
    this.mongoose.connect(getConnectionString());
}

function getConnectionString() {
    // default to a 'localhost' configuration:
    var connection_string = '127.0.0.1:27017/eugeneandrew';
// if OPENSHIFT env variables are present, use the available connection info:
    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
        connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    return connection_string;
}