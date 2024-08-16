FROM confluentinc/cp-server-connect-base:7.6.1

COPY ./debezium-debezium-connector-postgresql-2.5.4.zip /tmp/debezium-debezium-connector-postgresql-2.5.4.zip

# confluent-hub install just working with .zip file, not working with .tar.gz file
RUN confluent-hub install --no-prompt /tmp/debezium-debezium-connector-postgresql-2.5.4.zip