#!/usr/bin/env python
# coding: utf-8

# In[41]:
import os, requests,json, time, copy
import logging
from subprocess import check_output
from sys import argv
from scripts.wait_for_healthy import wait_for
from scripts.create_subscriptions import create_subscriptions


class Deployment():

    def options(self, parameter, orion_host,orion_port):
        if (parameter == 'create'):
            print("Starting containers...")
            check_output("docker-compose up -d --build", shell=True)
            wait_for("orion")
            create_subscriptions(orion_host,orion_port)
            wait_for("draco-1")
            print("Ready")
        elif (parameter == 'restart'):
            print("Restarting containers...")
            check_output("docker-compose up -d --build", shell=True)
            wait_for("orion")
            wait_for("draco-1")
            print("Ready")
        elif (parameter == 'stop'):
            print("Stopping containers...")
            check_output("docker-compose down", shell=True)
            print("Finish")
            print("Command to restart: ./deployment.sh restart")
        elif (parameter == 'destroy'):
            print("All the data will be deleted...")
            check_output("docker-compose down -v", shell=True)
            print("Finish")
        else:
            print("Incorrect usage of parameters")
            print("usage: python ./deployment.py [create|restart|stop|destroy] orion_host orion_port")

if __name__ == "__main__":
    
    init=Deployment()
    
    if(len(argv)==4):
        parameter = argv[1]
        orion_host = argv[2]
        orion_port = argv[3]
        init.options(parameter,orion_host,orion_port)
    else:
        print("Incorrect number of parameters")
        print("usage: python ./deployment.py [create|restart|stop|destroy] orion_host orion_port")


