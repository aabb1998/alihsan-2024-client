import React, { Suspense } from "react";
import { hydrateRoot } from "react-dom/client";
import {
  createBrowserRouter,
  matchRoutes,
  RouterProvider,
} from "react-router-dom";
import { routes } from "./routes";
import './index.css'
import Providers from "./Providers";
import ReactGA from "react-ga";

ReactGA.initialize(import.meta.env.VITE_APP_GOOGLE_TRACKER_ID);

hydrate();

async function hydrate() {
  // Determine if any of the initial routes are lazy
  let lazyMatches = matchRoutes(routes, window.location)?.filter(
    (m) => m.route.lazy
  );

  // Load the lazy matches and update the routes before creating your router
  // so we can hydrate the SSR-rendered content synchronously
  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        let routeModule = await m.route.lazy();
        Object.assign(m.route, { ...routeModule, lazy: undefined });
      })
    );
  }

  let router = createBrowserRouter(routes);

  hydrateRoot(
    document.getElementById("root"),
			<Providers>
				<RouterProvider
					router={router}
					fallbackElement={null}
				/>
			</Providers>
  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
