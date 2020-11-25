
echo "Waiting for Draco to start processors"
petition=$(curl -f -s http://draco:9090/nifi-api/system-diagnostics || exit 1) 
exit_status=$?
while [ ${exit_status} -ne 0 ]
do
    sleep 5
    petition=$(curl -f -s http://draco:9090/nifi-api/system-diagnostics || exit 1) 
    exit_status=$?
done
echo "Draco is ready"

