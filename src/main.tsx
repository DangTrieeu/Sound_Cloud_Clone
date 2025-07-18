import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersPage from "./screens/users.page.tsx";
//import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "/tracks",
    element: (
      <div>
        <h1>MANAGE TRACKS</h1>
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
