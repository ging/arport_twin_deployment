#!/usr/bin/env python
# coding: utf-8

# In[41]:
import os, requests,json, time, copy
import logging
from subprocess import check_output
from sys import argv
import time

HEALTHY=0
STARTING=1
UNHEALTHY=2
UNKNOWN=3
ERROR=99

def get_health_state (container_name):
    output=check_output("docker inspect -f \"{{ .State.Health.Status }}\" "+container_name, shell=True)
    state = output.decode("utf-8").strip()

    if (state =="healthy"):
        return HEALTHY
    elif (state == "unhealthy" ):
        return UNHEALTHY
    elif (state == "starting" ):
        return STARTING
    else:
        return UNKNOWN

def wait_for (container_name):
    health_state = get_health_state (container_name)
    while  ( health_state != HEALTHY ):
        print ("Waiting for container " +container_name+ " to be healthy")
        time.sleep(1)
        health_state = get_health_state (container_name)
    print (container_name + " is healthy")

