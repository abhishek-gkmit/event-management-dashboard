import { useMemo, useContext } from "react";
import { useEvents } from "@src/hooks/useEvents";
import { DashboardContext } from "@src/contexts/DashboardContext";
import { AttendeeList } from "@components/AttendeeList";

import "@components/EventInfo/style.css";

export function EventInfo() {
  const { events } = useEvents();
  const { eventId } = useContext(DashboardContext);

  const event = useMemo(
    () => events.find(({ id }) => eventId && +eventId === id) as MainEvent,
    [eventId, events],
  );

  if (!event) {
    return (
      <h2>{`Please select an event from event list to see it's information`}</h2>
    );
  }

  return (
    <div className="event-info">
      <h3 className="event-title">{event.title}</h3>
      <p className="event-desc">{event.description}</p>
      <p className="event-datetime">
        <span className="datetime-emoji">🗓️</span>{" "}
        {event.datetime.split("T")[0]},{" "}
        <span className="datetime-emoji">🕒</span>{" "}
        {event.datetime.split("T")[1]}
      </p>
      <p className="event-location">Location: {event.location}</p>
      <p className="event-attendees">Max Attendees: {event.attendees}</p>
      <AttendeeList eventId={eventId ? +eventId : 0} />
    </div>
  );
}
