s/^\(xmllint\)_OBJECTS =.*$/& \1-rc.o/
s/^\(xmlcatalog\)_OBJECTS =.*$/& \1-rc.o/
s/^\(testSAX\)_OBJECTS =.*$/& \1-rc.o/
s/^\(testHTML\)_OBJECTS =.*$/& \1-rc.o/
s/^\(testXPath\)_OBJECTS =.*$/& \1-rc.o/
s/^\(testURI\)_OBJECTS =.*$/& \1-rc.o/
s/^\(testDocbook\)_OBJECTS =.*$/& \1-rc.o/
s/^\(testThreads\)_OBJECTS =.*$/& \1-rc.o/
s/^.c.o:/# Rule to make compiled resource (Windows)\
%-rc.o: %.rc\
	windres -i $< -o $@\
\
&/