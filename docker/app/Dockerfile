FROM node:lts-alpine as builder
# no console and no unused vars choose building env execpt production
ENV NODE_ENV=staging
RUN apk update && apk add --no-cache make git nodejs
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY *.js ./
COPY src ./src/
COPY public ./public/
COPY views ./views/
RUN npm run build

FROM nginx:1.17.9-alpine
COPY docker/app/nginx.conf /etc/nginx/
COPY --from=builder /app/dist /var/www
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
