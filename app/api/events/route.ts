import { NextResponse } from "next/server"
import { adminDatabase } from "@/lib/firebaseAdmin"

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const eventsRef = adminDatabase.ref("events");
    
    const createOperation = new Promise(async (resolve, reject) => {
      try {
        const newEventRef = await eventsRef.push({ name, ratings: [] });
        // Verify write completed
        const snapshot = await newEventRef.once('value');
        if (!snapshot.exists()) {
          reject(new Error('Event creation failed - data not found'));
        }
        resolve(newEventRef);
      } catch (err) {
        reject(err);
      }
    });

    const newEventRef = await Promise.race([
      createOperation,
      new Promise((_, reject) => setTimeout(() => reject(new Error('Firebase timeout')), 10000))
    ]);

    return NextResponse.json({ 
      id: newEventRef.key, 
      name 
    });
  } catch (error) {
    console.error("Event creation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}