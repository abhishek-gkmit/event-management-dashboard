import { useState } from "react";
import Calendar from "react-calendar";
import { EventList } from "@components/EventList";
import { DashboardContextProvider } from "@src/contexts/DashboardContext";

import "@components/Dashboard/style.css";
import "react-calendar/dist/Calendar.css";

export function Dashboard() {
  const [date, setDate] = useState<Value>(new Date());

  function onDateChange(date: Value) {
    setDate(date);
  }

  return (
    <DashboardContextProvider>
      <div className="dashboard">
        <div className="left-side">
          <Calendar
            className="calendar"
            value={date}
            onChange={(date) => onDateChange(date as Date)}
          />
          <EventList date={date as Date} />
        </div>
        <div className="right-side"></div>
      </div>
    </DashboardContextProvider>
  );
}
