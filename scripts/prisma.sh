#/bin/bash

if [[ -z "${DATABASE_HOST}" ]]; then
    >&2 echo "DATABASE_HOST does not exists"
    exit 1
else
    MY_SCRIPT_VARIABLE="${DATABASE_HOST}"
    >&2 echo MY_SCRIPT_VARIABLE
fi