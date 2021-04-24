mkdir temp
mv ~/Downloads/COVID\ 19\ RESOURCE\ DATASET.xlsx temp/dataset.xlsx
cd temp
file-preview-page
surge --project ./ --domain covid-resource-hub.surge.sh
cd ..
rm -rf temp
