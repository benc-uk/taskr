#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
source $DIR/vars.sh

# Preamble
echo -e "\n\e[34m╔══════════════════════════════════╗"
echo -e "║\e[32m              Taskr        \e[34m       ║"
echo -e "║\e[33m         Deploy Cosmos DB \e[34m        ║"
echo -e "╚══════════════════════════════════╝"
echo -e "\e[35mAlpha   \e[39mv0.0.1"

# Cosmos account
echo -e "\e[34m»»» 🚀 \e[32mCreating Cosmos DB account..."
echo -e "\e[34m»»» ⏱  \e[32mThis can take a long time\e[0m..."
az cosmosdb create --resource-group $RESOURCE_GROUP --name "${PREFIX}taskr" --kind GlobalDocumentDB --locations regionName=$REGION failoverPriority=0 isZoneRedundant=False -o table --query "{state: provisioningState, endpoint: documentEndpoint}"

# Database
echo -e "\n\e[34m»»» ✨ \e[32mCreating database 'taskrdb'\e[0m..."
az cosmosdb sql database create --resource-group $RESOURCE_GROUP --account-name "${PREFIX}taskr" --name taskrdb --throughput 400 -o table

