#!/bin/bash

LOG_LOCATION=/root/logs

npm start index.js

exec >> $LOG_LOCATION/odnpublisher.log 2>&1