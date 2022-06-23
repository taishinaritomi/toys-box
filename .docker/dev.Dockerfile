FROM node:17-alpine

ENV WORKDIR /workspace

WORKDIR ${WORKDIR}

COPY ["./package.json","./yarn.lock", "${WORKDIR}"]

RUN yarn
