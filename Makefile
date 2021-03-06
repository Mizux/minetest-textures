PROJECT := mizux_textures

# General commands
.PHONY: help
BOLD=\e[1m
RESET=\e[0m

help:
	@echo -e "${BOLD}SYNOPSIS${RESET}"
	@echo -e "\tmake <target> [NOCACHE=1]"
	@echo
	@echo -e "${BOLD}DESCRIPTION${RESET}"
	@echo -e "\ttest build inside docker container to have a reproductible build."
	@echo
	@echo -e "${BOLD}MAKE TARGETS${RESET}"
	@echo -e "\t${BOLD}help${RESET}: display this help and exit."
	@echo
	@echo -e "\t${BOLD}env${RESET}: build a virtual env image."
	@echo -e "\t${BOLD}run_env${RESET}: run a container using the virtual env image (debug purpose)."
	@echo
	@echo -e "\t${BOLD}build${RESET}: build the textures in a env image."
	@echo -e "\t${BOLD}install${RESET}: build the textures in a env image."
	@echo
	@echo -e "\t${BOLD}clean${RESET}: Remove textures and docker image."
	@echo
	@echo -e "\t${BOLD}NOCACHE=1${RESET}: use 'docker build --no-cache' when building container (default use cache)."

# Need to add cmd_distro to PHONY otherwise target are ignored since they do not
# contain recipe (using FORCE do not work here)
.PHONY: all
all: build

# Delete all implicit rules to speed up makefile
MAKEFLAGS += --no-builtin-rules
.SUFFIXES:
# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =
# Keep all intermediate files
# ToDo: try to remove it later
.SECONDARY:

# Docker image name prefix.
IMAGE := ${PROJECT}

ifdef NOCACHE
DOCKER_BUILD_CMD := docker build --no-cache
else
DOCKER_BUILD_CMD := docker build
endif

DOCKER_RUN_CMD := docker run \
 --rm \
 --net=host \
 -v $$(pwd):/project -w /project \
 --init --name ${IMAGE} \

# $* stem
# $< first prerequist
# $@ target name

# Build the env image.
.PHONY: env
env: cache/docker_env.tar
cache/docker_env.tar: \
 docker/Dockerfile
	mkdir -p cache
	@docker image rm -f ${IMAGE}:env 2>/dev/null
	${DOCKER_BUILD_CMD} --target=env -t ${IMAGE}:env -f $< .
	@rm -f $@
	docker save ${IMAGE}:env -o $@

# Run a container using the env image.
.PHONY: run_env
run_env: cache/docker_env.tar
	${DOCKER_RUN_CMD} -it ${IMAGE}:env


# Currently supported
THEMES = alien blade_runner deus_ex tron

targets = $(addprefix build_, $(THEMES))
.PHONY: build $(targets)
build: $(targets)
$(targets): build_%: cache/docker_env.tar %/generate.sh
	${DOCKER_RUN_CMD} -t ${IMAGE}:env /bin/sh -c "cd $* && ./generate.sh"

targets = $(addprefix install_, $(THEMES))
.PHONY: install $(targets)
install: $(targets)
$(targets): install_%: cache/docker_env.tar %/install.sh
	${DOCKER_RUN_CMD} -t ${IMAGE}:env /bin/sh -c "cd $* && ./install.sh"

#########
# CLEAN #
#########
.PHONY: clean
clean:
	docker container prune -f
	docker image prune -f
	-docker image rm -f ${IMAGE}:env 2>/dev/null
	-rm -f cache/docker_env.tar
	-rmdir cache

.PHONY: distclean
distclean: clean
	-docker container rm -f $$(docker container ls -aq)
	-docker image rm -f $$(docker image ls -aq)
