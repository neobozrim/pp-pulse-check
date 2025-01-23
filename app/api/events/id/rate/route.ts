import { NextResponse } from "next/server"
import { database } from "@/lib/firebaseAdmin"
import { ref, push} from "firebase/database"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { rating } = await request.json()
    const eventId = params.id
    const ratingsRef = ref(database, `events/${eventId}/ratings`)
    await push(ratingsRef, rating)

    return NextResponse.json({ success: true })
  } catch (_error) {
    return NextResponse.json({ error: "Failed to submit rating" }, { status: 500 })
  }
}

