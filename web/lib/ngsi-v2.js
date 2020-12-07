const axios = require('axios');

const ORION_URL = process.env.ORION_URL || 'http://localhost:1026/v2';

const JSON_HEADER = 'application/json';

function setHeaders(accessToken, contentType) {
    const headers = {};
    if (accessToken) {
        // If the system has been secured and we have logged in,
        // add the access token to the request to the PEP Proxy
        headers['X-Auth-Token'] = accessToken;
    }
    
    headers['Content-Type'] = contentType || JSON_HEADER;
    
    return headers;
}

// This is a promise to make an HTTP GET request to the
// /v2/entities/ end point
async function listEntities(opts, headers = {}) {
    try {
        return await axios({
            url: `${ORION_URL}/entities`,
            method: 'GET',
            headers,
            params: opts
        });
    } catch (error) {
        throw(error);
    }
}

// This is a promise to make an HTTP GET request to the
// /v2/entities/<entity-id> end point
async function readEntity(entityId, opts, headers = {}) {
    try {
        return await axios({
            url: `${ORION_URL}/entities/${entityId}`,
            method: 'GET',
            headers,
            params: opts
        });
    } catch (error) {
        throw(error);
    }
}


// This is a promise to make an HTTP POST request to the
// /v2/entities/entities end point
async function createEntity(data={}, headers = {}) {
    try {
        return await axios({
            url: `${ORION_URL}/entities`,
            method: 'POST',
            headers,
            data
        });
    } catch (error) {
        throw(error);
    }
}

// This is a promise to make an HTTP PATCH request to the
// /v2/entities/entities/entityId/attrs end point
async function updateEntity(entityId, data, headers = {}) {
    try {
        return await axios({
            url: `${ORION_URL}/entities/${entityId}/attrs`,
            method: 'PATCH',
            data,
            headers
        });
    } catch (error) {
        throw(error);
    }
}

module.exports= {
    setHeaders,
    listEntities,
    readEntity,
    createEntity,
    updateEntity
}