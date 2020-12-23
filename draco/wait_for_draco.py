#!/usr/bin/env python
# coding: utf-8

# In[41]:
import os, requests,json, time, copy
import logging
from subprocess import check_output
from sys import argv


draco_web_port = argv[1]
print("Waiting for Draco to start processors")

DRACO_ENDPOINT = "http://draco:" + draco_web_port +"/nifi-api/system-diagnostics" 
response = 404
while (response!=202 and response!=200):
    try:
        r = requests.get(url = DRACO_ENDPOINT) 
        response = r.status_code
    except:
        response = 404
    print("Response:%s "%response)
    time.sleep(20)
print("Draco is ready")