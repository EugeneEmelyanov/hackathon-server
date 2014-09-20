var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var Download = require('download');
var plato = require('plato');
var glob = require("glob");
var mkdirp = require('mkdirp');
var ProjectModel = require('../model/project_model');

var PROJECT_SOURCES = "/../public/sources";
var PROJECT_REPORTS = "/";

var PagesController = new Controller();

PagesController.runTest = function() {
    var self = this;
    var id = this.param("id");
    ProjectModel.findOne({_id:id}).exec(function(err, item) {
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

                        // null options for this example
                        var options = {
                            title: 'Your title here'
                        };

                        var callback = function (report){
                            // once done the analysis,
                            // execute this
                            var res = {};
                            res._id = item._id;
                            res.name = item.name;
                            res.url = item.url;
                            res.reportUrl = self.__req.protocol + '://' + self.__req.get('host') + "/" + item._id + "/";
                            self.__res.send(res);
                        };

                        plato.inspect(files, outputDir, {}, callback);
                    }
                });
            });
        });

    });

};

PagesController.getProjectInfo = function() {
    var id = this.param("id"),
        self = this;
    ProjectModel.findOne({_id: id}).exec(function(err, item) {
        var res = {};
        res._id = item._id;
        res.name = item.name;
        res.url = item.url;
        res.reportUrl = "/" + item._id + "/";
        self.__res.send(res);
    });
};

PagesController.create = function() {
    console.log(this.__req.body);
    var url = this.__req.body.url,
        name = this.__req.body.name;
    var self = this;

    ProjectModel.create({name:name, url:url}, function(err, item) {
        self.__res.send({success:true,
                         item: item});
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
                var i = {};
                i._id = item._id;
                i.name = item.name;
                i.url = item.url;
                i.reportUrl = self.__req.protocol + '://' + self.__req.get('host') + "/" + item._id + "/";
                return i
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

PagesController.__noCache = function(res) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
}


module.exports = PagesController;
