export function getTimeDifference(targetDate) {
  // Parse the target date string into a Date object
  const targetDateTime = new Date(targetDate);

  // Get the current date and time
  const now = new Date();

  // Calculate the time difference in milliseconds
  const timeDifferenceMs = targetDateTime - now;

  // Convert milliseconds to seconds
  const seconds = Math.abs(Math.floor(timeDifferenceMs / 1000));

  // Determine the appropriate unit to display
  let displayUnit;
  let displayValue;
  if (seconds >= 604800) {
    displayUnit = "week";
    displayValue = Math.floor(seconds / 604800);
  } else if (seconds >= 86400) {
    displayUnit = "day";
    displayValue = Math.floor(seconds / 86400);
  } else if (seconds >= 3600) {
    displayUnit = "hour";
    displayValue = Math.floor(seconds / 3600);
  } else if (seconds >= 60) {
    displayUnit = "minute";
    displayValue = Math.floor(seconds / 60);
  } else {
    displayUnit = "second";
    displayValue = seconds;
  }

  // Construct the result string
  const result = `${displayValue} ${displayUnit}${
    displayValue !== 1 ? "s" : ""
  }`;

  return result;
}
