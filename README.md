# arport_twin_deployment
1. **Complete the .env**: copy the .env.template to .env and set up all the environment variables

1. **Start the project** using the deployment.sh script.

```shell
# Start containers and create subscriptions
./deployment.sh create

# Stop containers
./deployment.sh stop

# Restart containers
./deployment.sh restart

# Stop containers and delete volumes
./deployment.sh destroy
```
