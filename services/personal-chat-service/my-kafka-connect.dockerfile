FROM confluentinc/cp-server-connect-base:7.6.1

COPY ./debezium-connector-postgres /usr/share/java/debezium-connector-postgres
