import { useEvents } from "@src/hooks/useEvents";
import React from "react";
import { useEffect } from "react";
import { useState, createContext } from "react";
import { useParams } from "react-router-dom";

export const DashboardContext = createContext<DashboardContextValues>({
  date: new Date(),
  eventId: "",
  setDate: () => { },
  selectEvent: () => { },
  events: [],
  addEvent: () => { },
  updateEvent: () => { },
  deleteEvent: () => { },
});

export function DashboardContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [date, setDate] = useState(new Date());
  const [eventId, setEventId] = useState("");
  const { events, deleteEvent, updateEvent, addEvent } = useEvents();

  const { id: eventIdParam } = useParams();

  function selectEvent(eventId: string | number) {
    setEventId(eventId + "");
  }

  useEffect(() => {
    eventIdParam && setEventId(eventIdParam);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        date,
        eventId,
        setDate,
        selectEvent,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
