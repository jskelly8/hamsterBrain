export const formatTime = (timeString) => {
    if (!timeString) return null;
  
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10)); // ParseInt with base 10
    date.setMinutes(parseInt(minutes, 10)); // ParseInt with base 10
    return date;
  };