import React from 'react';
import axios from 'axios';

const API_URL = 'https://lvh.me:3000';

async function getEvents() {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
}


export function Calendar() {
  const [events, setEvents] = React.useState([]);
  React.useEffect(() => {
    getEvents()
      .then(events => {
        console.log(events);
        setEvents(events);
      })
  }, []);

  return <div>{events.map(e => <p>{e.toString()}</p>)}</div>
}