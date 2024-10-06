import React from "react";
import { useEffect } from "react";
import { useState, createContext } from "react";
import { useParams } from "react-router-dom";

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

  const { id: eventIdParam } = useParams();

  function selectEvent(eventId: string | number) {
    setEventId(eventId + "");
  }

  useEffect(() => {
    eventIdParam && setEventId(eventIdParam);
  }, []);

  return (
    <DashboardContext.Provider value={{ date, eventId, setDate, selectEvent }}>
      {children}
    </DashboardContext.Provider>
  );
}
