# ---------------------------- BASE ----------------------------
FROM node:16-alpine@sha256:2f50f4a428f8b5280817c9d4d896dbee03f072e93f4e0c70b90cc84bd1fcfe0d as base
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
COPY package*.json .
# copies schema.prisma and .env to generate prisma client while installing modules (https://www.prisma.io/)
COPY prisma/schema.prisma .
COPY prisma/.env .
# disables prepare script (https://typicode.github.io/husky/#/?id=disable-husky-in-cidocker)
RUN npm set-script prepare ""
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
# copies package*.json files from dependencies stage
COPY --chown=node:node --from=dependencies /usr/src/app/package*.json .
# copies the production modules from the dependencies stage
COPY --chown=node:node --from=dependencies /usr/src/app/node_modules node_modules/
# copies prisma .env to resolve database credentials from the dependencies image
COPY --chown=node:node --from=dependencies /usr/src/app/.env .
# copies the built app from the build image
COPY --chown=node:node dist/ .
# exposes port
EXPOSE 3000
# executes app
CMD [ "node", "server.js" ]