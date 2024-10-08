import { useCallback, useEffect, useState } from "react";

const INITIAL_SETTINGS: Settings = {
  timeFormat: "12",
  dateFormat: "dd-mm-yyyy",
  eventListFilter: "current-day",
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(INITIAL_SETTINGS);

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

  return { settings, updateSettings };
}
