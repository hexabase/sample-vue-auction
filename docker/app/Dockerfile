FROM node:lts-alpine as builder
RUN apk update && apk add --no-cache make git nodejs
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.2-alpine-perl
RUN apk add --no-cache nginx-mod-http-perl
COPY docker/app/nginx.conf /etc/nginx/
COPY --from=builder /app/dist /var/www

ENV ENV "dev"
EXPOSE 80
STOPSIGNAL SIGQUIT
ENTRYPOINT ["nginx", "-g", "daemon off;"]
