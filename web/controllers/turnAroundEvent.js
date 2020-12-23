const ngsiV2 = require('../lib/ngsi-v2');

// general controller for getting TurnAroundEvent
//returns HTTP response with a single turn around event object
async function readTurnAroundEvent(entityId, params = {}) {
    try {
        params['options'] = 'keyValues';
        params['type'] = 'TurnAroundEvent';
        return await ngsiV2.readEntity(
            entityId,
            params
        );
    } catch (error) {
        throw (error);
    }
}

// general controller for getting TurnAroundEvent
//returns HTTP response with an array of turn around events
async function listTurnAroundEvents(params = {}, limit = 500, offset = 0) {
    try {
        params['options'] = 'keyValues,count';
        params['type'] = 'TurnAroundEvent';
        params['limit'] = limit;
        params['offset'] = offset;
        return await ngsiV2.listEntities(
            params
        );
    } catch (error) {
        throw (error);
    }
}

// controller for getting TurnAroundEvent from flight
//returns HTTP response with an array of turn around events
async function listTurnAroundEventsFromFlight(flightId, limit = 500, offset = 0) {
    try {
        return await listTurnAroundEvents({
            q: `belongsToFlight=='${flightId}'`
        }, limit, offset)
    } catch (error) {
        throw (error);
    }
}




module.exports = {
    readTurnAroundEvent,
    listTurnAroundEvents,
    listTurnAroundEventsFromFlight
}