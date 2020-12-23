const notificationController = require('./notification.js');
const flightController = require('./flight.js');
const aircraftController = require('./aircraft.js');
const turnAroundEventController = require('./turnAroundEvent.js');


(async () => {
    const dateNow = new Date(); 
    const dateInit = new Date(dateNow);
    const dateFinish = new Date(dateNow);
    const dataProbe = new Date('2020-12-07T16:16:52.900Z');
    dateInit.setHours(dateInit.getHours() - 48);
    dateFinish.setHours(dateFinish.getHours() + 48);
    console.log(dateInit.toISOString())
    console.log(dateFinish.toISOString())
    
    //console.log((await flightController.listFlights({}, limit=2, offset=0)).data);
    //console.log((await flightController.listFlightsByDate(dateInit, dateFinish, limit=1, offset=1)).data);
    //console.log((await flightController.listFlightsByFlightNumber('1307')).data);
    //console.log((await flightController.listFlightsByFlightNumberAndDate('1307', dateInit, dateFinish)).data);
    //console.log((await flightController.readFlight('3581752')).data);
    //console.log((await flightController.listFlightsByAircraftAndDate('GEUPR', dateInit, dateFinish)))

    //console.log((await notificationController.createNotification('3581752', `<>"'=;()hola que tal yo genial sí`, dataProbe, "data provider Example")).status);
    //console.log((await notificationController.readNotification('3514082:2020-12-07T16:16:52.900Z')).data);
    console.log((await notificationController.listNotificationsFromFlight('3581752', 1)).data);
    //console.log((await notificationController.inactiveNotification('3514082:2020-12-07T16:16:52.900Z')).status);
    //console.log((await notificationController.readNotification('3514082:2020-12-07T16:16:52.900Z')).data);
    //console.log((await notificationController.listNotifications()).data)

    //console.log((await aircraftController.listAircraftsByDate(dateInit, dateFinish)).data);
    //console.log((await aircraftController.listAircrafts()).data)
    //console.log((await aircraftController.readAircraft('9HALL')).data)

    //console.log((await turnAroundEventController.listTurnAroundEvents({}, 1,0)).data);
    console.log((await turnAroundEventController.listTurnAroundEventsFromFlight('3581752', 5, 0)).data)
    //console.log((await turnAroundEventController.readTurnAroundEvent('5fdce715e713020cb167f76c:1')).data)
})()