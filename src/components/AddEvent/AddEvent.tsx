import { FormEvent, useState } from "react";

import "@/components/AddEvent/AddEvent.css";
import { useEvents } from "../../hooks/useEvents";

const initFormData: AddEventFormData = {
  title: "",
  datetime: "",
  description: "",
  attendees: 0,
  location: "",
};

export function AddEvent() {
  const [formData, setFormData] = useState(initFormData);
  const { addEvent } = useEvents();

  return (
    <>
      <form action="#" onSubmit={handleSubmit} className="add-event-form">
        <h3>Add Event</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          minLength={5}
          required
          onChange={(e) => handleOnChange({ title: e.target.value })}
        />
        <input
          type="datetime-local"
          name="date"
          value={formData.datetime}
          required
          onChange={(e) => handleOnChange({ datetime: e.target.value })}
        />
        <textarea
          name="description"
          placeholder="Description of event"
          value={formData.description}
          minLength={5}
          required
          onChange={(e) => handleOnChange({ description: e.target.value })}
        ></textarea>
        <div className="attendees-container">
          <label htmlFor="attendees" className="label">
            Attendees:{" "}
          </label>
          <input
            type="number"
            name="attendees"
            id="attendees"
            placeholder="Attendees"
            value={formData.attendees}
            min={1}
            max={100}
            required
            onChange={(e) => handleOnChange({ attendees: +e.target.value })}
          />
        </div>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          minLength={5}
          required
          onChange={(e) => handleOnChange({ location: e.target.value })}
        />
        <button type="submit">Add Event</button>
      </form>
    </>
  );

  function handleOnChange(data: Partial<AddEventFormData>) {
    setFormData((formData) => ({ ...formData, ...data }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    addEvent(formData);
  }
}
