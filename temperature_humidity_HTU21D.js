/* Get Temperature and humidity values from the Sparkfun
 * HTU21D sensor. Connections are shown in the 'HTU21D_connections.png'
 * fritzing diagram. 
 *
 * Tested on the Beaglebone Black.
 *
 * 05 Nov 2015
 * 
 * Original version:
 * 		Kansul Mahrifa
 *
 * Edits:
 *		Ahmed Karanath
 *		Thejas Babu
 */
var request = require('request');
var b = require('bonescript');
var port  = '/dev/i2c-2';		// Using bus 2
var htu21d = 0x40;
var ms    = 1000;				// Repeat time in ms
var private_key = 'bp0GzAYQrzh8ajbVR8qxH30LVvl';
var public_key = 'Blo68JXPW8HMgpVELMWzHbYaj0v';
var rel_humidity_percent = 0;
var temperature_in_c = 0;

b.i2cOpen(port, htu21d);

b.i2cWriteBytes(port, 0xE7, [0]); // Turn on the HTU21D

setTimeout(readData, ms);

function readData() {
	// i2cReadBytes(port, command, length, [callback])
	setTimeout(readTemp,ms);
	setTimeout(readHumid,ms);
	setTimeout(postData, ms);
}

function readTemp(){
	b.i2cReadBytes(port, 0xE3, 2, displayTemp);			//Read Temperature
}

function readHumid(){
	b.i2cReadBytes(port, 0xE3, 2, displayHumid);		//Read Humidity
}

function displayTemp(x) {
	if(x.event === 'return') {
		var raw_temperature = (((x.return[0]<<8 | x.return[1])<<16)>>16); // Raw temperature
		
		//Converting to temperature in degree Celcius
		var tempSigTemp = raw_temperature / 65536; //2^16 = 65536
  		temperature_in_c = (-46.85 + (175.72 * tempSigTemp)).toFixed(2); //From documentation in Sparkfun website
		console.log('temp in C: '+ temperature_in_c);
	}
	else if(x.err) console.log('temp in C = ' + x.err);
}

function displayHumid(x) {
	if(x.event === 'return') {
		var raw_humidity = ((((x.return[0]<<8 | x.return[1])<<16)>>16)) //Raw humidity
		//Convert to relative humidity percent
		var tempSigRH = raw_humidity / 65536; //2^16 = 65536
  		rel_humidity_percent = (-9 + (125 * tempSigRH)).toFixed(2); ////From documentation in Sparkfun website
  		console.log('Rel humidity: ' + rel_humidity_percent + ' %\n');
	}
	else if(x.err) console.log('Rel humidity: ' + x.err);
}

function postData(){
	var url = 'http://14.139.34.32:8080/input/' + public_key + '?private_key=' +  private_key + '&humidity=' + rel_humidity_percent + '&temp=' + temperature_in_c;
		request(url, function(error, response, body){
			console.log("Message from phant server: "+ body);
		});
	temperature_in_c = '';
	rel_humidity_percent = '';
	
	setTimeout(readData, ms);
}