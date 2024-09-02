function formatDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}


function formatNumber(value) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(parseFloat(value).toFixed(2));
}

function roundTimestamp(targetTimestamp, day, mon, year) {
  const date = new Date(targetTimestamp);
  const minutes = date.getMinutes();
  const diff = minutes % 10;
  const roundedMinutes = minutes + (diff >= 1 ? 10 - diff : -diff);
  date.setMinutes(roundedMinutes);
  date.setSeconds(0);
  date.setMilliseconds(0);

  date.setDate(date.getDate() - day);
  date.setMonth(date.getMonth() - mon);
  date.setFullYear(date.getFullYear() - year);
  return date.getTime();
}

export { formatDate, formatNumber,roundTimestamp };