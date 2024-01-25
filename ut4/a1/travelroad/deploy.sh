#!/bin/bash
git add .
git commit -m "Se añaden nuevos cambios"
git push
ssh kelpy@172.205.248.47 "
cd /usr/share/nginx/dpl_kelpy/
git pull
cd ut4/a1/travelroad/
composer install
sudo systemctl reload 
"
