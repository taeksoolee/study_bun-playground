console.log("Hello via Bun!");

Bun.serve({
  development: true,
  port: 4000,
  fetch(req) {
    console.log(req);

    const option: ResponseInit = {

    }

    return new Response("hi!", option);
  },
  error(error: Error) {
    return new Response(
      "Uh oh!!\n" + error.toString(), 
      { status: 500 });
  },
});