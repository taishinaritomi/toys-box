FROM node:18-alpine

ENV WORKDIR /workspace

WORKDIR ${WORKDIR}

COPY ["./package.json","./yarn.lock", "${WORKDIR}"]

RUN yarn
