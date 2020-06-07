const cosmos = require('../lib/cosmos.js')
const Ajv = require('ajv')

module.exports = async function (context, req) {
  let errorStatus = 500
  try {
    // Get Cosmos DB container
    const users = await cosmos.users()

    let user = req.body

    // Validate task against schema
    let ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
    const schema = require('../../etc/user.json')
    let validate = ajv.compile(schema)
    let valid = validate(user)
    if (!valid) {
      errorStatus = 400
      throw validate.errors
    }

    // Create document in Cosmos
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