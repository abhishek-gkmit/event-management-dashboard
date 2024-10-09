import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "@hooks/useEvents";

import "@components/AttendeeFormHelper/style.css";

export function AttendeeFormHelper({
  initFormData,
  isEdit,
  eventId,
}: AttendeeFormHelperProps) {
  const [formData, setFormData] = useState(initFormData);
  const { events, updateEvent } = useEvents();

  const nameRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const event = useMemo(
    () => events.find(({ id }) => id === eventId),
    [events, eventId],
  );

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  return (
    <form action="#" onSubmit={handleSubmit} className="attendee-form">
      <h1>{isEdit ? "Update Attendee" : "Add Attendee"}</h1>
      <input
        ref={nameRef}
        type="text"
        name="name"
        required
        value={formData.name}
        minLength={5}
        placeholder="Name*"
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      <input
        type="email"
        name="email"
        required
        value={formData.email}
        placeholder="Email*"
        onChange={(e) => handleChange({ email: e.target.value })}
      />
      <div className="attendee-btn-container">
        <button
          className="button-15 button"
          type="reset"
          onClick={() => navigate(`/dashboard/select/${event?.id}`)}
        >
          Cancel
        </button>
        <button className="button-15 add-edit-btn" type="submit">
          {isEdit ? "Update Attendee" : "Add Attendee"}
        </button>
      </div>
    </form>
  );

  function handleChange(attendeeData: Partial<Attendee>) {
    setFormData({ ...formData, ...attendeeData });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isEdit && event && event.attendeeList) {
      event.attendeeList = event.attendeeList.map((attendee) => {
        if (attendee.id === formData.id) {
          return formData;
        }
        return attendee;
      });
      updateEvent(event);
      navigate(`/dashboard/select/${event.id}`);
    } else if (event) {
      const attendee = { ...formData, id: Date.now() };
      event.attendeeList?.push(attendee);
      updateEvent(event);
      navigate(`/dashboard/select/${event.id}`);
    } else {
      navigate("/error");
    }
  }
}
