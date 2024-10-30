import { format, parseISO } from "date-fns";

export const getCurrentTimeAndDate = (timeZone: string) => {
  try {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone,
      weekday: "short", // Abbreviated weekday (e.g., "Wed")
      month: "short", // Abbreviated month name (e.g., "Oct")
      day: "numeric", // Numeric day (e.g., "9")
      hour: "numeric", // Hour
      minute: "numeric", // Minute
      hour12: true, // 12-hour format
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(currentDate);

    return formattedDate;
  } catch (error) {
    console.error(`Error: Invalid time zone - ${timeZone}`);
    return "Invalid time zone";
  }
};

// "2024-10-19" -> "Sat, Oct 19"
export const formatDate = (dateStr: string) => {
  // Parse the date string into a Date object
  const date = parseISO(dateStr);

  // Format the date to "Sat, Oct 19"
  return format(date, "EEE, MMM dd");
};

export const getCurrentHourInTimeZone = (timeZone: string): number => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    hour12: false,
    timeZone: timeZone,
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const currentHour = formatter.format(date);

  return parseInt(currentHour, 10);
};

// '06:00:00' => "6:00 AM", '23:00:00' => "11:00 PM"
export const formatTimeTo12Hour = (time24: string): string => {
  const [hour24, minutes] = time24.split(":");
  let hour = parseInt(hour24, 10);
  const period = hour >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour time
  hour = hour % 12 || 12; // Converts '0' or '12' to '12'
  return `${hour}:${minutes} ${period}`;
};
