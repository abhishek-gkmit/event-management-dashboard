import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const DashboardContext = createContext<Partial<DashboardContextValues>>({
  date: "",
  eventId: "",
});

export function DashboardContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [date, setDate] = useState("");
  const [eventId, setEventId] = useState("");

  function selectEvent(eventId: string | number) {
    setEventId(eventId + "");
  }
  return (
    <DashboardContext.Provider value={{ date, eventId, setDate, selectEvent }}>
      {children}
    </DashboardContext.Provider>
  );
}
