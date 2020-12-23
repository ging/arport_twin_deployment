const ngsiV2 = require('../lib/ngsi-v2');

// general controller for getting Aricraft, 
//returns HTTP response with a single aircraft object
async function readAircraft(entityId, params = {}) {
    try {
        params['options'] = 'keyValues';
        params['type'] = 'Aircraft';
        return await ngsiV2.readEntity(
            entityId,
            params
        );
    } catch (error) {
        throw (error);
    }
}

// general controller for getting Aircrafts,
//returns HTTP response with an array of aircrafts
async function listAircrafts(params = {}, limit = 500, offset = 0) {
    try {
        params['options'] = 'keyValues,count';
        params['type'] = 'Aircraft';
        params['limit'] = limit;
        params['offset'] = offset;
        return await ngsiV2.listEntities(
            params
        );
    } catch (error) {
        throw (error);
    }
}

// controller for getting Aircrafts within window time
//returns HTTP response with an array of aircrafts
async function listAircraftsByDate(startDate = new Date(), endDate = new Date(), limit = 500, offset = 0, params = {}) {
    try {
        const dateFilter = `dateIssued==${startDate.toISOString()}..${endDate.toISOString()}`
        params['q'] = params['q'] ? `${params['q']};${dateFilter}` : `${dateFilter}`;
        return await listAircrafts(params, limit, offset)
    } catch (error) {
        throw (error);
    }
}



module.exports = {
    readAircraft,
    listAircrafts,
    listAircraftsByDate
}

