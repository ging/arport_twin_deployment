const ngsiV2 = require('../lib/ngsi-v2');

// general controller for getting Notification
async function readNotification(entityId, params = {}){
    try {
        params['options'] = 'keyValues';
        params['type'] = 'Notification';
        return await ngsiV2.readEntity(
            entityId,
            params
        );
    } catch(error) {
        throw(error);
    }
}

// general controller for getting Notification
async function listNotifications(params = {}){
    try {
        params['options'] = 'keyValues';
        params['type'] = 'Notification';
        return await ngsiV2.listEntities(
            params
        );
    } catch(error) {
        throw(error);
    }
}

// controller for getting Notifications from flight
async function listNotificationsFromFlight(flightId){
    try {
        return await listNotifications({
            q: `belongsToFlight=='${flightId}'`
        })
    } catch(error) {
        throw(error);
    }
}


// create Notification
async function createNotification(flightId, message, date = new Date()){
    try {
        return await ngsiV2.createEntity(
            {
                "id": `${flightId}:${date.toISOString()}`,
                "type": "Notification",
                "sendDateTime": {
                    "type": "DateTime",
                    "value": date.toISOString()
                },
                "message": {
                    "value": message
                },
                "belongsToFlight": {
                    "value": flightId.toString(),
                    "type": "Relationship"
                },
                "status" : {
                    "value": "active"
                }
            },
            ngsiV2.setHeaders()
        )
    } catch(error) {
        console.error(error);
    }
}

// inactive (status inactive) Notification
async function inactiveNotification(notificationId){
    try {
        return await ngsiV2.updateEntity(
            notificationId,
            {
                "status" : {
                    "value": "inactive"
                }
            },
            ngsiV2.setHeaders()
        )
    } catch(error) {
        console.error(error);
    }
}

module.exports= {
    readNotification,
    listNotifications,
    listNotificationsFromFlight,
    createNotification,
    inactiveNotification
}