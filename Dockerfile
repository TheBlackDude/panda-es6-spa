FROM node:alpine

#################################################################
## install app
## copy files one by one and split commands to use docker cache
#################################################################

WORKDIR /code

# Node Deps
COPY package.json /code/package.json
RUN yarn install --loglevel silent

ENV PATH /code/node_modules/.bin:$PATH

################################################################
## copy all the files inside the container
################################################################
COPY ./ /code

################################################################
## set the entrypoint
################################################################
ENTRYPOINT ["/code/entrypoint.sh"]
