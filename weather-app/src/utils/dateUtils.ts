/**
 * Converts a Date object to a string in the ISO format and removes milliseconds
 *
 * @param date the date to be formatted
 * @returns a date and time (without milliseconds) in the ISO format
 */
const dateToIsoString = (date: Date) => {
    return date.toISOString().split(".")[0] + "Z";
};

/**
 * Round the time in the date object to the closest hour
 *
 * @param date
 * @returns
 */
const roundDateToClosestHour = (date: Date) => {
    date.setMinutes(0, 0);
    return date;
};

/**
 * Formats a given date to match the format used in the API data
 *
 * @param date the date to be formatted
 * @returns a string in ISO format without milliseconds with the time rounded to the previous hour
 */
export const formatDate = (date: Date) => {
    return dateToIsoString(roundDateToClosestHour(date));
};

/**
 * Formats a given timestamp to "hh:mm" format
 *
 * @param timestamp the timestamp to be formatted
 * @returns the time in the format "hh:mm"
 */
export const formatTimestamp = (timestamp: string) => {
    const originalDate = new Date(timestamp);

    // Extract hours and minutes from the Date object
    const hours = originalDate.getUTCHours();
    const minutes = originalDate.getUTCMinutes();

    // Format the hours and minutes as two-digit strings
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedTime = `${formattedHours}:${formattedMinutes}`;

    return formattedTime;
};
