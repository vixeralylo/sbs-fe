FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./build /app/build 
ENTRYPOINT ["nginx", "-g", "daemon off;"]