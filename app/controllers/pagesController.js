var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var ProjectModel = require('../model/project_model');
var util = require('../model/utils');

var PagesController = new Controller();

PagesController.main = function() {
    this.render('index');
};

PagesController.runTest = function() {
    var self = this;
    var id = this.param("id");
    utils.__performTest(id, function(report) {
        ProjectModel.findOne({_id:id}).exec(function(err, item) {
            item = item.toObject();
            item.reportUrl = self.__req.protocol + '://' + self.__req.get('host') + "/" + item._id + "/";
            self.__res.send(item);
        });
    });
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

    ProjectModel.create({name:name, url:url, modificationDate: new Date(), creationDate: new Date()}, function(err, item) {
        item = item.toObject();
        item.reportUrl = self.__req.protocol + '://' + self.__req.get('host') + "/" + item._id + "/";
        self.__res.send({success:true,
                         item: item});
        utils.__performTest(item._id, function(report){
            //todo:do something here
        });
    });
};

PagesController.list = function() {
    var page = this.param('page');
    var self = this;
    page = page || 1;

    utils.__noCache(self.__res);
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




module.exports = PagesController;
