#!/bin/bash

# Wait for pgAdmin to start
sleep 10

# Automatically create a new server connection
PGADMIN_SETUP_SQL="
CREATE SERVER mypgserver
  FOREIGN DATA WRAPPER postgres_fdw
  OPTIONS (
    host 'pgbouncer',
    port '6432',
    dbname 'your_db_name',
    user 'postgres',
    password 'your_password'
  );
"

# Run this configuration (you might need to adapt depending on how pgAdmin can execute it)
psql -U postgres -d postgres -c "$PGADMIN_SETUP_SQL"