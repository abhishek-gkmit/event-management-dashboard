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
          className="attendee-edit-btn"
          type="button"
          onClick={() => navigate(`/attendee/edit/${event.id}/${id}`)}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          className="attendee-edit-btn"
          type="button"
          onClick={() => id && deleteAttendee(id)}
        >
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
        <p className="no-attendees-msg">
          There are no Attendees in the event. Add attendees via the button
          below.
        </p>
      );
    }
    return (
      <>
        <p className="total-attendees-msg">
          Total Attendees: {event?.attendeeList?.length}
        </p>
        <div className="table-container">
          <table className="attendee-table table">
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
        </div>
      </>
    );
  }, [event]);

  const addAttendee = useCallback(
    function addAttendeeBtnClickHandler() {
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
    },
    [event],
  );

  return (
    <div className="attendee-list">
      {attendeeTable}
      <button
        className="add-attendee-btn button-15"
        type="button"
        onClick={addAttendee}
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
