# odn-publisher

## __Prerequisites__
________

SSL disabled

Origintrail V6 Beta 1 node installed

## __Installation__
__________

### __Initial setup:__
```
sudo git clone https://github.com/zeroxbt/odn-publisher.git && cd odn-publisher && mkdir datasets && sudo npm i
```
Next, __API keys__ are required and they need to be put in the .env file

```
cp .env-example .env
```
```
nano .env
```
### __API Keys:__
**Google API Key**  
1. Log in to your Google account
2. https://console.developers.google.com/apis/credentials
3. Click on **+ Create Credentials** and select **API Key**
4. Copy the **API KEY** to the .env file
5. If Google KG search requests fails with 403 even after API key is created and specified, then it's possible Google KG search is disabled. If this is the case, enable Google KG API search here - https://console.developers.google.com/apis/api/kgsearch.googleapis.com/

**Europeana API Key**  
https://pro.europeana.eu/page/get-api

**Digital Public Library of America (DPLA)**  
Replace <put_your_email_here> by your email address
```
curl -v -XPOST https://api.dp.la/v2/api_key/<put_your_email_here>
```
### __Publishing:__

You can run the following command to start publishing datasets right away, but if you want to run it as a background process, skip the following command
```
npm start
```
To run the odn-publisher as a background service, 
```
cp odnpublisher.service /etc/systemd/system
```
```
systemctl daemon-reload
```
```
systemctl start odnpublisher
```
To view the status of the service,
```
systemctl status odnpublisher
```
To enable the service at reboot,
```
systemctl enable odnpublisher
```
To view the logs of the publisher,
```
journalctl -f -u odnpublisher

```### __Searching:__
You can enable searching of the the dataset after publishing in .env
