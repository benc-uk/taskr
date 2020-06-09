const utils = require('../lib/utils.js')
const cosmos = require('../lib/cosmos.js')
const Ajv = require('ajv')

module.exports = async function (context, req) {
  let errorStatus = 500
  try {
    if (!req.body || !req.body.id) {
      errorStatus = 400
      throw new Error('Task id not provided in JSON body')
    }
    // Get Cosmos DB container
    const tasks = await cosmos.tasks()

    let { resource: task } = await tasks.item(req.body.id, req.body.id).read()
    if (!task) {
      errorStatus = 404
      throw new Error(`Task '${req.body.id}' not found`)
    }

    // Merge request properties with stored data & update mod date
    Object.assign(task, req.body)
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

    // Replace item
    const resp = await tasks.item(req.body.id, req.body.id).replace(task)

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