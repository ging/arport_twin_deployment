const ngsiV2 = require('../lib/ngsi-v2');

// general controller for getting FlightNotification
async function readNotification(entityId, params = {}){
    try {
        params['options'] = 'keyValues';
        params['type'] = 'FlightNotification';
        const notificationResponse = await ngsiV2.readEntity(
            entityId,
            params
        );
        notificationResponse.data = sanetizeNotification(notificationResponse.data)
        return notificationResponse;
    } catch(error) {
        throw(error);
    }
}

// general controller for getting FlightNotification
async function listNotifications(params = {}){
    try {
        params['options'] = 'keyValues,count';
        params['type'] = 'FlightNotification';
        const notificationsResponse = await ngsiV2.listEntities(
            params
        );
        notificationsResponse.data.map(notification => {
            return (sanetizeNotification(notification));
        })
        return notificationsResponse;
    } catch(error) {
        throw(error);
    }
}

// controller for getting Notifications from flight
async function listNotificationsFromFlight(flightId, limit = 500, offset = 0){
    try {
        const notificationsResponse = await listNotifications({
            q: `belongsToFlight=='${flightId}'`,
            limit,
            offset
        })
        notificationsResponse.data.map(notification => {
            return (sanetizeNotification(notification));
        })
        return notificationsResponse;
    } catch(error) {
        throw(error);
    }
}


// create FlightNotification
async function createNotification(flightId, description, date = new Date(), dataProvider){
    try {
        return await ngsiV2.createEntity(
            {
                "id": `${flightId}:${date.toISOString()}`,
                "type": "FlightNotification",
                "dateIssued": {
                    "type": "DateTime",
                    "value": date.toISOString()
                },
                "description": {
                    "value": escape(description)
                },
                "belongsToFlight": {
                    "value": flightId.toString(),
                    "type": "Relationship"
                },
                "state" : {
                    "value": "active"
                },
                "dataProvider": {
                    "value": escape(dataProvider)
                } 
            },
            ngsiV2.setHeaders()
        )
    } catch(error) {
        console.error(error);
    }
}

// inactive (state inactive) FlightNotification
async function inactiveNotification(notificationId){
    try {
        return await ngsiV2.updateEntity(
            notificationId,
            {
                "state" : {
                    "value": "inactive"
                }
            },
            ngsiV2.setHeaders()
        )
    } catch(error) {
        console.error(error);
    }
}

function sanetizeNotification(notification){
    notification.dataProvider = unescape(notification.dataProvider);
    notification.description = unescape(notification.description);
    return notification;
}

module.exports= {
    readNotification,
    listNotifications,
    listNotificationsFromFlight,
    createNotification,
    inactiveNotification
}