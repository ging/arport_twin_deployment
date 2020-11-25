#!/usr/bin/env python
# coding: utf-8

# In[41]:
import os, requests,json, time
import logging

class RunDraco():

    def get_template_info(self, draco_endpoint, template_name):
        print("Get Templates")
        DRACO_ENDPOINT = "http://" + draco_endpoint + "/nifi-api/flow/templates"
        r = requests.get(url = DRACO_ENDPOINT) 
        response = json.loads(r.text)
        logging.info("Response:%s "%response)
        group_id=""
        template_id=""
        for templates in response["templates"]:
             if templates["template"]["name"]==template_name:
                group_id=templates["template"]["groupId"]
                template_id=templates["template"]["id"]
        print(group_id)   
        print(template_id)  
        r = requests.get(url = DRACO_ENDPOINT) 
        return [group_id,template_id]
    
    def put_template(self, draco_endpoint,group_id,template_id,pos_x,pos_y):
        print("Template Init")
        DRACO_ENDPOINT = "http://" + draco_endpoint + "/nifi-api/process-groups/"+group_id+"/template-instance"
        headers = {'content-type': 'application/json'}
        data = {"originX": pos_x,
                "originY": pos_y,
                "templateId":template_id
               }
        r = requests.post(url = DRACO_ENDPOINT, json=data ,headers=headers) 
        response = json.loads(r.text)
        print("Response:%s "%response)
    
    def get_processors_id(self, draco_endpoint,group_id):
        print("Get Processors id")
        DRACO_ENDPOINT = "http://" + draco_endpoint + "/nifi-api/process-groups/"+group_id+"/processors"
        r = requests.get(url = DRACO_ENDPOINT) 
        processors_id=[]
        response = json.loads(r.text)
        for processor in response["processors"]:
            processors_id.append(processor["component"]["id"])
        return processors_id

    def run_processors(self,draco_endpoint,list_processors):
        print("Run Processors")
        headers = {'content-type': 'application/json'}
        for processor in list_processors:
            DRACO_ENDPOINT = "http://" + draco_endpoint + "/nifi-api/processors/"+processor+"/run-status"
            
            data = {
                "revision": {
                    "clientId": "8bb725ef-0158-1000-478b-da5903184809",
                        "version": 0
                },
                "state": "RUNNING"
            }
            r = requests.put(url = DRACO_ENDPOINT, json=data ,headers=headers) 
            response = r.status_code
            print("Response:%s "%response)

    def update_procesor(self,draco_endpoint,list_processors, component_name, json_properties):
        print("Update InvokeHTTP Processor for Chroma API")
        headers = {'content-type': 'application/json'}
        for processor in list_processors:
            DRACO_ENDPOINT = "http://" + draco_endpoint + "/nifi-api/processors/"+processor
            
            r = requests.get(url = DRACO_ENDPOINT,headers=headers) 
            response = json.loads(r.text)
            print("Response:%s "%response)
            if response["component"]["name"] == component_name:
                data = {
                   "revision":{
                      "clientId":"8bb725ef-0158-1000-478b-da5903184809",
                      "version":response["revision"]["version"]
                   },
                   "component":{
                      "id":response["component"]["id"],
                      "config":json_properties
                   }
                }   
                r = requests.put(url = DRACO_ENDPOINT, json=data, headers=headers)
                response_up = json.loads(r.text)
                print("Response:%s "%response_up)
            
if __name__ == "__main__":
    
    from sys import argv
    draco_endpoint = os.environ['DRACO_ENDPOINT']
    if draco_endpoint=="":
        draco_endpoint = "draco:9090"
    init=RunDraco()


    json_mongo_properties={
                           "properties":{
                                            "Mongo URI":"mongodb://root:example@mongo:27017",
                                            "attr-persistence":"column"
                                        }
                        }

    json_tcp_properties={
                         "properties":{
                            "Hostname":os.environ['FIREHOSE_HOSTNAME'],
                            "Port":os.environ['FIREHOSE_PORT'],
                            "generate-custom-text":os.environ['FIREHOSE_CREDENTIALS']
                         }
                      }

    json_invoke_properties={
                         "properties":{
                            "Remote URL":os.environ['CHROMA_REMOTE_URL'],
                            "password":os.environ['CHROMA_REMOTE_PASSWORD'],
                            "token":os.environ['CHROMA_TOKEN'],
                            "username":os.environ['CHROMA_REMOTE_USERNAME']
                         }
                      }



    print("Initializing Orion Connection to MongoDB ... ")
    template_info=init.get_template_info(draco_endpoint,'ORION-TO-MONGO')
    group_id=template_info[0]
    init.put_template(draco_endpoint,group_id,template_info[1],2500.0,900.0)
    processors_id=init.get_processors_id(draco_endpoint,group_id)
    init.update_procesor(draco_endpoint,processors_id, 'NGSIToMongo',json_mongo_properties)
    init.run_processors(draco_endpoint,processors_id )
    
    print("Initializing Firehose Connection... ")
    template_info=init.get_template_info(draco_endpoint,'Firehose-NGSI-Orion')
    group_id=template_info[0]
    init.put_template(draco_endpoint,group_id,template_info[1],5.0,0.0)
    processors_id=init.get_processors_id(draco_endpoint,group_id)
    init.update_procesor(draco_endpoint,processors_id, 'TCPClient',json_tcp_properties)
    init.run_processors(draco_endpoint,processors_id ) 
    
    print("Initializing Chroma Connection... ")
    template_info=init.get_template_info(draco_endpoint,'Chroma-NGSI-Orion')
    group_id=template_info[0]
    init.put_template(draco_endpoint,group_id,template_info[1],1500.0,0.0)
    processors_id=init.get_processors_id(draco_endpoint,group_id)
    init.update_procesor(draco_endpoint,processors_id, 'InvokeHTTP-Input',json_invoke_properties)
    init.run_processors(draco_endpoint,processors_id ) 