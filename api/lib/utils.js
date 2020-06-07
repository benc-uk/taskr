//
// Simple random ID generator, good enough, with len=6 it's a 1:56 billion chance of a clash
//
function makeId(len) {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < len; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }

  return text
}

module.exports = {
  makeId
}