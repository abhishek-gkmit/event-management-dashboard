import { useContext } from "react";
import Calendar from "react-calendar";
import { EventList } from "@components/EventList";
import {
  DashboardContext,
  DashboardContextProvider,
} from "@src/contexts/DashboardContext";
import { EventInfo } from "@components/EventInfo";

import "@components/Dashboard/style.css";
import "react-calendar/dist/Calendar.css";

function DashboardWrapper() {
  const { date, setDate } = useContext(DashboardContext);

  return (
    <DashboardContextProvider>
      <div className="dashboard">
        <div className="left-side">
          <Calendar
            className="calendar"
            value={date}
            onChange={(date) => setDate && setDate(date)}
          />
          <EventList date={date as Date} />
        </div>
        <div className="right-side">
          <EventInfo />
        </div>
      </div>
    </DashboardContextProvider>
  );
}

export function Dashboard() {
  return (
    <DashboardContextProvider>
      <DashboardWrapper />
    </DashboardContextProvider>
  );
}
