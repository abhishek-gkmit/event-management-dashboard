import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AttendeeFormHelper } from "@components/AttendeeFormHelper";
import { useEvents } from "@hooks/useEvents";

export function EditAttendee() {
  const navigate = useNavigate();
  const { eventId, attendeeId } = useParams();
  const { events } = useEvents();

  if (!eventId || !attendeeId) {
    navigate("/error/eventId-or-attendeeId-was-not-found");
    return;
  }

  const initFormData = useMemo(() => {
    return events
      .find(({ id }) => id === +eventId)
      ?.attendeeList?.find(({ id }) => id === +attendeeId);
  }, [events]);

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
