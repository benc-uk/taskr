module.exports = async function (context, req) {
  context.log(JSON.stringify(context.bindings.req.headers));

  context.res = {
    status: 200,
    body: context.bindings.req.headers
  };
};