#!/bin/sh
yarn postgraphile \
    -c postgres://calendar_postgraphile:asupersecretpassword@localhost/calendar_dev \
    --schema calendar \
    --append-plugins @graphile-contrib/pg-simplify-inflector \
    --watch \
    --enhance-graphiql \
    --allow-explain \
    --default-role calendar_anonymous \
    --jwt-token-identifier calendar.jwt \
    --jwt-secret asupersecretjwtsecret \
    --owner-connection postgres://postgres:asupersecurepassword@localhost/calendar_dev