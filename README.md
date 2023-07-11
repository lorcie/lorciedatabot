# Databot Application

# Table of contents
1. [Introduction](#introduction)
2. [Architecture](#architecture)
3. [Local Development](#development)
4. [Apigee Configuration](#apigee)
5. [Atlas MongoDb Configuration](#atlas-mongodb)
6. [Screenshots](#screenshots)

## Introduction <a name="introduction"></a>
Databot showcases intelligent search on **MongoDb** Atlas Database thanks to **OpenAI** Embeddings, generated on Database Triggers.
External User Requests come from **ApiGee** Google Cloud and processed with **Node JS** backend module, using these Embeddings.

The application backend Node JS module is hosted on  **Render** and associated to the ApiGee Reverse Proxy

## Architecture <a name="architecture"></a>

![databot architecture](./screenshots/databot-architecture.png)


## Local Development <a name="development"></a>

1. Only for the first time, Clone the project locally, change into the directory, install the dependencies and init environment variables :

```sh
git clone https://github.com/lorcie/lorciedatabot.git
```

- go inside local backend directory

```
cd lorciedatabot
```

- If needed install node modules / librairies as follows

```
npm install
```

- If needed, to initiliaze environment variables correctly for evaluation purpose, copy .env.eval into .env

windows>
```
copy .env.eval  .env
```

linux>
```
cp .env.eval  .env
```

2. Run local backend application

in the application directory,

- Start the backend application on local environment with following command. It will return local port 8081


```
npm run start
```

- on local browser, Run the backend application locally by browsing at following url :
http://localhost:8081/movies

- on Postman, it is also possible to test with POST method as follows :
  in body tab , select x-www-form-urlencoded and initialize *input* key parameter with query value such as : *find some movies about civil war*

## Apigee Configuration <a name="apigee"></a>

- here are instructions to provision APigee with evaluation organization on your google cloud project (to be created if necessary) : 

https://cloud.google.com/apigee/docs/api-platform/get-started/eval-orgs

I have chosen *default* options, *Automatically allocate IP range* for network, *europe-west1* for region/location (please change according to your preference) and also *external* access routing, *wildcard DNS service* option for domain setting

- here are instructions for creating an API proxy, i have chosen for simple discovery purpose  *Pass through (no authorization)*  policy security option :

https://cloud.google.com/apigee/docs/api-platform/get-started/create-proxy

- you can adapt the target endpoint url wto reach your public backend api.

- you can now deploy the API proxy and test it with curl or browser with appropriate url (see environment group to have the DNS)  :

https://cloud.google.com/apigee/docs/api-platform/get-started/test-proxy

- I had to add some preflow instructions to fix *unsupprted content "br"* issues and create some revision update to deploy

- I have exported my proxy definition from <yourproxy> develop tab (select last revision)

- ![lorciedatabot revision 4 proxy exported bundle at uri ./lorciedatabot_rev4_2023_07_11.zip](./lorciedatabot_rev4_2023_07_11.zip)


## Atlas MongoDb Configuration <a name="atlas-mongodb"></a>

TO DO


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


