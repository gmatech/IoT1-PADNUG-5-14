#!/bin/bash

NODE=/usr/local/bin/node
SERVER_JS_FILE=/home/apps/app.js
USER=pi
OUT=/home/apps/logs/app.log

case "$1" in

start)
	echo "starting node: $NODE $SERVER_JS_FILE"
	sudo -u $USER $NODE $SERVER_JS_FILE > $OUT 2>$OUT &
	;;

stop)
	pkill -f "$NODE $SERVER_JS_FILE"
	;;

*)
	echo "usage: $0 (start|stop)"
esac

exit 0
