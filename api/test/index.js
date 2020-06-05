module.exports = async function (context, req) {
  let user = {};

  // Try to decode the client-principal
  if(req.headers["x-ms-client-principal"]) {
    const header = req.headers["x-ms-client-principal"];
    const encoded = Buffer.from(header, "base64");
    const decoded = encoded.toString("ascii");
    user = JSON.parse(decoded);
  }

  // return body, method and headers + clientPrincipal if it exsists
  context.res = {
    status: 200,
    body: {
      method: req.method,
      rawHeaders: context.bindings.req.headers,
      rawBody: req.body,
      clientPrincipal: user
    }
  };
};