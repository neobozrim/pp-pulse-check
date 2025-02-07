// app/api/events/[id]/rate/route.ts

//import { NextRequest, NextResponse } from "next/server";
//import { adminDatabase } from "@/lib/firebaseAdmin"; // Use adminDatabase from firebaseAdmin.ts

//// Define an interface for the second argument to avoid Next.js type errors
//interface RouteContext {
 // params: { id: string };
//}

//export async function POST(request: NextRequest, { params }: RouteContext) {
//  try {
//    // Extract the dynamic route parameter
//    const { id } = params;

 //   // Parse the request body
 //   const { rating } = await request.json();

 //   // Build the reference for the "ratings" child under this event ID
  //  const ratingsRef = adminDatabase.ref(`events/${id}/ratings`);

//    // Push the new rating to the DB using the Admin SDK
 //   await ratingsRef.push(rating);
//
 //   // Return a success response
 //   return NextResponse.json({ success: true });
 // } catch (error) {
 //   console.error("Failed to submit rating:", error);
//    return NextResponse.json(
//      { error: "Failed to submit rating" },
//      { status: 500 },
 //   );
//  }
//}
// app/api/events/[id]/rate/route.ts

/** the code above was possibly shitty? the one below "had to be fixed"
but this takes too long already 

 import { NextResponse } from "next/server";
import { adminDatabase } from "@/lib/firebaseAdmin"; // from firebaseAdmin.ts (Admin SDK)

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { rating } = await request.json();

    // Use adminDatabase (server-side)
    const ratingsRef = adminDatabase.ref(`events/${id}/ratings`);
    await ratingsRef.push(rating);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to submit rating:", error);
    return NextResponse.json(
      { error: "Failed to submit rating" },
      { status: 500 },
    );
  }
}
**/

// app/api/events/[id]/rate/route.ts

// We only import NextResponse (and not NextRequest) to reduce type conflicts:
import { NextResponse } from "next/server";
import { adminDatabase } from "@/lib/firebaseAdmin";

export async function POST(request: any, context: any) {
  try {
    // No type-check on context.params.id
    const { id } = context.params;

    // No type-check on request.json()
    const body = await request.json();
    const rating = body?.rating;

    const ratingsRef = adminDatabase.ref(`events/${id}/ratings`);
    await ratingsRef.push(rating);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to submit rating:", error);
    return NextResponse.json(
      { error: "Failed to submit rating" },
      { status: 500 },
    );
  }
}
