FROM node:14-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN npm install

RUN npm run-script build-extranet

FROM nginx:1.21.3-alpine
COPY --from=build-step /app/dist/apps/web-extranet /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf