import { useState, useEffect } from 'react';

export interface OkinawanTime {
  timeString: string;
  dateString: string;
  period: 'morning' | 'afternoon' | 'evening' | 'night';
}

export function useOkinawaTime(): OkinawanTime {
  const [jstDate, setJstDate] = useState<Date>(getJstTime());

  function getJstTime(): Date {
    // Current UTC time
    const now = new Date();
    // JST is UTC + 9 hours
    const jstOffset = 9 * 60 * 60 * 1000;
    return new Date(now.getTime() + jstOffset + now.getTimezoneOffset() * 60 * 1000);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setJstDate(getJstTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format the time as HH:MM:SS
  const pad = (num: number) => String(num).padStart(2, '0');
  const timeString = `${pad(jstDate.getHours())}:${pad(jstDate.getMinutes())}:${pad(jstDate.getSeconds())}`;

  // Format the date in a nice english layout
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  const dateString = jstDate.toLocaleDateString('en-US', options);

  // Determine day period for contextual greetings
  const hours = jstDate.getHours();
  let period: OkinawanTime['period'] = 'night';
  if (hours >= 5 && hours < 12) period = 'morning';
  else if (hours >= 12 && hours < 17) period = 'afternoon';
  else if (hours >= 17 && hours < 21) period = 'evening';

  return { timeString, dateString, period };
}
