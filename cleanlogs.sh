#!/bin/bash

echo "forever cleanlogs"
forever cleanlogs

echo "rm -r /var/log/journal/*"
rm -r /var/log/journal/*

echo "rm ~/ot-node/out.log"
rm ~/ot-node/out.log

echo "rm -rf ~/ot-node/logs/"
rm -rf ~/ot-node/logs/