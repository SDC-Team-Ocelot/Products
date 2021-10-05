DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

ALTER USER postgres PASSWORD 'password';
