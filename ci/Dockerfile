FROM nginx:1.17

#Remove the default nginx web stuffs
RUN rm -rf /usr/share/nginx/html/*

#Copy the build web stuffs into nginx
RUN ls -la /etc/nginx/conf.d
#RUN mv /etc/nginx/conf.d /etc/nginx/conf.d.orig
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.bak
COPY ci/default_dev.conf /etc/nginx/conf.d/default.conf
COPY www/ /usr/share/nginx/html/
COPY README.md /usr/share/nginx/html/
RUN ls -la /etc/nginx/conf.d
