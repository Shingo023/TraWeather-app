import { DateTime } from "luxon";

export function getBackgroundPercentage(sunDegrees: number): number | null {
  // Define the known points as arrays of [sunDegrees, backgroundPercentage]
  const points = [
    [0, 0],
    [5, 0.5],
    [10, 1],
    [15, 2],
    [20, 3],
    [25, 5],
    [30, 7],
    [35, 9.5],
    [40, 12],
    [45, 15],
    [50, 18],
    [55, 21.5],
    [60, 25],
    [65, 29],
    [70, 33],
    [75, 37],
    [80, 41.5],
    [85, 46],
    [90, 50],
    [95, 54],
    [100, 58.5],
    [105, 63],
    [110, 67],
    [115, 71],
    [120, 75],
    [125, 78.5],
    [130, 82],
    [135, 85],
    [140, 88],
    [145, 90.5],
    [150, 93],
    [155, 95],
    [160, 97],
    [165, 98],
    [170, 99],
    [175, 99.5],
    [180, 100],
  ];

  // Handle out of range cases
  if (sunDegrees < 0) return 0;
  if (sunDegrees > 180) return 100;

  // Find the segment where the y value lies
  for (let i = 0; i < points.length - 1; i++) {
    const [y1, x1] = points[i];
    const [y2, x2] = points[i + 1];

    // Check if sunDegrees is within the current segment
    if (sunDegrees >= y1 && sunDegrees <= y2) {
      // Perform linear interpolation
      const x = x1 + ((sunDegrees - y1) * (x2 - x1)) / (y2 - y1);
      return x;
    }
  }

  // Return null or a default value if y is out of range
  return null;
}

// sunrise and sunset
export function daylightPercentage(
  currentDateTime: string,
  sunrise: string,
  sunset: string
): number | boolean {
  // Extract the time part from currentDateTime
  const currentTime = DateTime.fromFormat(
    currentDateTime,
    "EEE, MMM d, h:mm a"
  ).toFormat("HH:mm:ss");

  // Parse the current, sunrise, and sunset times to DateTime objects in the same day
  const current = DateTime.fromFormat(currentTime, "HH:mm:ss");
  const sunriseTime = DateTime.fromFormat(sunrise, "HH:mm:ss");
  const sunsetTime = DateTime.fromFormat(sunset, "HH:mm:ss");

  // Ensure the times are valid
  if (!current.isValid || !sunriseTime.isValid || !sunsetTime.isValid) {
    return false;
  }

  // Check if the current time is within the daylight period
  if (current < sunriseTime || current > sunsetTime) {
    return false;
  }

  // Calculate the percentage of daylight passed
  const totalDaylightDuration = sunsetTime.diff(sunriseTime, "seconds").seconds;
  const timePassedSinceSunrise = current.diff(sunriseTime, "seconds").seconds;
  const percentagePassed =
    (timePassedSinceSunrise / totalDaylightDuration) * 100;

  return Math.round(percentagePassed * 100) / 100;
}

export function getDaytimePeriod(
  sunrise: string,
  sunset: string,
  targetTime: string
) {
  // Parse the target time into a Date object
  const targetDate = new Date(targetTime);

  // Extract the date part from the target time
  const targetDateOnly = targetDate.toDateString(); // E.g., "Sun Dec 15 2024"

  // Combine the date part with sunrise and sunset times
  const sunriseDate = new Date(`${targetDateOnly} ${sunrise}`);
  const sunsetDate = new Date(`${targetDateOnly} ${sunset}`);

  // Compare target time with sunrise and sunset
  if (targetDate < sunriseDate) {
    return "before";
  } else if (targetDate >= sunriseDate && targetDate <= sunsetDate) {
    return "middle";
  } else {
    return "after";
  }
}
