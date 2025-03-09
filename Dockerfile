FROM nginx:latest

# Set timezone to Asia/Jakarta
RUN apt update && apt install -y tzdata && \
    ln -sf /usr/share/zoneinfo/Asia/Jakarta /etc/localtime && \
    echo "Asia/Jakarta" > /etc/timezone
    
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./build .
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]