import { NextResponse } from "next/server"
import { adminDatabase } from "@/lib/firebaseAdmin"

export async function POST(request: Request) {
  try {
    const { name } = await request.json()
    const eventsRef = adminDatabase.ref("events")
    const newEventRef = eventsRef.push()
    console.log('Creating event:', name)
    await newEventRef.set({ name, ratings: [] })
    console.log('Created event:', newEventRef.key)
    return NextResponse.json({ id: newEventRef.key, name })
  } catch (error) {
    console.error("Event creation error:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}