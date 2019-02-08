################################################################################
#                                   Makefile                                   #
################################################################################

.PHONY: build clean
rimraf = rm -rf
tsc = yarn tsc

srcdir = src
dstdir = dist

build:
	$(tsc) -b $(srcdir)

clean:
	$(rimraf) $(dstdir)
