import { formatDistanceToNow } from 'date-fns';

// /**
//  * A custom hook for formatting dates.
//  * @returns {Function} A function to format a date string.
//  */
const useDateFormatter = () => {
//   /**
//    * Formats a date string to a relative time string (e.g., "2 days ago").
//    * @param {string} dateString - The date string to format.
//    * @returns {string} The formatted date string.
//    */
  const formatRelativeTime = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Unknown time';
    }
  };

  return { formatRelativeTime };
};

export default useDateFormatter;
