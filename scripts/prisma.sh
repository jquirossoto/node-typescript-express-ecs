#!/bin/bash

if [[ -z "${DATABASE_HOST}" ]]; then
    >&2 echo "DATABASE_HOST env variable does not exists"
    exit 1
else
    HOST="${DATABASE_HOST}"
fi

if [[ -z "${DATABASE_PORT}" ]]; then
    >&2 echo "DATABASE_PORT env variable does not exists"
    exit 1
else
    PORT="${DATABASE_PORT}"
fi

if [[ -z "${DATABASE_NAME}" ]]; then
    >&2 echo "DATABASE_NAME env variable does not exists"
    exit 1
else
    NAME="${DATABASE_NAME}"
fi

if [[ -z "${DATABASE_USERNAME}" ]]; then
    >&2 echo "DATABASE_USERNAME env variable does not exists"
    exit 1
else
    USERNAME="${DATABASE_USERNAME}"
fi

if [[ -z "${DATABASE_PASSWORD}" ]]; then
    >&2 echo "DATABASE_PASSWORD env variable does not exists"
    exit 1
else
    PASSWORD="${DATABASE_PASSWORD}"
fi

echo "DATABASE_URL=postgresql://$USERNAME:$PASSWORD@$HOST:$PORT/$NAME" > ./prisma/.env