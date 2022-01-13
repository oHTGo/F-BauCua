# Development
FROM node:14-alpine AS development

WORKDIR /app

COPY package.json ./
RUN yarn install

COPY . .
CMD yarn start:dev

# Production
FROM node:14-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json ./
RUN yarn install --production

COPY . .
COPY --from=development /app/dist ./dist

RUN yarn global add pm2

CMD yarn start:prod