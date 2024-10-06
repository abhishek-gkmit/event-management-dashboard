import { Link, useNavigate } from "react-router-dom";
import { useEvents } from "@hooks/useEvents";

import "@components/EventList/style.css";
import { useMemo } from "react";

function MainEventComponent({ id, title, datetime, attendees }: MainEvent) {
  return (
    <tr key={id} className="event-table-row">
      <td className="event-title">{title}</td>
      <td className="event-time">{datetime.split("T")[0]}</td>
      <td className="event-date">{datetime.split("T")[1]}</td>
      <td className="event-attendees">{attendees}</td>
      <td className="event-edit-btn">
        <Link to={`/event/edit/${id}`}> Edit</Link>
      </td>
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

  const navigate = useNavigate();

  const filteredEvents = useMemo(() => {
    const eventsToRendner = filterEvents(events, date);
    if (eventsToRendner.length < 1) {
      return (
        <tr>
          <td
            colSpan={5}
          >{`There are no events on ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</td>
        </tr>
      );
    }

    return eventsToRendner.map((event) => <MainEventComponent {...event} />);
  }, [events, date]);

  return (
    <div className="event-list">
      <h1>Event List</h1>
      <table className="event-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Time</th>
            <th>Max attendees</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{filteredEvents}</tbody>
      </table>
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
