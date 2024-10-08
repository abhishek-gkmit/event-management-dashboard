import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddEvent } from "@components/AddEvent";
import { EditEvent } from "@components/EditEvent";
import { Layout } from "@components/Layout";
import { AddAttendee } from "@components/AddAttendee";
import { EditAttendee } from "@components/EditAttendee";
import { Dashboard } from "@components/Dashboard";
import { Settings } from "@components/Settings";

import "@src/App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <Dashboard />,
        index: true,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/select/:id",
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
      {
        path: "/attendee",
        children: [
          {
            path: "/attendee/add/:eventId",
            element: <AddAttendee />,
          },
          {
            path: "/attendee/edit/:eventId/:attendeeId",
            element: <EditAttendee />,
          },
        ],
      },
      {
        path: "/settings",
        element: <Settings />,
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
