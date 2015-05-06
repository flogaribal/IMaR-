#include "XMLReader.h"
#include "POSTRequest.h"

#define API_URL "http://requestb.in/1l8yrm41"

int main(){

	Device device = getConfig();

	char *id = device.id;
	char *user_name = device.user_name;
	char *password = device.password;

	char *args = malloc((strlen("id=")+strlen(id)+strlen("&username=")+strlen(user_name)+strlen("&password=")+strlen(password)+1)*sizeof(char));
	printf("Args %s\n", args);
	strcpy(args,"id=");
	strcat(args,id);
	strcat(args,"&username=");
	strcat(args,user_name);
	strcat(args,"&password=");
	strcat(args,password);

	printf("URL : %s\n", API_URL);
	printf("ARGUMENTS : %s\n", args);

	char *response ;

	///////// ERRRRROR SEGMENTATION FAULT
	response = do_web_request(API_URL,args);

	printf("response : \n%s", response);

}