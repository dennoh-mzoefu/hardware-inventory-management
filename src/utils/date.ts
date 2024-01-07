export const firebaseDateFormated = (dateToFormat: any) => {
  const milliseconds =
    dateToFormat.seconds * 1000 + dateToFormat.nanoseconds / 1e6;
  const date = new Date(milliseconds);

  // Use toLocaleString with en-KE locale to display the date in Kenya's time format
  const dateString = date.toLocaleDateString("en-KE");

  // Manually construct the time portion
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  const timeString = `${hours % 12 || 12}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${amPm}`;

  // Combine date and time portions
  const formattedDateTime = `${dateString} ${timeString}`;

  console.log("Formatted Date and Time String:", formattedDateTime);
  return formattedDateTime;
};
