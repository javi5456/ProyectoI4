FROM node:20.11.0

WORKDIR /Docker-ecommerce-javi5456

COPY package*.json ./

RUN npm install

COPY ./src/config ./src/config

COPY . .

RUN ls -R /Docker-ecommerce-javi5456

EXPOSE 3000

CMD ["npm", "run", "start"]