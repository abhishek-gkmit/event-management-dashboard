import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_SETTINGS: Settings = {
  timeFormat: "12",
  dateFormat: "dd-mm-yyyy",
  eventListFilter: "current-day",
  sortBy: "date-time",
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(INITIAL_SETTINGS);
  const navigate = useNavigate();

  useEffect(() => {
    const localSettings = localStorage.getItem("settings");
    if (localSettings) {
      setSettings(JSON.parse(localSettings));
    } else {
      localStorage.setItem("settings", JSON.stringify(INITIAL_SETTINGS));
      setSettings(INITIAL_SETTINGS);
    }
  }, []);

  const updateSettings = useCallback(function updateSettingsMemoized(
    newSettings: Partial<Settings>,
  ) {
    setSettings((settings) => ({ ...settings, ...newSettings }));
  }, []);

  const saveSettings = useCallback(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
    navigate("/");
  }, [settings]);

  const resetSettings = useCallback(() => {
    if (
      confirm("Do you want to reset ALL EVENTS and SETTINGS?") &&
      confirm(
        "Do you really, really, want to reset ALL EVENTS and SETTINGS? Note that all the saved events will be lost.",
      )
    ) {
      localStorage.removeItem("settings");
      localStorage.removeItem("events");
      alert("All events data and settings are cleared.");
    }
  }, [settings]);

  return { settings, updateSettings, saveSettings, resetSettings };
}
