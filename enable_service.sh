#!/bin/sh
echo 'cp jwt-sta.service'
cp /home/admin/wang/localhub/jwt/jwt-sta.service /etc/systemd/system/
echo 'chmod jwt-sta.service'
chmod 777 /etc/systemd/system/jwt-sta.service
echo 'daemon-reload'
systemctl daemon-reload
echo 'enable jwt-sta.service'
systemctl enable jwt-sta.service
echo 'start jwt-sta.service'
systemctl start jwt-sta.service
echo 'jwt-sta.service status'
systemctl status jwt-sta.service
echo 'ps jwt-sta'
ps -aux|grep jwt-sta