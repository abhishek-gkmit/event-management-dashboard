import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddEvent } from "@components/AddEvent/AddEvent";
import { EditEvent } from "@components/EditEvent/EditEvent";
import { Dashboard } from "@components/Dashboard/Dashboard";
import { Layout } from "@components/Layout";

import "@src/App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/event",
        children: [
          {
            path: "/event/add",
            element: <AddEvent />,
          },
          {
            path: "/event/edit/:id",
            element: <EditEvent />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div id="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
