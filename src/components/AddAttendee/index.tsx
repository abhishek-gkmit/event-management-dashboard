import { useNavigate, useParams } from "react-router-dom";
import { AttendeeFormHelper } from "@components/AttendeeFormHelper";

export function AddAttendee() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  if (!eventId) {
    navigate("/error");
    return;
  }

  return (
    <AttendeeFormHelper
      initFormData={{ name: "", email: "" }}
      isEdit={false}
      eventId={+eventId}
    />
  );
}
