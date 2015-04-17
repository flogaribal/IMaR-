#include "ezxml/ezxml.h"
#include <string.h>


int main(){

	ezxml_t f1 = ezxml_parse_file("config.xml"), device;
	const char *deviceId;
	const char *user_name;
	const char *password;
	
	for (device = ezxml_child(f1, "device"); device; device = device->next) {
	    deviceId = ezxml_attr(device, "id");
	    user_name = ezxml_attr(device, "username");
	    password = ezxml_attr(device, "password");
	}


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

    printf("identifiant : %s\n",deviceId);   
    printf("username : %s\n",user_name);
    printf("pwd : %s\n", password);
	ezxml_free(f1); 
}

