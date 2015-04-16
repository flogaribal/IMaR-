

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    alert('deviceReady');
	bluetoothSerial.enable();
}


//_____BlueTooth_____
function reshButt() {
	bluetoothSerial.discoverUnpaired(
		function(devices) {
			var currentNode;
			devices.forEach(
				function(device){
					currentNode = document.createElement('div');
					currentNode.id = device.id;
					document.getElementById(device.id).innerHTML = '<div id="'+device.name+'" onclick="bluetoothSerial.connect('+device.address+', alert("Connecting to '+device.name+'"), alert("Impossible to connect to '+device.name+'"));">'+device.name+'</div></br>';
					document.getElementById("devices_list").appendChild(currentNode);
				}
			);
		}
	);
}

function onError() {
    alert('Error while looking for BlueTooth devices');
}