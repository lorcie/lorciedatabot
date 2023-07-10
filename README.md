# Databot Application

# Table of contents
1. [Introduction](#introduction)
2. [Architecture](#architecture)
3. [Screenshots](#screenshots)
4. [Resources](#resources)

## Introduction <a name="introduction"></a>
Databot showcases intelligent search on **MongoDb** Atlas Database thanks to **OpenAI** Embeddings, generated on Database Triggers.
External User Requests come from **ApiGee** Google Cloud and processed with **Node JS** backend module, using these Embeddings.

The application backend Node JS module is hosted on  **Render** and associated to the ApiGee Reverse Proxy

## Architecture <a name="architecture"></a>

![databot architecture](./screenshots/databot-architecture.png)


## Screenshots <a name="screenshots"></a>
MongoDB Atlas Database Collection>

![mongodb atlas database collection](./screenshots/databot-mongodb-atlas-database-collection.png)

MongoDB Atlas Database Trigger>

![mongodb atlas database trigger](./screenshots/databot-mongodb-atlas-database-trigger.png)

MongoDB Atlas Database Trigger Function>
![mongodb atlas database trigger function](./screenshots/databot-mongodb-atlas-database-trigger-function.png)

MongoDB Atlas Database App Service Values Secret>

![mongodb atlas database app service openAI values secret](./screenshots/databot-mongodb-atlas-database-appservice-openAI-values-secret.png)

ApiGee Google Cloud Setting>

![ApiGee Google Cloud Setting](./screenshots/databot-apigee-google-cloud-setting.png)

Postman Query Post Test >

- set header *accept-encoding* with value : application/gzip

- set some value for parameter *input*  key : example 'find movies about civil war'

- set postman query method to *post*

- then click on following post query url : https://34.149.196.13.nip.io/lorciedatabot/query

![Postman Query Post Test](./screenshots/databot-apigee-postman-query-post-test.png)


