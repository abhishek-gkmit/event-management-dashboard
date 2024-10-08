import { useState, useEffect } from "react";
import { cloneObject } from "@src/utils";

export function useEvents() {
  const [events, setEvents] = useState<Array<MainEvent>>([]);

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  return { events, addEvent, updateEvent, deleteEvent };

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
}
