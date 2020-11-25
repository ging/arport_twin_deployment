
ARG DRACO_VERSION

FROM ging/fiware-draco:${DRACO_VERSION}

COPY ./nifi-tcp-client-nar-1.0-SNAPSHOT.nar .
COPY ./nifi-tcp-client-nar-1.0-SNAPSHOT.nar ./lib
COPY ./nifi-ngsi-nar-1.3.4.nar .
COPY ./nifi-ngsi-nar-1.3.4.nar ./lib
COPY ./Firehose-NGSI-Orion.xml ./conf/templates/
COPY ./Chroma-NGSI-Orion.xml ./conf/templates/

RUN rm nifi-ngsi-nar-1.3.1.nar; rm ./lib/nifi-ngsi-nar-1.3.1.nar
