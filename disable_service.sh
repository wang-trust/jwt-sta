#!/bin/sh
echo 'disable jwt-sta.service'
systemctl disable jwt-sta.service
echo 'stop jwt-sta.service'
systemctl stop jwt-sta.service
echo 'ps jwt-sta'
ps -aux|grep jwt