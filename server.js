import hapi from "@hapi/hapi";
import { routes } from "./route/routes.js";

const init = async () => {
  const server = hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`App listening port ${server.info.uri}`);
};

init();
