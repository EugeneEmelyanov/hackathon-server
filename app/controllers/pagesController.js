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
        mkdirp("/../public/" + item.name + "/sources", function(err) {
            var download = new Download({ extract: true, strip: 1 })
                .get(url, "./public/" + item.name + "/sources");

            download.run(function(err, files, stream) {
                console.log(files);
                if (err) {
                    throw err;
                }

                // options is optional
                glob("./public/" + item.name + "/sources" + "/**/*.js", null, function (er, files) {
                    var outputDir = './public/' + item.name;
                    // null options for this example
                    var options = {
                        title: 'Your title here'
                    };

                    var callback = function (report){
                        // once done the analysis,
                        // execute this
                        console.log(report);
                        self.render('./../../public/' + item.name + "/index");
                    };

                    plato.inspect(files, outputDir, {}, callback);
                });

                console.log('File downloaded successfully!');
            });
        });

    });

};

PagesController.create = function() {
    var url = this.body.url,
        name = this.body.name;
    var self = this;

    ProjectModel.create({name:name, url:url}, function(err) {
        self.__res.send({success:err});
    });
};

PagesController.list = function() {
    var page = this.param('page');
    var self = this;
    page = page || 0;
    console.log(page);
    ProjectModel.find({})
        .skip((page-1)*20)
        .limit(20)
        .exec(function(err, items) {
            self.__res.send(items);
        })
};

PagesController.delete = function() {
    var id = this.param("id");
    var self = this;
    ProjectModel.findOne({_id: id}).remove(function(err) {
        self.__res.send({err:err});
    });
}



module.exports = PagesController;
