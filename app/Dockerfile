FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src/ ./src

EXPOSE 4743
CMD ["npm", "start"]
