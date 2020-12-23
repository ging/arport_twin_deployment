
#!/usr/bin/env python
# coding: utf-8

# In[41]:
import os, requests,json, time, copy
import logging

def create_subscriptions(orion_host, orion_port):
        ORION_ENDPOINT = "http://" + orion_host + ":" + orion_port +"/v2/subscriptions"
        headers = {'content-type': 'application/json'}
        print("Subscribing to changes in airport...")
        data = {
            "description": "Notify me of all Airport changes",
            "subject": {
                "entities": [{"idPattern": ".*", "type": "Airport"}],
                "condition": {
                "attrs": [ "name", "codeICAO", "codeIATA", "id"]
                }
            },
            "notification": {
                "http": {
                "url": "http://draco:5050/v2/notify"
                }
            }
        }
        r = requests.post(url = ORION_ENDPOINT, json=data ,headers=headers) 
        response = r.status_code
        print("Response:%s "%response)

        print("Subscribing to changes in aircraft location and isOnGround...")
        data = {
            "description": "Notify me of all aircraft changes",
            "subject": {
                "entities": [{"idPattern": ".*", "type": "Aircraft"}],
                "condition": {
                "attrs": [ "isOnGround", "location"]
                }
            },
            "notification": {
                "http": {
                "url": "http://web:3000/subscription/aircraft-change"
                },
                "attrsFormat": "keyValues"
            }
        }
        r = requests.post(url = ORION_ENDPOINT, json=data ,headers=headers) 
        response = r.status_code
        print("Response:%s "%response)

        print("Subscribing to changes in airline...")
        data = {
            "description": "Notify me of all Airline changes",
            "subject": {
                "entities": [{"idPattern": ".*", "type": "Airline"}],
                "condition": {
                "attrs": [ "name", "codeICAO", "codeIATA", "id"]
                }
            },
            "notification": {
                "http": {
                "url": "http://draco:5050/v2/notify"
                }
            }
        }
        r = requests.post(url = ORION_ENDPOINT, json=data ,headers=headers) 
        response = r.status_code
        print("Response:%s "%response)

        print("Subscribing to changes in airport...")
        data = {
            "description": "Notify me of all aircraft changes",
            "subject": {
                "entities": [{"idPattern": ".*", "type": "Aircraft"}],
                "condition": {
                "attrs": [ "isOnGround", "location"]
                }
            },
            "notification": {
                "http": {
                "url": "http://draco:5050/v2/notify"
                }
            }
        }
        r = requests.post(url = ORION_ENDPOINT, json=data ,headers=headers) 
        response = r.status_code
        print("Response:%s "%response)

        print("Subscribing to changes in Flight...")
        data = {
            "description": "Notify me of all Flight changes",
            "subject": {
                "entities": [{"idPattern": ".*", "type": "Flight"}],
                "condition": {
                "attrs": [ "aodbPrincipalFlightId", "flightNumber", "dateAIBT", "dateALDT", "dateAOBT", "dateTOBT", "dateScheduled"]
                }
            },
            "notification": {
                "http": {
                "url": "http://draco:5050/v2/notify"
                }
            }
        }
        r = requests.post(url = ORION_ENDPOINT, json=data ,headers=headers) 
        response = r.status_code
        print("Response:%s "%response)

        print("Subscribing to changes in FlightNotification...")
        data = {
            "description": "Notify me of all FlightNotification changes",
            "subject": {
                "entities": [{"idPattern": ".*", "type": "FlightNotification"}],
                "condition": {
                "attrs": [ "dateIssued", "description", "state"]
                }
            },
            "notification": {
                "http": {
                "url": "http://draco:5050/v2/notify"
                }
            }
        }
        r = requests.post(url = ORION_ENDPOINT, json=data ,headers=headers) 
        response = r.status_code
        print("Response:%s "%response)

        print("Subscribing to changes in TurnAroundEvent...")
        data = {
            "description": "Notify me of all TurnAroundEvent changes",
            "subject": {
                "entities": [{"idPattern": ".*", "type": "TurnAroundEvent"}],
                "condition": {
                "attrs": [ "dateIssued", "id", "eventType"]
                }
            },
            "notification": {
                "http": {
                "url": "http://draco:5050/v2/notify"
                }
            }
        }
        r = requests.post(url = ORION_ENDPOINT, json=data ,headers=headers) 
        response = r.status_code
        print("Response:%s "%response)