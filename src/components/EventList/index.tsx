import { useNavigate } from "react-router-dom";
import { useMemo, useContext, useState } from "react";
import { DashboardContext } from "@src/contexts/DashboardContext";
import {
  formatDateWithFilter,
  formatTimeWithFilter,
  filterEventsWithFilter,
} from "@src/utils";
import { useSettings } from "@src/hooks/useSettings";

import "@components/EventList/style.css";

function MainEventComponent({ id, title, datetime, attendees }: MainEvent) {
  const { eventId, selectEvent } = useContext(DashboardContext);
  const { settings } = useSettings();

  return (
    // `+` is used to convert string into number
    <tr
      key={id}
      className={
        "event-table-row" +
        (eventId && +eventId === id ? " selected-event-row" : "")
      }
      onClick={() => selectEvent && selectEvent(id)}
    >
      <td className="event-title">{title}</td>
      <td className="event-date">
        {formatDateWithFilter(datetime, settings.dateFormat)}
      </td>
      <td className="event-time">
        {formatTimeWithFilter(datetime, settings.timeFormat)}
      </td>
      <td className="event-attendees">{attendees}</td>
    </tr>
  );
}

export function EventList({ date }: EventListProps) {
  const { events } = useContext(DashboardContext);
  const { settings } = useSettings();
  const [eventListFilter, setEventListFilter] = useState(
    settings.eventListFilter,
  );

  const navigate = useNavigate();

  const eventTable = useMemo(() => {
    const filteredEvents = filterEventsWithFilter(
      events,
      date,
      eventListFilter,
    );
    if (filteredEvents.length < 1) {
      return (
        <p>{`There are no events on ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</p>
      );
    }

    filteredEvents.sort(function sortEvents(eventA, eventB) {
      const dateA = new Date(eventA.datetime);
      const dateB = new Date(eventB.datetime);
      if (+dateA === +dateB) {
        return 0;
      } else if (dateA > dateB) {
        return 1;
      }
      return -1;
    });

    const eventsToRender = filteredEvents.map((event) => (
      <MainEventComponent {...event} />
    ));

    return (
      <div className="table-container">
        <table className="event-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Attendees</th>
            </tr>
          </thead>
          <tbody>{eventsToRender}</tbody>
        </table>
      </div>
    );
  }, [events, date, eventListFilter]);

  return (
    <div className="event-list">
      <div className="event-list-filter-container">
        <p>Show events for:</p>
        <select
          className="event-list-filter"
          name="eventListFilter"
          value={eventListFilter}
          onChange={(e) => setEventListFilter(e.target.value)}
        >
          {["current-day", "this-week", "this-month"].map(
            function filterToOption(filter) {
              return (
                <option value={filter}>
                  {filter
                    .split("-")
                    .map((word) => word.at(0)?.toUpperCase() + word.slice(1))
                    .toString()
                    .replace(",", " ")}
                </option>
              );
            },
          )}
        </select>
      </div>
      {eventTable}
      <button
        type="button"
        className="event-add-btn button-15"
        onClick={() => navigate("/event/add")}
      >
        Add Event
      </button>
    </div>
  );
}
