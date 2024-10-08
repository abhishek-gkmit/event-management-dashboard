import { useCallback, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSettings } from "@src/hooks/useSettings";

import "@components/Settings/style.css";

export function Settings() {
  const { settings, updateSettings, saveSettings, resetSettings } =
    useSettings();

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      saveSettings();
    },
    [saveSettings],
  );

  return (
    <form action="#" onSubmit={handleSubmit} className="settings-form">
      <h1>Settings</h1>
      <div className="settings-form-entry-container">
        <p>Select time format: </p>
        <select
          className="settings-form-entry settings-time-format"
          name="timeFormat"
          value={settings.timeFormat}
          onChange={(e) => updateSettings({ timeFormat: e.target.value })}
        >
          {["12", "24"].map(function valuesToOption(value) {
            return <option value={value}>{value}</option>;
          })}
        </select>
      </div>
      <div className="settings-form-entry-container">
        <p>Select date format: </p>
        <select
          className="settings-form-entry settings-date-format"
          name="dateFormat"
          value={settings.dateFormat}
          onChange={(e) => updateSettings({ dateFormat: e.target.value })}
        >
          {["dd-mm-yyyy", "mm-dd-yyyy"].map(function valuesToOption(value) {
            return <option value={value}>{value.toUpperCase()}</option>;
          })}
        </select>
      </div>
      <div className="settings-form-entry-container">
        <p>Select filter: </p>
        <select
          className="settings-form-entry settings-event-list-filter"
          name="eventListFilter"
          value={settings.eventListFilter}
          onChange={(e) => updateSettings({ eventListFilter: e.target.value })}
        >
          {["current-day", "this-week", "this-month"].map(
            function valuesToOption(value) {
              return (
                <option value={value}>
                  {value
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
      <div className="settings-form-entry-container">
        <p>Select sort type: </p>
        <select
          className="settings-form-entry settings-event-list-filter"
          name="sortBy"
          value={settings.sortBy}
          onChange={(e) => updateSettings({ sortBy: e.target.value })}
        >
          {["date-time", "name", "attendees"].map(
            function valuesToOption(value) {
              return (
                <option value={value}>
                  {value
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
      <div className="container">
        <button
          className="button-15"
          type="reset"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
        <button
          type="button"
          className="reset-btn button-15"
          onClick={() => resetSettings()}
        >
          Reset
        </button>
        <button className="button-15" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
