import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
// import { HelmetProvider } from "react-helmet-async";

import "./App.scss";
import { routes } from "./routes";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";
import { ConfirmationModalProvider } from "./components/ConfirmationModal";

function App() {
  return (
    // <HelmetProvider>
      <div className="App">
        <Suspense
          fallback={
            <div className="absolute z-50 w-full h-screen overflow-hidden bg-neutral-1000/50">
              <Loader />
            </div>
          }
        >
          <ToastContainer autoClose={2000} />
          <ConfirmationModalProvider>
            <RouterProvider router={routes} />
          </ConfirmationModalProvider>
        </Suspense>
      </div>
    // </HelmetProvider>
  );
}

export default App;
