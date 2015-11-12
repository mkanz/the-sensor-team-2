/* Get CO concentration from the Sparkfun MQ7 sensor.
 * Sensor is yet to be calibrated, so we get only raw
 * values for now.
 * 
 * Connection diagrams will be uploaded soon.
 *
 * Tested on the Beaglebone Black.
 *
 * 05 Nov 2015
 * 
 * Original version:
 * 		Ahmed Karanath
 *
 * Tests:
 *		Kansul Mahrifa
 */

var b = require('bonescript');

setInterval(readData, 1000);

function readData(){
b.analogRead('P9_36', printStatus);
}

function printStatus(x) {
    console.log('raw_CO_value = ' + x.value.toFixed(4));    //Print the raw CO value; needs calibration
   
    if (x.err) console.log('x.err = ' + x.err);
}