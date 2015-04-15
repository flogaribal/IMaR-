

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    alert('deviceReady');
	bluetoothSerial.enable();
}


//_____BlueTooth_____
function reshButt() {
	bluetoothSerial.discoverUnpaired(tabDevices(devices), function(){onError()});
}

function tabDevices(devices) {
	devices.forEach(rowDevice(device));
}

function rowDevice(device) {
	document.getElementById('devices_list').classList.add(device.id);
	document.getElementById(device.id).innerHTML = '<span onclick="bluetoothSerial.connect('+device.address+', alert("Connecting to '+device.name+'"), alert("Impossible to connect to '+device.name+'"));">'+device.name+'</span></br>';
}


function onError() {
    alert('Error while looking for BlueTooth devices');
}