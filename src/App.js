import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <ToastContainer autoClose={2000} />
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
