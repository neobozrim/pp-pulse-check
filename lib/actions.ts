"use server"

import { revalidatePath } from "next/cache"

const ratings: { [eventId: number]: number[] } = {
  1: [7, 9, 5], // Initial ratings for event with ID 1
}

export async function submitRating(eventId: number, rating: number) {
  if (!ratings[eventId]) {
    ratings[eventId] = []
  }
  ratings[eventId].push(rating)
  revalidatePath(`/event/${eventId}`)
}

export async function getEventRatings(eventId: number): Promise<number[]> {
  return ratings[eventId] || []
}

