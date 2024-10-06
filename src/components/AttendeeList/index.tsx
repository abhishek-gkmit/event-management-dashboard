import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useEvents } from "@hooks/useEvents";

import "@components/AttendeeList/style.css";
import { useCallback } from "react";

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
    () => events.find(({ id }) => id === eventId),
    [events, eventId],
  );

  const attendeeTable = useMemo(() => {
    if (event && event.attendeeList && event.attendeeList.length < 1) {
      return (
        <p>
          There are no Attendees in the event. Add attendees via the button
          below.
        </p>
      );
    }
    return (
      <>
        <p>Total Attendees: {event?.attendeeList?.length}</p>
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
      </>
    );
  }, [event]);

  const addAttendee = useCallback(function addAttendeeBtnClickHandler() {
    if (
      event &&
      event.attendeeList &&
      event.attendeeList.length < event?.attendees
    ) {
      navigate(`/attendee/add/${event?.id}`);
    } else {
      alert(
        "You have reached maximum attendee limit. If you want to add more attendees please edit the Event and increase the attendees limit.",
      );
    }
  }, []);

  return (
    <div className="attendee-list">
      {attendeeTable}
      <button className="add-attendee-btn" type="button" onClick={addAttendee}>
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
