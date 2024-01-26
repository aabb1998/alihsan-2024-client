import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./adminRoutes";
import { userRoutes } from "./userRoutes";

const Loader = () => (
  <div className="flex items-center justify-center h-screen mx-8 text-center">
    {/* <GlobalLoader /> */}
  </div>
);

export const routes = createBrowserRouter([...userRoutes, ...adminRoutes]);
