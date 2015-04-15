// The watch id references the current `watchAcceleration`
var watchID = null;

// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);
        
// device APIs are available
//
function onDeviceReady() {
    alert('deviceReady');
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

// ____________________ ACCELEROMETER _____________
function getAcceleration() {
    navigator.accelerometer.getCurrentAcceleration(onSuccessAccel, onError);
}

// Start watching the acceleration
//
function startWatch() {
    // Update acceleration every second     
    var options = { frequency: 200 };
    watchID = navigator.accelerometer.watchAcceleration(onSuccessAccel, onError, options);
}

// Stop watching the acceleration
//
function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}

// onSuccess: Get a snapshot of the current acceleration
//
function onSuccessAccel(acceleration) {
    document.getElementById('accelX').innerHTML = 'Acceleration X : ' + acceleration.x;
    document.getElementById('accelY').innerHTML = 'Acceleration Y : ' + acceleration.y;
    document.getElementById('accelZ').innerHTML = 'Acceleration Z : ' + acceleration.z;
}



//________________ GPS __________________

function btn_getPosition(){
    alert('getting position');
    navigator.geolocation.getCurrentPosition(onSuccessGPS, onError);
}

// onSuccess Geolocation
//
function onSuccessGPS(position) {
    alert('Lat ' + position.coords.latitude);

    document.getElementById('latitude').textContent = 'Latitute : ' + position.coords.latitude ;
    document.getElementById('longitude').textContent = 'Longitude : ' + position.coords.longitude ;
    document.getElementById('altitude').textContent = 'Altitude: ' + position.coords.altitude ;
	
	gotFileWriter(writer);
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}


// ______ FILE _________
function gotFS(fileSystem) {
	fileSystem.root.getFile("TestingLog.txt", {create: true, exclusive: false}, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
	fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
	writer.seek(writer.length);
	writer.write(document.getElementById('latitude').textContent);
	
	writer.seek(writer.length);
	writer.write(document.getElementById('longitude').textContent);
	
	writer.seek(writer.length);
	writer.write(document.getElementById('altitude').textContent);
}

function fail(error) {
	console.log(error.code);
}