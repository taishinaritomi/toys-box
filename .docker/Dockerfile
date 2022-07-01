FROM node:18-alpine

ENV WORKDIR /workspace

WORKDIR ${WORKDIR}

COPY ./ ${WORKDIR}

RUN yarn && yarn build
