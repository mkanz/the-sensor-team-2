var private_key = 'aeZlnXBdjYUwN25ebw6ZF4dGVme';
var public_key = '1oqdgABLw1sAyEePWA80hzglVqb';

var request = require('request');
var util = require('util');
var http = require('http');
//var o = require('openurl');
var temperature_in_c = 11.4;

//var url = "http://14.139.34.32:8080/input/" + public_key + "?private_key=" + private_key + "&humidity=0&temp=" + temperature_in_c;
var url = "http://14.139.34.32:8080/input/1oqdgABLw1sAyEePWA80hzglVqb?private_key=aeZlnXBdjYUwN25ebw6ZF4dGVme&humidity=0&temp=7675";
request(url, function(error, response, body){
  console.log(body); 
});

temperature_in_c = '';

//var s = window.open(url);
//o.open(url);

/* http.get(url, function(res) {
  console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
*/

//util.print(url);
