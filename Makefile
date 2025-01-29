include Makefile.helpers
modname = non-ugly-cpc
dependencies =

assemble:
	rm -f -r export
	mkdir -p export/$(tspath)/$(modname)
	mkdir -p export/$(tspath)/$(modname)/src
	mkdir -p export/$(tspath)/$(modname)/bundles
	mkdir -p export/$(tspath)/$(modname)/db
	cp -r src/* export/$(tspath)/$(modname)/src
	cp -r bundles/* export/$(tspath)/$(modname)/bundles
	cp -r db/* export/$(tspath)/$(modname)/db
	cp package.json export/$(tspath)/$(modname)/
	cp bundles.json export/$(tspath)/$(modname)/
	cp README.md export/$(tspath)/$(modname)/
	cp icon.png export/$(tspath)/$(modname)/
	cp disclaimer.pdf export/$(tspath)/$(modname)/

forceinstall:
	make assemble
	rm -r -f $(gamepath)/$(pluginpath)/$(modname)
	cp -u -r export/* $(gamepath)

play:
	(make install && cd .. && make play)
