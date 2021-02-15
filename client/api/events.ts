import axios from 'axios';
import { Event } from '../../server/src/types';
import { getAuthToken } from './auth';

function buildAxiosConfig() {
  return {
  baseURL: 'https://lvh.me:1234',
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
}
}

export async function getEvent(eventId: string) {
  const response = await axios.get(`/events/${eventId}`, buildAxiosConfig());
  return response.data as Event;
}

export async function getAllEvents() {
  const response = await axios.get(`/events`, buildAxiosConfig());
  return response.data as Event[];
}