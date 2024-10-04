import { useEvents } from "@hooks/useEvents";

import { useParams } from "react-router-dom";
import { EventFormHelper } from "@components/EventFormHelper/EventFormHelper";

export function EditEvent() {
  const { id } = useParams();
  const { events } = useEvents();

  if (!id) {
    return <h1>Please provide id</h1>;
  }

  const initFormData = events.find(({ id: eventId }) => eventId === +id);

  if (initFormData) {
    return <EventFormHelper initFormData={initFormData} isEdit={true} />;
  }

  return <h1>Event with id: {id} does not exist.</h1>;
}
