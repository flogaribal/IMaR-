#include "ezxml/ezxml.h"
#include <string.h>


typedef  struct Devices {
	char* id;
	char* user_name;
	char* password;
}Device ;

Device getConfig(){
	ezxml_t f1 = ezxml_parse_file("config.xml"), currDevice;
	Device device;

	currDevice = ezxml_child(f1, "device");

	device.id = strdup(ezxml_attr(currDevice, "id"));
    device.user_name = strdup(ezxml_attr(currDevice, "username"));
    device.password = strdup(ezxml_attr(currDevice, "password"));

	ezxml_free(f1); 

	return device;
}


int main(){

	Device device = getConfig();
	const char *deviceId = device.id;
	const char *user_name = device.user_name;
	const char *password = device.password;


//	printf("id : %s", device.id);
	if(strcmp(deviceId,"123456789")==0){
		printf("device id OK\n");
	}else{
		printf("device id NNNNOK\n");
	}

	if(strcmp(user_name,"Toto")==0){
		printf("user_name OK\n");
	}else{
		printf("user_name NNNNOK\n");
	}

	if(strcmp(password,"pwdtoto")==0){
		printf("pwd OK\n");
	}else{
		printf("pwd NNNNOK\n");
	}
}
