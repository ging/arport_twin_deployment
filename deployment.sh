#!/bin/bash


source ./scripts/wait_for_healthy.sh
source ./scripts/create_subscriptions.sh

ORION_HOST=localhost
ORION_PORT=$(grep ORION_PORT .env | cut -d '=' -f 2-)


if (( $# != 1 )); then
    echo "Incorrect number of parameters"
    echo "usage:  ./deployment.sh [create|restart|stop|destroy]"
    exit 1
fi


parameter="$1"
case "${parameter}" in
	"create")
        echo 'Starting containers...'
        docker-compose up -d --build
        wait_for orion
        create_subscriptions
        wait_for draco-1
        echo 'Ready'
        ;;
    "restart")
		echo 'Restarting containers...'
        docker-compose up -d --build
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








