#include "ezxml/ezxml.h"
#include <string.h>

#define CONFIG_FILE_PATH "config.xml"

/**
** Struct to store information about devices
**
**/
typedef  struct Devices {
	char* id;			// Device id
	char* user_name;	// Device user_name to connect to API
	char* password;		// Device password ti connect to API
}Device ;

/**
** Function use to read config from the config file (config.xml)
**/
Device getConfig();