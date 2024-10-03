import { FormEvent, useState } from "react";
import { useEvents } from "../../hooks/useEvents";

import "@/components/FormHelper/FormHelper.css";
import { useNavigate } from "react-router-dom";

export function FormHelper({ initFormData, isEdit }: FormHelperPropTypes) {
  const [formData, setFormData] = useState(initFormData);
  const { addEvent, updateEvent } = useEvents();

  const navigate = useNavigate();

  return (
    <>
      <form action="#" onSubmit={handleSubmit} className="event-form">
        <h3>{isEdit ? "Edit Event" : "Add Event"}</h3>
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
        <div className="container">
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
        <div className="container btn-container">
          <button type="reset" onClick={() => navigate("/dashboard")}>
            Cancel
          </button>
          <button type="submit">{isEdit ? "Update Event" : "Add Event"}</button>
        </div>
      </form>
    </>
  );

  function handleOnChange(data: Partial<AddEventFormData>) {
    setFormData((formData) => ({ ...formData, ...data }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isEdit) {
      updateEvent(formData);
    } else {
      addEvent(formData);
      setFormData(initFormData);
    }
  }
}
