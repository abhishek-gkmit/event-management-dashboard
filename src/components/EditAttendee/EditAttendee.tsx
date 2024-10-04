import { useNavigate, useParams } from "react-router-dom";
import { AttendeeFormHelper } from "@components/AttendeeFormHelper/AttendeeFormHelper";
import { useEvents } from "@src/hooks/useEvents";

export function EditAttendee() {
  const navigate = useNavigate();
  const { eventId, attendeeId } = useParams();
  console.log(`eventId: ${eventId}, attendeeId: ${attendeeId}`);
  const { events } = useEvents();

  if (!eventId || !attendeeId) {
    navigate("/error/eventId-or-attendeeId-was-not-found");
    return;
  }

  const initFormData = events
    .find(({ id }) => id === +eventId)
    ?.attendeeList?.find(({ id }) => id === +attendeeId);

  if (!initFormData) {
    navigate("/error/attendeeId-was-not-found");
    return;
  }

  return (
    <AttendeeFormHelper
      initFormData={initFormData}
      isEdit={true}
      eventId={+eventId}
    />
  );
}
