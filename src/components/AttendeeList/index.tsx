import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useEvents } from "@hooks/useEvents";

import "@components/AttendeeList/style.css";

function Attendee({ id, name, email, event, deleteAttendee }: AttendeeProps) {
  const navigate = useNavigate();

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>
        <button
          type="button"
          onClick={() => navigate(`/attendee/edit/${event.id}/${id}`)}
        >
          Update
        </button>
      </td>
      <td>
        <button type="button" onClick={() => id && deleteAttendee(id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export function AttendeeList({ eventId }: AttendeeListProps) {
  const { events, updateEvent } = useEvents();

  const navigate = useNavigate();

  const event = useMemo(
    () => events.find(({ id }) => id === +eventId),
    [events, eventId],
  );

  if (!event) {
    navigate(`/error/event-with-${eventId}-not-found`);
    return;
  }

  return (
    <div className="attendee-list">
      <table className="attendee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {event &&
            event.attendeeList?.map((attendee) => (
              <Attendee
                {...attendee}
                event={event}
                deleteAttendee={deleteAttendee}
              />
            ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={() => navigate(`/attendee/add/${event.id}`)}
      >
        Add Attendee
      </button>
    </div>
  );

  function deleteAttendee(attendeeId: number) {
    if (!attendeeId || !event) {
      return;
    }
    const newEvent = {
      ...event,
      attendeeList: event.attendeeList?.filter(({ id }) => id !== attendeeId),
    };

    updateEvent(newEvent);
  }
}
