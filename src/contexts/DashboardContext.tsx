import React from "react";
import { useState } from "react";
import { createContext } from "react";

const DashboardContext = createContext<Partial<DashboardContextValues>>({
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
  return (
    <DashboardContext.Provider value={{ date, eventId, setDate, setEventId }}>
      {children}
    </DashboardContext.Provider>
  );
}
