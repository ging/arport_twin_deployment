const ngsiV2 = require('../lib/ngsi-v2');

// general controller for getting Flight
async function readFlight(entityId, params = {}){
    try {
        params['options'] = 'keyValues';
        params['type'] = 'Flight';
        return await ngsiV2.readEntity(
            entityId,
            params
        );
    } catch(error) {
        throw(error);
    }
}

// general controller for getting Flights
async function listFlights(params = {}){
    try {
        params['options'] = 'keyValues,count';
        params['type'] = 'Flight';
        return await ngsiV2.listEntities(
            params
        );
    } catch(error) {
        throw(error);
    }
}

// controller for getting Flights within window time
async function listFlightsByDate(startDate = new Date(), endDate = new Date(), limit = 500, offset = 0){
    try {
        return await listFlights({
            q: `dateScheduled==${startDate.toISOString()}..${endDate.toISOString()}`,
            limit,
            offset
        })
    } catch(error) {
        throw(error);
    }
}

// controller for getting Flights with flight number
async function listFlightsByFlightNumber(flightNumber, limit = 500, offset = 0){
    try {
        return await listFlights({
            q: `flightNumber=='${flightNumber.toString()}'`,
            limit,
            offset
        })
    } catch(error) {
        throw(error);
    }
}

// controller for getting Flights with flight number within window time
async function listFlightsByFlightNumberAndDate(flightNumber, startDate = new Date(), endDate = new Date(), limit = 500, offset = 0){
    try {
        return await listFlights({
            q: `dateScheduled==${startDate.toISOString()}..${endDate.toISOString()};flightNumber=='${flightNumber.toString()}'`,
            limit,
            offset
        })
    } catch(error) {
        throw(error);
    }
}




module.exports = {
    readFlight,
    listFlights,
    listFlightsByDate,
    listFlightsByFlightNumber,
    listFlightsByFlightNumberAndDate
}

