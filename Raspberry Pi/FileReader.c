#include <stdio.h>
#include <stdlib.h>


int main (int argc, char *argv[]) {
 char   *buffer;        /* holds the file contents. */
 size_t  i;             /* indexing into buffer. */
 size_t  buffer_size;   /* size of the buffer. */
 char   *temp;          /* for realloc(). */
 char    c;             /* for reading from the input. */
 FILE   *input;         /* our input stream. */


 if (argc == 1) {
      fprintf(stderr, "Needs a filename argument.\n");
      exit(EXIT_FAILURE);
 }
 else if (argc > 2) {
      fprintf(stderr, "Well, you passed in a few filenames, but I'm only using %s\n", argv[1]);
 }

 if ((input = fopen(argv[1], "r")) == NULL) {
      fprintf(stderr, "Error opening input file %s\n", argv[1]);
      exit(EXIT_FAILURE);
 }

 /* Initial allocation of buffer */
 i = 0;
 buffer_size = BUFSIZ;
 if ((buffer = malloc(buffer_size)) == NULL) {
      fprintf(stderr, "Error allocating memory (before reading file).\n");
      fclose(input);
 }

 while ((c = fgetc(input)) != EOF) {
      /* Enlarge buffer if necessary. */
      if (i == buffer_size) {
	   buffer_size += BUFSIZ;
	   if ((temp = realloc(buffer, buffer_size)) == NULL) {
		fprintf(stderr, "Ran out of core while reading file.\n");
		fclose(input);
		free(buffer);
		exit(EXIT_FAILURE);
	   }
	   buffer = temp;
      }

      /* Add input char to the buffer. */
      buffer[i++] = c;
 }

 /* Test if loop terminated from error. */
 if (ferror(input)) {
      fprintf(stderr, "There was a file input error.\n");
      free(buffer);
      fclose(input);
      exit(EXIT_FAILURE);
 }

 /* Make the buffer a bona-fide string. */
 if (i == buffer_size) {
      buffer_size += 1;
      if ((temp = realloc(buffer, buffer_size)) == NULL) {
	   fprintf(stderr, "Ran out of core (and only needed one more byte too ;_;).\n");
	   fclose(input);
	   free(buffer);
	   exit(EXIT_FAILURE);
      }
      buffer = temp;
 }
 buffer[i] = '\0';

 puts(buffer);

 /* Clean up. */
 free(buffer);
 fclose(input);

 return 0;
}