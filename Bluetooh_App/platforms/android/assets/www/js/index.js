

document.addEventListener('deviceready', onDeviceReady, onError);

function onDeviceReady() {
    alert('deviceReady');
	bluetoothSerial.enable();
}


//_____BlueTooth_____
function reshButt() {
	alert('reshButt');
	bluetoothSerial.discoverUnpaired(function(devices) {
		devices.forEach(
			function(device) {
			console.log(device.id);
			}
		)
	}, failure);
}


function onError() {
    alert('Error while looking for BlueTooth devices');
}