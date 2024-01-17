#Stage 1
FROM node:latest as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm build

#Stage 2
FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]