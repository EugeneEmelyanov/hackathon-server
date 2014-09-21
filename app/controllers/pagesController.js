var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var Download = require('download');
var plato = require('plato');
var glob = require("glob");
var mkdirp = require('mkdirp');
var ProjectModel = require('../model/project_model');

var PagesController = new Controller();

PagesController.main = function() {
    this.render('index');
}

PagesController.runTest = function() {
    var self = this;
    var id = this.param("id");
    self.__performTest(id, function(report) {
        ProjectModel.findOne({_id:id}).exec(function(err, item) {
            item = item.toObject();
            item.reportUrl = self.__req.protocol + '://' + self.__req.get('host') + "/" + item._id + "/";
            self.__res.send(item);
        });
    })
};

PagesController.getProjectInfo = function() {
    var id = this.param("id"),
        self = this;
    ProjectModel.findOne({_id: id}).exec(function(err, item) {
        item = item.toObject();
        item.reportUrl = "/" + item._id + "/";
        self.__res.send(item);
    });
};

PagesController.create = function() {
    console.log(this.__req.body);
    var url = this.__req.body.url,
        name = this.__req.body.name;
    var self = this;

    ProjectModel.create({name:name, url:url, modificationDate: new Date()}, function(err, item) {
        item = item.toObject();
        item.reportUrl = self.__req.protocol + '://' + self.__req.get('host') + "/" + item._id + "/";
        self.__res.send({success:true,
                         item: item});
        self.__performTest(item._id, function(report){
            //todo:do something here
        });
    });
};

PagesController.list = function() {
    var page = this.param('page');
    var self = this;
    page = page || 1;

    this.__noCache(self.__res);
    ProjectModel.find({})
        .skip((page-1)*20)
        .limit(20)
        .exec(function(err, items) {
            var res = items.map(function(item) {
                item = item.toObject();
                item.reportUrl = self.__req.protocol + '://' + self.__req.get('host') + "/" + item._id + "/";
                return item;
            })
            self.__res.send(res);
        })
};

PagesController.delete = function() {
    var id = this.param("id");
    var self = this;
    ProjectModel.findOne({_id: id}).remove(function(err) {
        self.__res.send({err:err});
    });
};

PagesController.__performTest = function(id, callback) {
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
                            item.modificationDate = new Date();
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

PagesController.__noCache = function(res) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
}


module.exports = PagesController;
