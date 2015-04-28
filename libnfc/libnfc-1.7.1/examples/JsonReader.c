#define CONFIG_FILE_PATH "config.json"
#define SERVER_RESPONSE_FILE_PATH "server.json"

#include "JsonReader.h"
//#define DEBUG

/**
** Function use to read config from the config file (config.json)
**/
Device getConfig(){

	// init a device
	Device device;
	
	// init three json_object
  	json_object *root, *username, *password;

	#ifdef DEBUG
	  	MC_SET_DEBUG(1);
	#endif

	// parse the file and get the root node
    root = json_object_from_file(CONFIG_FILE_PATH);  
	// get the username field
	username = json_object_object_get(root,"username");
	// get the password field
 	password = json_object_object_get(root,"password");

	// fill in the device fields
	device.username = strdup(json_object_get_string(username));
	device.password = strdup(json_object_get_string(password));

	return device;
}

/**
** Function use to read response from the server
**/
ServerResponse getResponse(){
	// init a ServerResponse
	ServerResponse serverResponse ; 

	// init four json_object
  	json_object *root, *msg, *error, *status;

	#ifdef DEBUG
	  	MC_SET_DEBUG(1);
	#endif

	// parse the file and get the root node
    root = json_object_from_file(SERVER_RESPONSE_FILE_PATH);
	// get the msg field  
	msg = json_object_object_get(root,"msg");
	// get the error field
 	error = json_object_object_get(root,"error");
	// get the status field
	status = json_object_object_get(root,"status");

	// fill in the serverResponse fields
	serverResponse.msg = strdup(json_object_get_string(msg));
	serverResponse.error = strdup(json_object_get_string(error));
	serverResponse.status = strdup(json_object_get_string(status));
	
	return serverResponse;
}



/*

int main(){
	Device d = getConfig();
	printf("usn : %s\n",d.username);
	printf("pwd : %s\n",d.password);
	
	ServerResponse s = getResponse();
	printf("msg : %s\n",s.msg);
	printf("error : %s\n",s.error);
	printf("status : %s\n",s.status);
}*/

