import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddEvent } from "@components/AddEvent";
import { EditEvent } from "@components/EditEvent";
import { Layout } from "@components/Layout";
import { AddAttendee } from "@components/AddAttendee";
import { EditAttendee } from "@components/EditAttendee";
import { Dashboard } from "@components/Dashboard";

import "@src/App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        index: true,
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
