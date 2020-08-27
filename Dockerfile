FROM node:latest
ENV path /react-admin/src
RUN mkdir -p ${path}
WORKDIR ${path}
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm","start" ]
