/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


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