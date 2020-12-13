#!/bin/bash

function create_subscriptions {
    echo 'Subscribe to changes in airport'

    curl -iX POST \
    --url 'http://'$ORION_HOST':'$ORION_PORT'/v2/subscriptions' \
    --header 'content-type: application/json' \
    --data '{
    "description": "Notify me of all Airport changes",
    "subject": {
        "entities": [{"idPattern": ".*", "type": "Airport"}],
        "condition": {
        "attrs": [ "name", "codeICAO", "codeIATA", "id"]
        }
    },
    "notification": {
        "http": {
        "url": "http://draco:5050/v2/notify"
        }
    }
    }'

    echo 'Subscribe to changes in airline'

    curl -iX POST \
    --url 'http://'$ORION_HOST':'$ORION_PORT'/v2/subscriptions' \
    --header 'content-type: application/json' \
    --data '{
    "description": "Notify me of all Airline changes",
    "subject": {
        "entities": [{"idPattern": ".*", "type": "Airline"}],
        "condition": {
        "attrs": [ "name", "codeICAO", "codeIATA", "id"]
        }
    },
    "notification": {
        "http": {
        "url": "http://draco:5050/v2/notify"
        }
    }
    }'

    echo 'Subscribe to changes in aircraft location and isOnGround'

    curl -iX POST \
    --url 'http://'$ORION_HOST':'$ORION_PORT'/v2/subscriptions' \
    --header 'content-type: application/json' \
    --data '{
    "description": "Notify me of all aircraft changes",
    "subject": {
        "entities": [{"idPattern": ".*", "type": "Aircraft"}],
        "condition": {
        "attrs": [ "isOnGround", "location"]
        }
    },
    "notification": {
        "http": {
        "url": "http://web:3000/subscription/aircraft-change"
        },
        "attrsFormat": "keyValues"
    }
    }'

    curl -iX POST \
    --url 'http://'$ORION_HOST':'$ORION_PORT'/v2/subscriptions' \
    --header 'content-type: application/json' \
    --data '{
    "description": "Notify me of all aircraft changes",
    "subject": {
        "entities": [{"idPattern": ".*", "type": "Aircraft"}],
        "condition": {
        "attrs": [ "isOnGround", "location"]
        }
    },
    "notification": {
        "http": {
        "url": "http://draco:5050/v2/notify"
        }
    }
    }'

    echo 'Subscribe to changes in flight'

    curl -iX POST \
    --url 'http://'$ORION_HOST':'$ORION_PORT'/v2/subscriptions' \
    --header 'content-type: application/json' \
    --data '{
    "description": "Notify me of all Flight changes",
    "subject": {
        "entities": [{"idPattern": ".*", "type": "Flight"}],
        "condition": {
        "attrs": [ "aodbPrincipalFlightId", "flightNumber", "dateAIBT", "dateALDT", "dateAOBT", "dateTOBT", "dateScheduled"]
        }
    },
    "notification": {
        "http": {
        "url": "http://draco:5050/v2/notify"
        }
    }
    }'

    echo 'Subscribe to changes in noification of flight'

    curl -iX POST \
    --url 'http://'$ORION_HOST':'$ORION_PORT'/v2/subscriptions' \
    --header 'content-type: application/json' \
    --data '{
    "description": "Notify me of all FlightNotification changes",
    "subject": {
        "entities": [{"idPattern": ".*", "type": "FlightNotification"}],
        "condition": {
        "attrs": [ "dateIssued", "description", "state"]
        }
    },
    "notification": {
        "http": {
        "url": "http://draco:5050/v2/notify"
        }
    }
    }'


}