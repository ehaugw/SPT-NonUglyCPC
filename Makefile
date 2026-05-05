include Makefile.helpers
include Makefile.secret
modname = non-ugly-cpc
dependencies =

unity-from:
	cp /mnt/c/Users/eivind/MYHOME/Documents/SPTModding/SDK/EscapeFromTarkov-SDK/AssetBundles/StandaloneWindows/harris_adapter.bundle bundles
	cp /mnt/c/Users/eivind/MYHOME/Documents/SPTModding/SDK/EscapeFromTarkov-SDK/AssetBundles/StandaloneWindows/knight_mask_skull_only.bundle bundles

unity-to:
	cp /mnt/c/Users/eivind/MYHOME/Documents/SPTModding/NonUglyCpc/meshes/knight_mask_skull_only.fbx /mnt/c/Users/eivind/MYHOME/Documents/SPTModding/SDK/EscapeFromTarkov-SDK/Assets/Ehaugw/Equipment/KnightMaskSkullOnly/Meshes/

assemble: unity-from
	rm -f -r export
	mkdir -p export/$(tspath)/$(modname)
	mkdir -p export/$(tspath)/$(modname)/src
	mkdir -p export/$(tspath)/$(modname)/bundles
	cp -r src/* export/$(tspath)/$(modname)/src
	cp -r bundles/* export/$(tspath)/$(modname)/bundles
	cp package.json export/$(tspath)/$(modname)/
	cp bundles.json export/$(tspath)/$(modname)/
	cp README.md export/$(tspath)/$(modname)/
	cp icon.png export/$(tspath)/$(modname)/

forceinstall:
	make assemble
	rm -r -f $(gamepath)/$(pluginpath)/$(modname)
	cp -u -r export/* $(gamepath)
	scp -r export/* $(hostwanuser):SPT_3_11/server_files

play:
	(make install && cd .. && make play)
