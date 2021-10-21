#!/bin/bash

urlencode() {
    # taken from https://github.com/SixArm/urlencode.sh
    # urlencode <string>

    old_lang=$LANG
    LANG=C
    
    old_lc_collate=$LC_COLLATE
    LC_COLLATE=C

    local length="${#1}"
    for (( i = 0; i < length; i++ )); do
        local c="${1:i:1}"
        case $c in
            [a-zA-Z0-9.~_-]) printf "$c" ;;
            *) printf '%%%02X' "'$c" ;;
        esac
    done

    LANG=$old_lang
    LC_COLLATE=$old_lc_collate
}

if [[ -z "${DB_HOST}" ]]; then
    >&2 echo "DB_HOST env variable does not exists"
    exit 1
else
    HOST="${DB_HOST}"
fi

if [[ -z "${DB_PORT}" ]]; then
    >&2 echo "DB_PORT env variable does not exists"
    exit 1
else
    PORT="${DB_PORT}"
fi

if [[ -z "${DB_NAME}" ]]; then
    >&2 echo "DB_NAME env variable does not exists"
    exit 1
else
    NAME="${DB_NAME}"
fi

if [[ -z "${DB_USERNAME}" ]]; then
    >&2 echo "DB_USERNAME env variable does not exists"
    exit 1
else
    USERNAME="${DB_USERNAME}"
fi

if [[ -z "${DB_PASSWORD}" ]]; then
    >&2 echo "DB_PASSWORD env variable does not exists"
    exit 1
else
    PASSWORD=$(urlencode ${DB_PASSWORD})
fi

echo "DATABASE_URL=postgresql://$USERNAME:$PASSWORD@$HOST:$PORT/$NAME" > ./prisma/.env