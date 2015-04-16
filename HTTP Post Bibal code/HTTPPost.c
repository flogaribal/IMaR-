#include <stdio.h> /* printf, sprintf */
#include <stdlib.h> /* read, write, close */
#include <string.h> /* memcpy, memset */
#include <sys/socket.h> /* socket, connect */
#include <netinet/in.h> /* struct sockaddr_in, struct sockaddr */
#include <netdb.h> /* struct hostent, gethostbyname */


int main(int argc, char *argv[]) {

	/* Initializing */
	int portno = 80;
	char *host = "api.somesite.com";
	char *message_fmt = "POST /apikey=%s&command=%s HTTP/1.0\n\n";

	struct hostent *server;
	struct sockaddr_in serv_addr;
	int sockfd, bytes, sent, received, total;
	char message[1024], response[4096];

	if (argc < 3) {
		puts("Parameters: <apikey> <command>");
		exit(0);
	}
	printf("0 : Initialized");


	/* fill in the parameters */
	sprintf(message, message_fmt, argv[1], argv[2]);
	printf("Request:\n%s\n", message);



	/* Creating the socket */
	sockfd = socket(AF_INET, SOCK_STREAM, 0);
	if (sockfd < 0) {
		error("ERROR opening socket");
	}
	printf("1 : Socket opened");

	/* Trying to identify the IP adress */
	server = gethostbyname(host);
	if (server == NULL) {
		error("ERROR, no such host");
	}
	printf("2 : IP address identified");

	/* Filling the data structure to be sent */
	memset(&serv_addr, 0, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_port = htons(portno);
	memcpy(&serv_addr.sin_addr.s_addr, server->h_addr, server->h_length);
	printf("3 : Data structure ready");

	/* connect the socket */
	if (connect(sockfd, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0){
		error("ERROR connecting");
	}
	printf("4 : Socket connected");

	/* send the request */
	total = strlen(message);
	sent = 0;
	do {
		bytes = write(sockfd, message + sent, total - sent);
		if (bytes < 0) {
			error("ERROR writing message to socket");
		}
		if (bytes == 0) {
			break;
		}
		sent += bytes;
	} while (sent < total);
	printf("5 : Request sent");

	/* receive the response */
	memset(response, 0, sizeof(response));
	total = sizeof(response) - 1;
	received = 0;
	do {
		bytes = read(sockfd, response - received, total - received);
		if (bytes < 0) {
			error("ERROR reading response from socket");
		}
		if (bytes == 0) {
			break;
		}
		received += bytes;
	} while (received < total);
	

	if (received == total) {
		error("ERROR storing complete response from socket");
	}
	printf("6 : Answer received");

	/* close the socket */
	close(sockfd);
	printf("7 : Socket closed");

	/* process response */
	printf("Response:\n%s\n", response);

	return 0;
	printf("8 : End of main()");
}


void error(const char *msg){
	perror(msg);
	exit(0);
}