export function bytesToString(size) {
  let content = '';
  if (size < 1e3) {
    content = `${size.toString()}B`;
  } else if (size < 1e6) {
    content = `${(size / 1000).toFixed(2)}KB`;
  } else if (size < 1e9) {
    content = `${(size / 1e6).toFixed(2)}MB`;
  } else {
    content = `${(size / 1e9).toFixed(3)}GB`;
  }
  return content;
}

export function secondsToReadable(seconds) {
  // TIP: to find current time in milliseconds, use:
  // let  current_time_milliseconds = new Date().getTime();
  if (!seconds) {
    return '永久';
  }

  function numberEnding(number) {
    return (number > 1) ? 's' : '';
  }

  const years = Math.floor(seconds / 31536000);
  if (years) {
    return `${years} year${numberEnding(years)}`;
  }
  // TODO: Months! Maybe weeks?
  const days = Math.floor((seconds %= 31536000) / 86400);
  if (days) {
    return `${days} day${numberEnding(days)}`;
  }
  const hours = Math.floor((seconds %= 86400) / 3600);
  if (hours) {
    return `${hours} hour${numberEnding(hours)}`;
  }
  const minutes = Math.floor((seconds %= 3600) / 60);
  if (minutes) {
    return `${minutes} minute${numberEnding(minutes)}`;
  }
  return 'less than a minute'; // 'just now' //or other string you like;
}

export function calculate_last_time_seconds(size, spare_space_bytes) {
  let store_for_days = spare_space_bytes / size;
  if (store_for_days > 400) {
    return null;// forever.
  } else {
    return Math.floor(store_for_days * 24 * 3600)
  }
}
