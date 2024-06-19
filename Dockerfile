FROM node:22

WORKDIR /app

ENV NODE_OPTIONS="--openssl-legacy-provider"

COPY package*.json ./

RUN npm install
RUN npm install bcrypt
RUN npm install bcryptjs

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]