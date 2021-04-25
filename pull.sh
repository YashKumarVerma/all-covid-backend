#!/usr/bin/env bash
echo "Downloadgin datasets"
mkdir resources
wget -O resources/dataset.xlsx http://covid-resource-hub.surge.sh/dataset.xlsx
cp -r resources dist
