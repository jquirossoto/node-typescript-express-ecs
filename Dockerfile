# ---------------------------- BASE ----------------------------
FROM node:lts-alpine@sha256:8c94a0291133e16b92be5c667e0bc35930940dfa7be544fb142e25f8e4510a45 as base
# installs tini (https://github.com/krallin/tini)
RUN apk add --no-cache tini
# creates the workdir
RUN mkdir -p /usr/src/app
# sets workdir
WORKDIR /usr/src/app
# copies package*.json files
COPY package.json .
COPY package-lock.json .

# ---------------------------- DEPENDENCIES ----------------------------
FROM base AS dependencies
# copies schema.prisma to generate client after installing modules (https://www.prisma.io/)
COPY prisma/schema.prisma .
# installs production modules
RUN npm ci --only=production

# ---------------------------- RELEASE ----------------------------
FROM base AS release
# sets user (node) to use when running the image and for any RUN, CMD and ENTRYPOINT instructions
USER node
# sets tini as entry point
ENTRYPOINT ["/sbin/tini", "--"]
# sets NODE_ENV to production
ENV NODE_ENV production
# copies the production modules from the dependencies image
COPY --chown=node:node --from=dependencies /usr/src/app/node_modules node_modules/
# copies the built app from the build image
COPY --chown=node:node dist/ .
# exposes port
EXPOSE 3000
# executes app
CMD [ "node", "app.js" ]