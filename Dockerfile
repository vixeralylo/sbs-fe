FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]