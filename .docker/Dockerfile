FROM node:16-alpine

ENV WORKDIR /workspace

WORKDIR ${WORKDIR}

COPY ./ ${WORKDIR}

RUN yarn && yarn build
