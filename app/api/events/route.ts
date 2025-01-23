import { NextResponse } from "next/server"
import { adminDatabase } from "@/lib/firebaseAdmin"

export async function POST(request: Request): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const { name } = await request.json();
    const eventsRef = adminDatabase.ref("events");
    
    return await new Promise<Response>((resolve, reject) => {
      const newEventRef = eventsRef.push({ name, ratings: [] }, (error) => {
        clearTimeout(timeoutId);
        if (error) {
          reject(error);
          return;
        }
        resolve(NextResponse.json({ id: newEventRef.key, name }));
      });
    });
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Event creation error:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}