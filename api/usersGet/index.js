const cosmos = require('../lib/cosmos.js')

module.exports = async function (context, req) {
  let errorStatus = 500

  try {
    // Get Cosmos DB container
    const users = await cosmos.users()

    // Built & execute the query
    const querySpec = {
      query: 'SELECT * FROM c'
    }
    const { resources: items } = await users.items
      .query(querySpec)
      .fetchAll()

    // Have the API return a 404 in the event of no results
    // Rather than a 200 and an empty array
    if (items.length <= 0) {
      errorStatus = 404
      throw new Error('No users found!')
    }

    // Simply return all results (held in resources.items array)
    context.res = {
      headers: { 'content-type': 'application/json' },
      status: 200,
      body: items
    }
  } catch (err) {
    let message = typeof err != 'string' ? (err.message ? err.message : err) : err
    context.res = {
      headers: { 'content-type': 'application/json' },
      status: errorStatus,
      body: { message, error: true }
    }
  }
}