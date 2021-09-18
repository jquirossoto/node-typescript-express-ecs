FROM node:lts-alpine@sha256:8c94a0291133e16b92be5c667e0bc35930940dfa7be544fb142e25f8e4510a45
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY dist/ .
COPY package.json .
RUN npm install
EXPOSE 3000
CMD [ "node", "app.js" ]