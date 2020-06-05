module.exports = async function (context, req) {
  context.log(JSON.stringify(context.bindings.req.headers));

  let user = {};
  //req.headers["x-ms-client-principal"] = "eyJpZGVudGl0eVByb3ZpZGVyIjoiYWFkIiwidXNlcklkIjoiNTM2MzdlODgyZGMzNDc5NGFjYTk4NjRlMDI2YWNkMmEiLCJ1c2VyRGV0YWlscyI6ImJlY29sZW1AbWljcm9zb2Z0LmNvbSIsInVzZXJSb2xlcyI6WyJhbm9ueW1vdXMiLCJhdXRoZW50aWNhdGVkIl19";
  if(req.headers["x-ms-client-principal"]) {
    const header = req.headers["x-ms-client-principal"];
    const encoded = Buffer.from(header, "base64");
    const decoded = encoded.toString("ascii");
    user = JSON.parse(decoded);
  }

  context.res = {
    status: 200,
    body: {
      rawHeaders: context.bindings.req.headers,
      clientPrincipal: user
    }
  };
};