#include "XMLReader.h"
#include "POSTRequest.h"

#define API_URL "http://requestb.in/o3r7poo3"

int main(){

	Device device = getConfig();

	char *id = device.id;
	char *user_name = device.user_name;
	char *password = device.password;

	char *args = malloc(strlen("id=")+strlen(id)+strlen("&username=")+strlen(user_name)+strlen("&password=")+strlen(password)+1);
	strcat(args,"id=");
	strcat(args,id);
	strcat(args,"&username=");
	strcat(args,user_name);
	strcat(args,"&password=");
	strcat(args,password);

	char *response = NULL  ;

	///////// ERRRRROR SEGMENTATION FAULT
//	response = do_web_request(API_URL,args);

//	printf("response : \n%s", response);

}