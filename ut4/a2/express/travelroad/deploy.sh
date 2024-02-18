#!/bin/bash
git add .
git commit -m "Cambios en express mediante deploy"
git push
ssh kelpy@172.205.248.47 "
  cd /usr/share/nginx/dpl_kelpy/ut4/a2/express/travelroad
  git pull
  npm install
  pm2 restart travelroad --update-env
"
