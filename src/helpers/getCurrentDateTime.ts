function getCurrentDateTime() {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "UTC",
  };

  return now.toLocaleString("en-US", options);
}

export default getCurrentDateTime;
