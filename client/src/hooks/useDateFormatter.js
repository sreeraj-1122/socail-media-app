import { formatDistanceToNow } from 'date-fns';

const useDateFormatter = () => {
  const formatRelativeTime = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      // Format the date and remove the word "about"
      let relativeTime = formatDistanceToNow(date, { addSuffix: true });
      return relativeTime.replace('about ', ''); // Remove "about" from the output
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Unknown time';
    }
  };

  return { formatRelativeTime };
};

export default useDateFormatter;
