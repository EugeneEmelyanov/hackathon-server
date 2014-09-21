var Download = require('download');
var plato = require('plato');
var glob = require("glob");
var mkdirp = require('mkdirp');
var ProjectModel = require('project_model');

var utils = {};

utils.__noCache = function(res) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
};

utils.__performTest = function(id, callback) {
    var self = this;
    ProjectModel.findOne({_id:id}).exec(function(err, item) {
        var contextItem = item;
        item = item.toObject();
        var url = item.url;
        mkdirp("/../public/" + item._id + "/sources", function(err) {
            var download = new Download({ extract: true, strip: 1 })
                .get(url, "./public/" + item._id + "/sources");

            download.run(function(err, files, stream) {
                console.log(files);
                if (err) {
                    throw err;
                }

                // options is optional
                glob("./public/" + item._id + "/sources" + "/**/*.js", null, function (er, files) {
                    if (files && files.length == 0) {
                        self.__res.status(404)
                            .send({success:false, error: "No js files!"});

                    } else {
                        var outputDir = './public/' + item._id;
                        var options;
                        plato.inspect(files, outputDir, {}, function(report) {
                            contextItem.modificationDate = new Date();
                            contextItem.save(function(err) {
                                if(err) {
                                    console.log('Cannot update item with id=' + item._id);
                                }
                            });
                            callback.apply(self);
                        });
                    }
                });
            });
        });

    });
}

module.exports = utils;

