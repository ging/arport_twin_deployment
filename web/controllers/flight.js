const ngsiV2 = require('../lib/ngsi-v2');

// general controller for getting Flight, 
//returns HTTP response with a single flight object
async function readFlight(entityId, params = {}) {
    try {
        params['options'] = 'keyValues';
        params['type'] = 'Flight';
        return await ngsiV2.readEntity(
            entityId,
            params
        );
    } catch (error) {
        throw (error);
    }
}

// general controller for getting Flights,
//returns HTTP response with an array of flights
async function listFlights(params = {}, limit = 500, offset = 0) {
    try {
        params['options'] = 'keyValues,count';
        params['type'] = 'Flight';
        params['limit'] = limit;
        params['offset'] = offset;
        return await ngsiV2.listEntities(
            params
        );
    } catch (error) {
        throw (error);
    }
}

// controller for getting Flights within window time
//returns HTTP response with an array of flights
async function listFlightsByDate(startDate = new Date(), endDate = new Date(), limit = 500, offset = 0, params = {}) {
    try {
        const dateFilter = `dateScheduled==${startDate.toISOString()}..${endDate.toISOString()}`
        params['q'] = params['q'] ? `${params['q']};${dateFilter}` : `${dateFilter}`;
        return await listFlights(params, limit, offset)
    } catch (error) {
        throw (error);
    }
}

// controller for getting Flights with flight number
//returns HTTP response with an array of flights
async function listFlightsByFlightNumber(flightNumber, limit = 500, offset = 0) {
    try {
        return await listFlights({
            q: `flightNumber=='${flightNumber.toString()}'`,
        }, limit, offset)
    } catch (error) {
        throw (error);
    }
}

// controller for getting Flights with flight number within window time
//returns HTTP response with an array of flights
async function listFlightsByFlightNumberAndDate(flightNumber, startDate = new Date(), endDate = new Date(), limit = 500, offset = 0) {
    try {
        return await listFlightsByDate(startDate, endDate, limit, offset, {
            q: `flightNumber=='${flightNumber.toString()}'`,
        })
    } catch (error) {
        throw (error);
    }
}


// controller for getting Flights with flight number within window time
//returns HTTP response with an array of flights
async function listFlightsByAircraftAndDate(aircraftId, startDate = new Date(), endDate = new Date(), limit = 500, offset = 0) {
    try {
        return await listFlightsByDate(startDate, endDate, limit, offset, {
            q: `hasAircraft=='${aircraftId}'`,
        })
    } catch (error) {
        throw (error);
    }
}



module.exports = {
    readFlight,
    listFlights,
    listFlightsByDate,
    listFlightsByFlightNumber,
    listFlightsByFlightNumberAndDate,
    listFlightsByAircraftAndDate
}

