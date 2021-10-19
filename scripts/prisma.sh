#!/bin/bash

if [[ -z "${DATABASE_HOST}" ]]; then
    >&2 echo "DATABASE_HOST does not exists"
    exit 1
else
    >&2 echo "DATABASE_HOST does exists"
    MY_SCRIPT_VARIABLE="${DATABASE_HOST}"
fi
>&2 echo $MY_SCRIPT_VARIABLE