FROM node:24-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build



FROM node:24-alpine  AS production

WORKDIR /app


COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
EXPOSE ${PORT}

CMD ["node", "dist/main.js"]
