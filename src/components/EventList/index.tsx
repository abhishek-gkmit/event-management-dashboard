import { Link, useNavigate } from "react-router-dom";
import { useEvents } from "@hooks/useEvents";

import "@components/EventList/style.css";

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

export function EventList() {
  const { events } = useEvents();

  const navigate = useNavigate();

  return (
    <div className="event-list">
      <h1>Event List</h1>
      <table className="event-table">
        <thead>
          <th>Title</th>
          <th>Date</th>
          <th>Time</th>
          <th>Max attendees</th>
          <th></th>
        </thead>
        <tbody>
          {events.map((event) => (
            <MainEventComponent {...event} />
          ))}
        </tbody>
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
