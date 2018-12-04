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
      console.log("CONNECTED!!!");
      // VehicleData.find(function (err, cars) {
      //   if (err) return console.error(err);
      //   //console.log(cars);
      // });

      let i = 0;

      VehicleData.findOne({'vid' : 5}, 'data.speed data.did data._id data.date', function (err, vehicle) {
        if (err) return err;


        

        console.log(vehicle.data);
        res.render('index', { title: 'Cars List', condition: true, dataArr: vehicle.data });
        
      });

      
    });
});


module.exports = router;
