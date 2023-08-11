
const dateFormater = (dateString) =>{

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };
  
  const formattedDateTime = new Date(dateString).toLocaleString(undefined, options);
  // Output: "August 10, 2023, 04:00:00 AM UTC"
  
  return formattedDateTime;
  }

  export default dateFormater;