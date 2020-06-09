const cosmos = require('../lib/cosmos.js')

module.exports = async function (context, req) {
  let errorStatus = 500
  try {
    // Get Cosmos DB container
    const tasks = await cosmos.tasks()

    // Delete
    let resp = await tasks.item(req.params.id, req.params.id).delete()

    context.res = {
      headers: { 'content-type': 'application/json' },
      status: resp.statusCode,
      body: resp.resource
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