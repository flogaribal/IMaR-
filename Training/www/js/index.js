// The watch id references the current `watchAcceleration`
var watchID = null;

// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);
        
// device APIs are available
//
function onDeviceReady() {
    alert('deviceReady');
    startWatch();
}

// ____________________ ACCELEROMETER _____________
function getAcceleration() {
    navigator.accelerometer.getCurrentAcceleration(onSuccessAccel, onError);
    alert('gettint Accel');
}

// Start watching the acceleration
//
function startWatch() {
    // Update acceleration every second     
    var options = { frequency: 1000 };
    watchID = navigator.accelerometer.watchAcceleration(onSuccessAccel, onError, options);
    alert('starting watch');
}

// Stop watching the acceleration
//
function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        alert('stopping watch');
        watchID = null;
    }
}

// onSuccess: Get a snapshot of the current acceleration
//
function onSuccessAccel(acceleration) {
    alert('X : ' + acceleration.x + 'Y : ' + acceleration.y + 'Z : ' + acceleration.z );
    document.getElementById('accelX').textContent = 'Acceleration X: ' + acceleration.x + '<br />';
    document.getElementById('accelY').textContent = 'Acceleration Y: ' + acceleration.y + '<br />';
    document.getElementById('accelZ').textContent = 'Acceleration Z: ' + acceleration.z + '<br />';
}



//________________ GPS __________________

function btn_getPosition(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
//
function onSuccess(position) {

/*    alert('Latitude: '           + position.coords.latitude              + '<br />' +
                        'Longitude: '          + position.coords.longitude             + '<br />' +
                        'Altitude: '           + position.coords.altitude              + '<br />' +
                        'Accuracy: '           + position.coords.accuracy              + '<br />' +
                        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                        'Heading: '            + position.coords.heading               + '<br />' +
                        'Speed: '              + position.coords.speed                 + '<br />' +
                        'Timestamp: '          + position.timestamp                    + '<br />');*/

    document.getElementById('latitude').textContent = 'Latitute : ' + position.coords.latitude ;
    document.getElementById('longitude').textContent = 'Longitude : ' + position.coords.longitude ;
    document.getElementById('altitude').textContent = 'Altitude: ' + position.coords.altitude ;
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
