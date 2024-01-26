import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import "./App.scss";
import { routes } from "./routes";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";

function App() {
  return (
    <div className="App">


      <Suspense fallback={<div className="absolute z-50 w-full h-screen overflow-hidden bg-neutral-1000/50">
        <Loader />
      </div>}>
        <ToastContainer autoClose={2000} />
        <RouterProvider router={routes} />
      </Suspense>
    </div>
  );
}

export default App;
