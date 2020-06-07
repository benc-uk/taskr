const cosmos = require('../lib/cosmos.js')

module.exports = async function (context, req) {
  let errorStatus = 500
  try {
    let user = {}
    // Get the user from the special client-principal header
    if (req.headers['x-ms-client-principal']) {
      const encoded = Buffer.from(req.headers['x-ms-client-principal'], 'base64')
      user = JSON.parse(encoded.toString('ascii'))
    } else {
      context.res = {
        headers: { 'content-type': 'application/json' },
        status: 401,
        body: { message: 'Not authorized', error: true }
      }
      return
    }

    // Get Cosmos DB container
    const users = await cosmos.users()

    // Create/update user in Cosmos
    user.id = user.userId
    const newItem = await users.items.upsert(user)

    context.res = {
      headers: { 'content-type': 'application/json' },
      status: newItem.statusCode,
      body: newItem.resource
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