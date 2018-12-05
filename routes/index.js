var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VehicleDataSchema = new Schema({
_id: {
     $oid: String
},
vid: Number,
pids: [
  {
      pid: Number
  }
],
data: [
  {
      speed: Number,
      did: Number,
      _id: {
          $oid: String
      },
      date: {
          $date: Date
      }
  }],
__v: Number,
bitrate: Number,
mrDid: Number,
mrSpeed: Number
}, {collection: "vehicles"});

var VehicleData = mongoose.model('VehicleDAta', VehicleDataSchema);



/* GET home page. */
router.get('/', function(req, res, next) {
    
    mongoose.connect("mongodb://TeamFunTime:TFT2018@ds147073.mlab.com:47073/fleetdb", { useNewUrlParser: true }, () => {
      //console.log("CONNECTED!!!");

      VehicleData.find({},  function (err, vehicle) {
        if (err) return err;

        //console.log(vehicle);
        res.render('home', { title: 'Vehicle With Data', condition: true, dataArr: vehicle });
        
      });


      
    });
});
/* GET Vehicle Page. */ 
router.get('/index/:vid', function(req, res, next) {
    
  mongoose.connect("mongodb://TeamFunTime:TFT2018@ds147073.mlab.com:47073/fleetdb", { useNewUrlParser: true }, () => {
    //console.log("CONNECTED!!!");

    let vid = req.params.vid;
 
    VehicleData.findOne({'vid' : vid}, 'data.speed data.did data._id data.date', function (err, vehicle) {
      if (err) return err;

      

      res.render('index', { title: 'Vehicle With Data', condition: true, dataArr: [vehicle.data.pop()], car:req.params.vid });
      
    });

    
  });
});

/* GET data Page. */ 
router.get('/index/:vid/prevData', function(req, res, next) {
    
  mongoose.connect("mongodb://TeamFunTime:TFT2018@ds147073.mlab.com:47073/fleetdb", { useNewUrlParser: true }, () => {
    //console.log("CONNECTED!!!");

    let vid = req.params.vid;
 
    VehicleData.findOne({'vid' : vid}, 'data.speed data.did data._id data.date', function (err, vehicle) {
      if (err) return err;

      res.render('data', { title: 'Vehicle With Data', condition: true, dataArr: vehicle.data, car:req.params.vid });
      
    });

    
  });
});


module.exports = router;
