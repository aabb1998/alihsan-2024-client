#!/bin/bash
# Stop all servers and start the server
pm2 stop Frontend
cd /home/ubuntu/frontend
pm2 delete Frontend 
pm2 start "npm run serve" --name Frontend
