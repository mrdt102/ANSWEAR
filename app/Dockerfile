FROM node:20-alpine

WORKDIR /app

COPY . .
RUN npm install --production # mniejszy rozmiar obrazu dzieki production
EXPOSE 3000
CMD ["node", "server.js"]