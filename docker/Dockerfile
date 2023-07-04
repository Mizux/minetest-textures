# Create a virtual environment with all tools installed
# ref: https://hub.docker.com/_/alpine
FROM alpine:edge AS env

# Install system build dependencies
ENV PATH=$PATH:/usr/local/bin
RUN apk add --no-cache \
 inkscape graphviz gimp ttf-freefont

CMD [ "/bin/sh" ]
