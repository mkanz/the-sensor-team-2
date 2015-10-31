var b = require('bonescript');
var port  = '/dev/i2c-2';		// Using bus 2
var gy521 = 0x40;
var ms    = 500;				// Repeat time in ms

b.i2cOpen(port, gy521);

b.i2cWriteBytes(port, 0xe7, [0]); // To Wake up the HTU21D

setInterval(readData, ms)

function readData() {
	// i2cReadBytes(port, command, length, [callback])
	b.i2cReadBytes(port, 0xe3, 4, displayData);
}

function displayData(x) {
	var data;
	if(x.event === 'return') {
		data = {
			temperature:  (((x.return[0]<<8 | x.return[1])<<16)>>16), // Raw temperature
			humidity:  ((((x.return[2]<<8 | x.return[3])<<16)>>16)) //Raw humidity
		};
	
		console.log(data);
	}
}
