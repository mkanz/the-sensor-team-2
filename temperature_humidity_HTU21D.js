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

var b = require('bonescript');
var port  = '/dev/i2c-2';		// Using bus 2
var htu21d = 0x40;
var ms    = 1000;				// Repeat time in ms

b.i2cOpen(port, htu21d);

b.i2cWriteBytes(port, 0xE7, [0]); // Turn on the HTU21D

setInterval(readData, ms);

function readData() {
	// i2cReadBytes(port, command, length, [callback])
	
	b.i2cReadBytes(port, 0xE3, 2, displayTemp);			//Read Temperature
	b.i2cReadBytes(port, 0xE3, 2, displayHumid);		//Read Humidity
}

function displayTemp(x) {
	if(x.event === 'return') {
		var raw_temperature = (((x.return[0]<<8 | x.return[1])<<16)>>16); // Raw temperature
		
		//Converting to temperature in degree Celcius
		var tempSigTemp = raw_temperature / 65536; //2^16 = 65536
  		var temperature_in_c = (-46.85 + (175.72 * tempSigTemp)).toFixed(2); //From documentation in Sparkfun website
		console.log('temp in C: '+ temperature_in_c);
	}
}

function displayHumid(x) {
	if(x.event === 'return') {
		var raw_humidity = ((((x.return[0]<<8 | x.return[1])<<16)>>16)) //Raw humidity
	
		//Convert to relative humidity percent
		var tempSigRH = raw_humidity / 65536; //2^16 = 65536
  		var rel_humidity_percent = (-6 + (125 * tempSigRH)).toFixed(2); ////From documentation in Sparkfun website
  		console.log('Rel humidity: ' + rel_humidity_percent + ' %\n');
	}
}