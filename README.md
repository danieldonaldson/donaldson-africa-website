# Instructions

1. npm install
2. gulp build (ensure gulp is installed globally via npm install -g gulp)
3. zip dist directory, such that the zip contains a /dist/ dir
4. scp copy to server

Complete the following on the server:
## Unzip dist.zip in your home directory
unzip ~/dist.zip

## Copy dist/ to /var/www/
sudo cp -r dist/ /var/www/

# Copy permissions from html/ to the new files in /var/www/
sudo cp -rp /var/www/html/* /var/www/dist/

# Delete the old html directory
sudo rm -r /var/www/html

# Rename dist/ to html/
sudo mv /var/www/dist /var/www/html

# Delete the old .zip file
rm ~/dist.zip

# Remove the unzipped dir
rm -R ~/dist