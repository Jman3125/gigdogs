// Format time range from "ISO-ISO" format to readable "HH:MM - HH:MM"
export const formatTimeRange = (timeRange: string): string => {
  try {
    const [startStr, endStr] = timeRange.split(" - ");
    const start = new Date(startStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const end = new Date(endStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${start} - ${end}`;
  } catch {
    return timeRange;
  }
};
