FROM alpine:latest

RUN npm install --production --unsafe-perm || \
    ((if [ -f npm-debug.log ]; then \
        cat npm-debug.log; \
        fi) && false)

CMD npm start