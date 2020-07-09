const cosmos = require('../lib/cosmos.js')

module.exports = async function (context, req) {
  let errorStatus = 500

  if (!req.params.id && !(req.query.owner || req.query.assignee)) {
    context.res = {
      headers: { 'content-type': 'application/json' },
      status: 400,
      body: { message: 'Please specify id on path `/{taskid}` or ?owner=<userid> or ?assignee=<userid>', error: true }
    }
    return
  }

  try {
    let paramValue = ''
    let query = ''
    // Query and parameters vary if we're looking for owner or assignee
    if (req.query.owner) {
      paramValue = req.query.owner
      query = 'SELECT * from c WHERE c.owner = @param'
    }
    if (req.query.assignee) {
      paramValue = req.query.assignee
      query = 'SELECT * from c WHERE ARRAY_CONTAINS(c.assignedTo, @param)'
    }
    // Other option is to get a single task by id
    if (req.params.id) {
      paramValue = req.params.id
      query = 'SELECT * from c WHERE c.id = @param'
    }
    if (!paramValue || !query) { throw new Error('Malformed request') }

    // Get Cosmos DB container
    const tasks = await cosmos.tasks()

    // Built & execute the query
    const querySpec = {
      query: query,
      parameters: [
        { name: '@param', value: paramValue }
      ]
    }
    const { resources: items } = await tasks.items
      .query(querySpec)
      .fetchAll()

    // Simply return all results (held in resources.items array) or first result if by id
    context.res = {
      headers: { 'content-type': 'application/json' },
      status: 200,
      body: req.params.id ? items[0] : items
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