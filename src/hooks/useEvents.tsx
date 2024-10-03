import { useState, useEffect } from "react";
import { cloneObject } from "../utils";

export function useEvents() {
  const [events, setEvents] = useState<Array<MEvent>>([]);

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  return { events, addEvent, updateEvent, deleteEvent };

  function addEvent(eventData: MEvent) {
    const newEvent = {
      ...eventData,
      id: Date.now(),
    };
    const newEvents = cloneObject(events) as Array<MEvent>;
    newEvents.push(newEvent);

    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
  }

  function updateEvent(eventData: MEvent) { }

  function deleteEvent(eventData: MEvent) { }
}
