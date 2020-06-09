const utils = require('../lib/utils.js')
const cosmos = require('../lib/cosmos.js')
const Ajv = require('ajv')

module.exports = async function (context, req) {
  let errorStatus = 500
  try {
    // Get Cosmos DB container
    const tasks = await cosmos.tasks()

    let task = req.body

    // Logic for handling defaults
    if (!task.id) {
      task.id = utils.makeId(5)
    } else {
      errorStatus = 400
      throw new Error('Must not provide id on POST operations')
    }
    if (!task.complete) {
      task.complete = false
    }
    if (!task.priority) {
      task.priority = 3
    }
    if (!task.owner) {
      // Get the owner from the special client-principal header
      if (req.headers['x-ms-client-principal']) {
        const encoded = Buffer.from(req.headers['x-ms-client-principal'], 'base64')
        const principal = encoded.toString('ascii')
        task.owner = JSON.parse(principal.userId)
      }
    }
    if (!task.assignedTo) {
      task.assignedTo = [task.owner]
    }
    task.modifiedDate = new Date().toISOString()

    // Validate task against schema
    let ajv = new Ajv()
    const schema = require('../../etc/task.json')
    let validate = ajv.compile(schema)
    let valid = validate(task)
    if (!valid) {
      errorStatus = 400
      throw validate.errors
    }

    // Create document in Cosmos
    const newItem = await tasks.items.create(task)

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