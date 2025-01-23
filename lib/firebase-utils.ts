import { database } from './firebaseClient';
import { ref, get } from 'firebase/database';

export async function testConnection() {
  const testRef = ref(database, '.info/connected');
  const snapshot = await get(testRef);
  return snapshot.val();
}
export async function fetchEvent(eventId: string) {
  try {
    const eventRef = ref(database, `events/${eventId}`);
    const snapshot = await get(eventRef);
    
    if (snapshot.exists()) {
      const eventData = snapshot.val();
      return {
        id: eventId,
        name: eventData.name,
        ratings: eventData.ratings ? Object.values(eventData.ratings) : []
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

export async function checkEventExists(eventId: string): Promise<boolean> {
  try {
    const eventRef = ref(database, `events/${eventId}`);
    const snapshot = await get(eventRef);
    return snapshot.exists();
  } catch (error) {
    console.error('Error checking event existence:', error);
    return false;
  }
}