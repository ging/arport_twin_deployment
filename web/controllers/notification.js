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
        params['options'] = 'keyValues,count';
        params['type'] = 'Notification';
        return await ngsiV2.listEntities(
            params
        );
    } catch(error) {
        throw(error);
    }
}

// controller for getting Notifications from flight
async function listNotificationsFromFlight(flightId, limit = 500, offset = 0){
    try {
        return await listNotifications({
            q: `belongsToFlight=='${flightId}'`,
            limit,
            offset
        })
    } catch(error) {
        throw(error);
    }
}


// create Notification
async function createNotification(flightId, description, date = new Date(), source){
    try {
        return await ngsiV2.createEntity(
            {
                "id": `${flightId}:${date.toISOString()}`,
                "type": "Notification",
                "dateIssued": {
                    "type": "DateTime",
                    "value": date.toISOString()
                },
                "description": {
                    "value": description
                },
                "belongsToFlight": {
                    "value": flightId.toString(),
                    "type": "Relationship"
                },
                "state" : {
                    "value": "active"
                },
                "source": {
                    "value": source
                } 
            },
            ngsiV2.setHeaders()
        )
    } catch(error) {
        console.error(error);
    }
}

// inactive (state inactive) Notification
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

module.exports= {
    readNotification,
    listNotifications,
    listNotificationsFromFlight,
    createNotification,
    inactiveNotification
}