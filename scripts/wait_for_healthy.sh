#!/usr/bin/env bash

HEALTHY=0
STARTING=1
UNHEALTHY=2
UNKNOWN=3
ERROR=99


function get_health_state {
    container_name=$1
    state=$(docker inspect -f '{{ .State.Health.Status }}' ${container_name})
    return_code=$?
    if [ ! ${return_code} -eq 0 ]; then
        exit ${ERROR}
    fi
    if [[ "${state}" == "healthy" ]]; then
        return ${HEALTHY}
    elif [[ "${state}" == "unhealthy" ]]; then
        return ${UNHEALTHY}
    elif [[ "${state}" == "starting" ]]; then
        return ${STARTING}
    else
        return ${UNKNOWN}
    fi
}

function wait_for {
    container_name=$1
    get_health_state ${container_name}
    health_state=$?
    echo "Waiting for container '$container_name' to be healthy"
    while [ ${health_state} -ne ${HEALTHY} ]
    do
        sleep 1
        get_health_state ${container_name}
        health_state=$?
    done
    echo "${container_name} is healthy"
}
