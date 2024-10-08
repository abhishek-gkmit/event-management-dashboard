import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useEvents } from "@hooks/useEvents";
import { useNavigate } from "react-router-dom";

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
      <button type="submit">
        {isEdit ? "Update Attendee" : "Add Attendee"}
      </button>
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
      navigate("/dashboard");
    } else if (event) {
      const attendee = { ...formData, id: Date.now() };
      event.attendeeList?.push(attendee);
      updateEvent(event);
      navigate("/dashboard");
    } else {
      navigate("/error");
    }
  }
}
