#!/bin/bash
git add .
git commit -m "Se realizan cambios mediante deploy.sh de Laravel"
git push
ssh kelpy@172.205.248.47 "
  cd /usr/share/nginx/dpl_kelpy
  git pull
  cd ut4/a2/laravel/travelroad
  composer install
  sudo systemctl reload nginx
"
