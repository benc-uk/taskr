const cosmos = require('../lib/cosmos.js')

module.exports = async function (context, req) {
  let errorStatus = 500
  try {
    let user = {}
    // Decode the base64 user details from the special client-principal header
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

    // Copy `userId` into `id` (the id used by Cosmos)
    // Otherwise we'd create duplicate users with different ids
    user.id = user.userId

    // Create/update user in Cosmos
    await users.items.upsert(user)

    // Redirect back to root
    context.res = {
      headers: { 'location': '/' },
      status: 302,
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