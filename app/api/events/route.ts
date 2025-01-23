import { NextResponse } from "next/server"
import { adminDatabase } from "@/lib/firebaseAdmin"
import { Reference } from "firebase-admin/database"

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    const eventsRef = adminDatabase.ref("events");
    const newEventRef = eventsRef.push({ name, ratings: [] });
    
    await Promise.race([
      newEventRef.once('value'),
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