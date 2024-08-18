FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g db-migrate

EXPOSE 3000

# Comando para correr la aplicación
CMD ["node", "app.js"]
