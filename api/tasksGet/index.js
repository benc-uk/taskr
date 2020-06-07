const cosmos = require('../lib/cosmos.js')

module.exports = async function (context, req) {
  let errorStatus = 500

  if (!(req.query.owner || req.query.assignee)) {
    context.res = {
      headers: { 'content-type': 'application/json' },
      status: 400,
      body: { message: 'Please specify ?owner=<uid> or ?assignee=<uid>', error: true }
    }
    return
  }

  try {
    let userId = ''
    let query = ''
    let mode = ''
    // Query and parameters vary if we're looking for owner or assignee
    if (req.query.owner) {
      mode = 'owner'
      userId = req.query.owner
      query = 'SELECT * from c WHERE c.owner = @user'
    }
    if (req.query.assignee) {
      mode = 'assignee'
      userId = req.query.assignee
      query = 'SELECT * from c WHERE ARRAY_CONTAINS(c.assignedTo, @user)'
    }
    if (!userId || !query) { throw new Error('Something bad happened') }

    // Get Cosmos DB container
    const tasks = await cosmos.tasks()

    // Built & execute the query
    const querySpec = {
      query: query,
      parameters: [
        { name: '@user', value: userId }
      ]
    }
    const { resources: items } = await tasks.items
      .query(querySpec)
      .fetchAll()

    // Have the API return a 404 in the event of no results
    // Rather than a 200 and an empty array
    if (items.length <= 0) {
      errorStatus = 404
      throw new Error(`No tasks found where '${mode}' is '${userId}'`)
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