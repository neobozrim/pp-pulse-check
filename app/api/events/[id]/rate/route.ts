// app/api/events/[id]/rate/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/firebaseAdmin";
import { ref, push } from "firebase/database";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Destructure the dynamic param
    const { id } = params;

    // Parse the request body
    const { rating } = await request.json();

    // Initialize the Firebase Realtime Database
    const database = getDatabase();

    // Build the reference for ratings under this event ID
    const ratingsRef = ref(database, `events/${id}/ratings`);

    // Push the new rating to the DB
    await push(ratingsRef, rating);

    // Return a success response
    return NextResponse.json({ success: true });
  } catch (error) {
    // Return an error response if anything fails
    return NextResponse.json(
      { error: "Failed to submit rating" },
      { status: 500 }
    );
  }
}
