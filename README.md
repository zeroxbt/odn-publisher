# odn-publisher

Currently, SSL needs to be disabled to use this script.

Running Origintrail V6 Beta 1 testnode required.

Install: sudo git clone https://github.com/zeroxbt/odn-publisher.git && cd odn-publisher && sudo npm i

Run: npm start

**API keys.**  
Several API keys are required, all of them needs to be specified in **.env** file.

**Google API Key**  
How to create one? https://developers.google.com/knowledge-graph/how-tos/authorizing  
If Google KG search requests fails with 403 even after API key is created and specified, then it's possible Google KG search is disabled.  
If this is the case, enable Google KG API search here - https://console.developers.google.com/apis/api/kgsearch.googleapis.com/

**Europeana API Key**  
Get one here - https://pro.europeana.eu/page/get-api

**DPLA(digital public library of america)**  
To get one run this - curl -v -XPOST https://api.dp.la/v2/api_key/<put_your_email_here>
