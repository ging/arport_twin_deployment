
ARG DRACO_VERSION

FROM ging/fiware-draco:${DRACO_VERSION}

COPY ./processors/*.nar ./
COPY ./processors/*.nar ./lib/
COPY ./templates/*.xml ./conf/templates/

RUN rm nifi-ngsi-nar-1.3.1.nar; rm ./lib/nifi-ngsi-nar-1.3.1.nar
