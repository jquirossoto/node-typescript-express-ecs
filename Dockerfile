# ---------------------------- BASE ----------------------------
FROM node:12-alpine@sha256:dfbebf17bfb014e1e7068e76325a117bccf8679c68aec6a28514184a209c8bae as base
# installs tini (https://github.com/krallin/tini)
RUN apk add --no-cache tini
# installs curl
RUN apk add --no-cache curl
# creates the workdir
RUN mkdir -p /usr/src/app
# sets workdir
WORKDIR /usr/src/app


# ---------------------------- DEPENDENCIES ----------------------------
FROM base AS dependencies
# copies package*.json files
COPY package.json .
COPY package-lock.json .
# copies schema.prisma and .env to generate prisma client while installing modules (https://www.prisma.io/)
COPY prisma/schema.prisma .
COPY prisma/.env .
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
# copies prisma .env to resolve database credentials
COPY --chown=node:node --from=dependencies /usr/src/app/.env .
# exposes port
EXPOSE 3000
# executes app
CMD [ "node", "server.js" ]