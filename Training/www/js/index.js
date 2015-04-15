// The watch id references the current `watchAcceleration`
var watchID = null;

// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);
        
// device APIs are available
//
function onDeviceReady() {
    alert('deviceReady');
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
	
	saveGeo();
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}


// ______ FILE _________
var FILENAME = 'TestLog.txt';

$ = function (id) {
	return document.getElementById(id);
};

failCB = function (msg) {
	return function () {
		alert('[FAIL] ' + msg);
	}
};

file = {writer: { available: false }, reader: { available: false }};


document.addEventListener('deviceready', function () {
	var fail = failCB('requestFileSystem');
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}, false);

function gotFS(fs) {
	var fail = failCB('getFile');
	fs.root.getFile(FILENAME, {create: true, exclusive: false}, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
	var fail = failCB('createWriter');
	file.entry = fileEntry;
	fileEntry.createWriter(gotFileWriter, fail);
}


function gotFileWriter(fileWriter) {
	file.writer.available = true;
	file.writer.object = fileWriter;
}

function saveGeo() {
	var LogEntries = [];
	LogEntries.push(
		document.getElementById('latitude').textContent = 'Latitute : ' + position.coords.latitude + '\n'
		document.getElementById('longitude').textContent = 'Longitude : ' + position.coords.longitude + '\n'
		document.getElementById('altitude').textContent = 'Altitude: ' + position.coords.altitude + '\n');

	if (file.writer.available) {
		file.writer.available = false;
		file.writer.object.onwriteend = function (evt) {
			file.writer.available = true;
			file.writer.object.seek(0);
		}
		file.writer.object.write(LogEntries.join("\n"));
	}

	return false;
}

