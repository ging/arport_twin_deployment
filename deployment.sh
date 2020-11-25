#!/bin/bash


source ./scripts/wait_for_healthy.sh

ORION_HOST=localhost
ORION_PORT=$(grep ORION_PORT .env | cut -d '=' -f 2-)

WEB_CLIENT_HOST=web
WEB_CLIENT_PORT=$(grep WEB_CLIENT_PORT .env | cut -d '=' -f 2-)

DRACO_HOST=draco
DRACO_PORT=$(grep DRACO_PORT .env | cut -d '=' -f 2-)

if (( $# != 1 )); then
    echo "Incorrect number of parameters"
    echo "usage:  ./deployment.sh [create|restart|stop|destroy]"
    exit 1
fi


function create_subscriptions {

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
        "url": "http://'$WEB_CLIENT_HOST':'$WEB_CLIENT_PORT'/subscription/aircraft-change"
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
        "url": "http://'$DRACO_HOST':'$DRACO_PORT'/v2/notify"
        }
    }
    }'

    curl -iX POST \
    --url 'http://'$ORION_HOST':'$ORION_PORT'/v2/subscriptions' \
    --header 'content-type: application/json' \
    --data '{
    "description": "Notify me of all Flight changes",
    "subject": {
        "entities": [{"idPattern": ".*", "type": "Flight"}],
        "condition": {
        "attrs": [ "aodbLinkedFlightId", "flightNumber"]
        }
    },
    "notification": {
        "http": {
        "url": "http://'$DRACO_HOST':'$DRACO_PORT'/v2/notify"
        }
    }
    }'
}



parameter="$1"
case "${parameter}" in
	"create")
        echo 'Starting containers...'
        docker-compose up -d
        wait_for orion
        create_subscriptions
        wait_for draco-1
        echo 'Ready'
        ;;
    "restart")
		echo 'Restarting containers...'
        docker-compose up -d
        wait_for orion
        wait_for draco-1
        echo 'Ready'
		;;
	 "stop")
		echo 'Stopping...'
        docker-compose down
        echo 'Finish'
        echo 'Command to restart: ./deployment.sh restart'
		;;
    "destroy")
		echo 'Removing all...'
        while true; 
        do
            read -p "All the data will be deleted. Do you want to continue?" yn
            case $yn in
                [Yy]* ) break;;
                [Nn]* ) exit;;
                * ) echo "Please answer yes or no.";;
            esac
        done
        docker-compose down -v
        echo 'Finish'
		;;
	*)
		echo "Incorrect use of parameters"
        echo "usage:  ./deployment.sh [create|restart|stop|destroy]"
        exit 1
		;;
esac








