import React from "react";
import { renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import { routes } from "./routes";
import "./index.css";
import Providers from "./Providers";
import ReactGA from "react-ga";

ReactGA.initialize(process.env.VITE_APP_GOOGLE_TRACKER_ID);
// ReactPixel.init(process.env.VITE_APP_FACEBOOK_PIXEL);

export async function render(request) {
  let { query, dataRoutes } = createStaticHandler(routes);
  let remixRequest = createFetchRequest(request);
  let context = await query(remixRequest);

  if (context instanceof Response) {
    throw context;
  }

  let router = createStaticRouter(dataRoutes, context);

  return renderToString(
    <Providers>
      <StaticRouterProvider
        router={router}
        context={context}
        nonce="the-nonce"
        hydrate={false}
      />
    </Providers>
  );
}

export function createFetchRequest(req) {
  let origin = `${req.protocol}://${req.get("host")}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  let url = new URL(req.originalUrl || req.url, origin);

  let controller = new AbortController();
  req.on("close", () => controller.abort());

  let headers = new Headers();

  for (let [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  let init = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url.href, init);
}
