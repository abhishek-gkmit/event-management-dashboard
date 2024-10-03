import { useEvents } from "../../hooks/useEvents";

import "@/components/AddEvent/AddEvent.css";
import { useParams } from "react-router-dom";
import { FormHelper } from "../FormHelper/FormHelper";

export function EditEvent() {
  const { id } = useParams();
  const { events } = useEvents();

  if (!id) {
    return <h1>Please provide id</h1>;
  }

  const initFormData = events.find(({ id: eventId }) => eventId === +id);

  if (initFormData) {
    return <FormHelper initFormData={initFormData} isEdit={true} />;
  }

  return <h1>Event with id: {id} does not exist.</h1>;
}
