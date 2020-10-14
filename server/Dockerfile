FROM node:latest

# create app dir
WORKDIR /usr/src/app
# copy package and package-lock files to app dir
COPY package*.json ./
# install dependencies
RUN npm i
# copy app source
COPY . .
# declare accessible port
EXPOSE 3000

# command what is the main process of a container
CMD ["node", "index.js"]
