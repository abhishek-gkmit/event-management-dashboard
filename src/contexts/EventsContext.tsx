import React from "react";
import { useEffect } from "react";
import { useState, createContext } from "react";
import { cloneObject } from "@src/utils";

export const EventsContext = createContext<EventsContextValues>({
  events: [],
  addEvent: () => { },
  updateEvent: () => { },
  deleteEvent: () => { },
});

export function EventsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [events, setEvents] = useState<Array<MainEvent>>([]);

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  function addEvent(eventData: MainEvent) {
    const newEvent = {
      ...eventData,
      id: Date.now(),
      attendeeList: [],
    };

    const newEvents = cloneObject(events) as Array<MainEvent>;
    newEvents.push(newEvent);

    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
  }

  function updateEvent(eventData: MainEvent) {
    const newEvents = (cloneObject(events) as Array<MainEvent>).map((event) =>
      event.id === eventData.id ? eventData : event,
    );

    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
  }

  function deleteEvent(eventData: MainEvent | undefined) {
    if (!eventData) {
      return;
    }

    const newEvents = (cloneObject(events) as Array<MainEvent>).filter(
      ({ id }) => id !== eventData.id,
    );

    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
  }

  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  );
}
