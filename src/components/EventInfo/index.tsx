import { useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "@src/hooks/useEvents";
import { DashboardContext } from "@src/contexts/DashboardContext";
import { AttendeeList } from "@components/AttendeeList";
import { formatDate, formatTime } from "@src/utils";

import "@components/EventInfo/style.css";

export function EventInfo() {
  const { events, deleteEvent } = useEvents();
  const { eventId } = useContext(DashboardContext);

  const navigate = useNavigate();

  const event = useMemo(
    () => events.find(({ id }) => eventId && +eventId === id) as MainEvent,
    [eventId, events],
  );

  if (!event) {
    return (
      <h2>{`Please select an event from event list to see it's information`}</h2>
    );
  }

  function deleteEventWrapper(event: MainEvent) {
    deleteEvent(event);
    navigate(0);
  }

  return (
    <div className="event-info">
      <h2 className="event-title">{event.title}</h2>
      <p className="event-desc">{event.description}</p>
      <p className="event-datetime">
        <span className="datetime-emoji" title="Event date">
          🗓️
        </span>{" "}
        {formatDate(event.datetime.split("T")[0])},{" "}
        <span className="datetime-emoji" title="Event time">
          🕒
        </span>{" "}
        {formatTime(event.datetime.split("T")[1])}
      </p>
      <p className="event-location">
        <span className="datetime-emoji" title="Event location">
          🧭
        </span>{" "}
        {event.location}
      </p>
      <p className="event-attendees">
        <span className="datetime-emoji" title="Number of Attendees">
          🙍
        </span>{" "}
        {event.attendees}
      </p>
      <div className="btn-container">
        <button
          className="button-15"
          type="button"
          onClick={() => navigate(`/event/edit/${event.id}`)}
        >
          Edit Event
        </button>
        <button
          className="button-15"
          type="button"
          onClick={() => deleteEventWrapper(event)}
        >
          Delete Event
        </button>
      </div>
      <AttendeeList eventId={eventId ? +eventId : 0} />
    </div>
  );
}
