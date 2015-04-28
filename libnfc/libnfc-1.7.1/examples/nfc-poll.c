/*-
 * Free/Libre Near Field Communication (NFC) library
 *
 * Libnfc historical contributors:
 * Copyright (C) 2009      Roel Verdult
 * Copyright (C) 2009-2013 Romuald Conty
 * Copyright (C) 2010-2012 Romain Tartière
 * Copyright (C) 2010-2013 Philippe Teuwen
 * Copyright (C) 2012-2013 Ludovic Rousseau
 * See AUTHORS file for a more comprehensive list of contributors.
 * Additional contributors of this file:
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *  1) Redistributions of source code must retain the above copyright notice,
 *  this list of conditions and the following disclaimer.
 *  2 )Redistributions in binary form must reproduce the above copyright
 *  notice, this list of conditions and the following disclaimer in the
 *  documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * Note that this license only applies on the examples, NFC library itself is under LGPL
 *
 */

/**
 * @file nfc-poll.c
 * @brief Polling example
 */

#ifdef HAVE_CONFIG_H
#  include "config.h"
#endif // HAVE_CONFIG_H

#include <err.h>
#include <inttypes.h>
#include <signal.h>
#include <stdio.h>
#include <stddef.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include <nfc/nfc.h>
#include <nfc/nfc-types.h>

#include "../utils/nfc-utils.h"
#include "JsonReader.h"
#include "POSTRequest.h"

#define API_URL "http://hr-clocker.azurewebsites.net/api/checkin"
#define MAX_DEVICE_COUNT 16
//#define DEBUG

static nfc_device *pnd = NULL;
static nfc_context *context;


static void print_usage(const char *progname){
  printf("usage: %s [-v]\n", progname);
  printf("  -v\t verbose display\n");
}



int main(int argc, const char *argv[]){


	//get the config of the NFC card reader
	Device device = getConfig();

	char *user_name = device.username;
	char *password = device.password;
	//char *user_name = "reader1";
	//char *password = "toor";

	// Create string which follows the pattern "user:password"
	char *username_pwd = malloc((strlen(user_name)+strlen(password)+2)*sizeof(char));
    strcpy(username_pwd,user_name);
	strcat(username_pwd,":");
	strcat(username_pwd,password);
  	bool verbose = false;

  	

  	// Display libnfc version
 	const char *acLibnfcVersion = nfc_version();

  	printf("%s uses libnfc %s\n", argv[0], acLibnfcVersion);
  	if (argc != 1) {
		if ((argc == 2) && (0 == strcmp("-v", argv[1]))) {
	  	verbose = true;
		} else {
	  	print_usage(argv[0]);
	  	exit(EXIT_FAILURE);
		}
  	}

  	const int uiPollNr = 5000000;
  	const uint8_t uiPeriod = 2;
  	const nfc_modulation nmModulations[5] = {
    	{ .nmt = NMT_ISO14443A, .nbr = NBR_106 },
    	{ .nmt = NMT_ISO14443B, .nbr = NBR_106 },
    	{ .nmt = NMT_FELICA, .nbr = NBR_212 },
    	{ .nmt = NMT_FELICA, .nbr = NBR_424 },
    	{ .nmt = NMT_JEWEL, .nbr = NBR_106 },
 	};
  	const size_t szModulations = 5;

  	nfc_target nt;
  	int res = 0;

	// init context
  	nfc_init(&context);
  	if (context == NULL) {
    	ERR("Unable to init libnfc (malloc)");
    	exit(EXIT_FAILURE);
  	}

  	pnd = nfc_open(context, NULL);
  	if (pnd == NULL) {
    	ERR("%s", "Unable to open NFC device.");
    	nfc_exit(context);
    	exit(EXIT_FAILURE);
  	}

  	if (nfc_initiator_init(pnd) < 0) {
    	nfc_perror(pnd, "nfc_initiator_init");
    	nfc_close(pnd);
    	nfc_exit(context);
    	exit(EXIT_FAILURE);
  	}
	#ifdef DEBUG
	  	printf("NFC reader: %s opened\n", nfc_device_get_name(pnd));
	  	printf("NFC device will poll during %ld s (%u pollings of %lu ms for %" PRIdPTR " modulations)\n", (unsigned long) (uiPollNr * 	szModulations * uiPeriod * 150)/1000, uiPollNr, (unsigned long) uiPeriod * 150, szModulations);
	#endif

	while(true){
		res = nfc_initiator_poll_target(pnd, nmModulations, szModulations, uiPollNr, uiPeriod, &nt);
	  	if (res  < 0) {
			nfc_perror(pnd, "nfc_initiator_poll_target");
			nfc_close(pnd);
			nfc_exit(context);
			exit(EXIT_FAILURE);
	  	}

	  	if (res > 0) {
			printf("Card read");
			system("gpio -g mode 23 out");
			system("gpio -g mode 18 out");
			system("gpio -g write 23 1");			
			 
			int i=0;

			// Put the card Id into a variable as a string

				#ifdef DEBUG
					printf("\n\n");
					printf("NAI abtUID : ");
				#endif
				char cardId[10] = "";
				for(i=0;i<10;i++){
					#ifdef DEBUG	
						printf("%X  ",nt.nti.nai.abtUid[i]);
					#endif
					sprintf(cardId,"%s%X",cardId,nt.nti.nai.abtUid[i]);	 
				
				}
				printf("\n\n");
			

				// standart output of nfc-poll
				//print_nfc_target(&nt, verbose);
			

			// Building string which contains POST Request args
			char *args = malloc((strlen("payload={\"cardID\" => \"")+strlen(cardId)+strlen("\"}")+strlen("&type=1")+1)*sizeof(char));
	

			strcpy(args,"payload={\"cardID\" => \"");
			strcat(args,cardId); 
			strcat(args,"\"}");
			strcat(args,"&type=1");

			char *response ;
			#ifdef DEBUG
				printf("URL : %s\n", API_URL);
				printf("ARGUMENTS T : %s\n\n", args);
			#endif
		 
			// Do the web reauest and get/display the response
			response = do_web_request(API_URL,args,username_pwd);
			free(args);

			FILE *fileResponse = fopen("./server.json","w");
			fprintf(fileResponse,"%s",response);
			fclose(fileResponse);

			#ifdef DEBUG		
				printf("response : \n%s\n", response);
			#endif 

			ServerResponse server = getResponse();

			if(strcmp(server.msg,"Success") != 0 || strcmp(server.error,"false") != 0 || strcmp(server.status,"200") != 0){
				system("gpio -g write 23 0");
				sleep(1);
				system("gpio -g write 23 1");
				sleep(1);
				system("gpio -g write 23 0");

			}else{
				system("gpio -g write 18 1");
				system("gpio -g write 23 0");
				sleep(2);
				system("gpio -g write 18 0");
			}			
	  	} else {
			printf("No target found.\n");
	  	}

	  	//printf("Waiting for card removing...");
	  	//while (0 == nfc_initiator_target_is_present(pnd, NULL)) {}
	  	//nfc_perror(pnd, "nfc_initiator_target_is_present");
	  	printf("done.\n\n");
	}

  	nfc_close(pnd);
  	nfc_exit(context);
  	exit(EXIT_SUCCESS);
}
