FROM node:20.0.0-alpine AS base
WORKDIR /usr/src/app
COPY package*.json tsconfig.json ./
RUN apk add --no-cache python3 make g++
RUN npm install

ARG PORT=8080

FROM base AS development 
COPY . .
CMD [ "npm", "run", "dev" ]

FROM base AS production
COPY . .
RUN npm prune --production
CMD [ "npm", "run", "start" ]

EXPOSE ${PORT}
