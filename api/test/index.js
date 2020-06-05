module.exports = async function (context, req) {
  context.log(JSON.stringify(context.bindings.req.headers));

  const header = req.headers["x-ms-client-principal"];
  const encoded = Buffer.from(header, "base64");
  const decoded = encoded.toString("ascii");

  context.res = {
    status: 200,
    body: {
      rawHeaders: context.bindings.req.headers,
      clientPrincipal: JSON.parse(decoded)
    }
  };
};