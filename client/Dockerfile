FROM node:22

WORKDIR /app

ENV NODE_OPTIONS="--openssl-legacy-provider"

COPY package*.json ./

RUN npm install
RUN npm rebuild bcrypt --update-binary

COPY . .

EXPOSE 3000

CMD ["npm", "start"]