const CosmosClient = require('@azure/cosmos').CosmosClient

const COSMOS_ENDPOINT = process.env.COSMOS_ENDPOINT
const COSMOS_KEY = process.env.COSMOS_KEY
const COSMOS_DB_NAME = 'taskrdb'
const COSMOS_TASKS_CONTAINER = 'tasks'
const COSMOS_USERS_CONTAINER = 'users'

// static-ish shared Cosmos connection
const client = new CosmosClient({ endpoint: COSMOS_ENDPOINT, key: COSMOS_KEY })
const database = client.database(COSMOS_DB_NAME)

module.exports = {
  // Get or create the tasks container
  async tasks() {
    const { container } = await database.containers.createIfNotExists({
      id: COSMOS_TASKS_CONTAINER,
      partitionKey: {
        paths: ['/id']
      }
    })
    return container
  },

  // Get or create the users container
  async users() {
    const { container } = await database.containers.createIfNotExists({
      id: COSMOS_USERS_CONTAINER,
      partitionKey: {
        paths: ['/id']
      }
    })
    return container
  }
}