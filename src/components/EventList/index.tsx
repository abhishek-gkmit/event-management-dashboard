import { useNavigate } from "react-router-dom";
import { useMemo, useContext } from "react";
import { useEvents } from "@hooks/useEvents";
import { DashboardContext } from "@src/contexts/DashboardContext";

import "@components/EventList/style.css";
import { useEffect } from "react";

function MainEventComponent({ id, title, datetime, attendees }: MainEvent) {
  const { eventId, selectEvent } = useContext(DashboardContext);

  return (
    // `+` is used to convert string into number
    <tr
      key={id}
      className={
        "event-table-row" +
        (eventId && +eventId === id ? " selected-event-row" : "")
      }
      onClick={() => selectEvent && selectEvent(id)}
    >
      <td className="event-title">{title}</td>
      <td className="event-time">{datetime.split("T")[0]}</td>
      <td className="event-date">{datetime.split("T")[1]}</td>
      <td className="event-attendees">{attendees}</td>
    </tr>
  );
}

function filterEvents(events: MainEvent[], date: Date): MainEvent[] {
  const filteredEvents = events.filter(({ datetime }) => {
    // + is used here to convert the date objects into number(miliseconds) to compare them
    return (
      +new Date(datetime.split("T")[0] + "T00:00") ===
      +new Date(date.getFullYear(), date.getMonth(), date.getDate())
    );
  });

  return filteredEvents;
}

export function EventList({ date }: EventListProps) {
  const { events } = useEvents();
  const { eventId, selectEvent } = useContext(DashboardContext);

  const navigate = useNavigate();

  const eventTable = useMemo(() => {
    const filteredEvents = filterEvents(events, date);
    if (filteredEvents.length < 1) {
      return (
        <p>{`There are no events on ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</p>
      );
    }

    const eventsToRender = filteredEvents.map((event) => (
      <MainEventComponent {...event} />
    ));

    return (
      <table className="event-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Time</th>
            <th>Max attendees</th>
          </tr>
        </thead>
        <tbody>{eventsToRender}</tbody>
      </table>
    );
  }, [events, date]);

  useEffect(() => {
    console.log(events[0]?.id);
    if (!eventId && selectEvent && events && events.length > 1) {
      selectEvent(events[0]["id"]);
    }
  }, []);

  return (
    <div className="event-list">
      {eventTable}
      <button
        type="button"
        className="event-add-btn"
        onClick={() => navigate("/event/add")}
      >
        Add Event
      </button>
    </div>
  );
}
