DRACO_WEB_PORT=$1
echo "Waiting for Draco to start processors"
petition=$(curl -f -s http://draco:$DRACO_WEB_PORT/nifi-api/system-diagnostics || exit 1) 
exit_status=$?
while [ ${exit_status} -ne 0 ]
do
    sleep 5
    petition=$(curl -f -s http://draco:$DRACO_WEB_PORT/nifi-api/system-diagnostics || exit 1) 
    exit_status=$?
done
echo "Draco is ready"

