/** "use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { database } from "@/lib/firebaseClient"
import { ref, onValue } from "firebase/database"
import { toast } from "@/components/ui/use-toast"

interface Event {
 id: string
 name: string
}

const EventList = () => {
 const [events, setEvents] = useState<Event[]>([])
 const [isLoading, setIsLoading] = useState(true)

 useEffect(() => {
   const eventsRef = ref(database, "events")
   const unsubscribe = onValue(
     eventsRef,
     (snapshot) => {
       const data = snapshot.val()
       if (data) {
         const eventList = Object.entries(data).map(([id, event]: [string, Omit<Event, 'id'>]) => ({
           id,
           name: event.name,
         }))
         setEvents(eventList)
       }
       setIsLoading(false)
     },
     (_error) => {
       toast({
         title: "Error",
         description: "Failed to load events",
         variant: "destructive",
       })
       setIsLoading(false)
     },
   )
   return () => unsubscribe()
 }, [])

 if (isLoading) {
   return <div className="text-center">Loading events...</div>
 }

 if (events.length === 0) {
   return (
     <Card className="bg-butter_yellow">
       <CardContent className="p-6">
         <p className="text-center text-cherry_red">No events created yet. Create your first event above!</p>
       </CardContent>
     </Card>
   )
 }

 return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
     {events.map((event) => (
       <Link href={`/event/${event.id}`} key={event.id} className="block">
         <Card className="bg-butter_yellow hover:shadow-lg transition-shadow duration-300">
           <CardHeader>
             <CardTitle className="text-cherry_red">{event.name}</CardTitle>
             <CardDescription>Event ID: {event.id}</CardDescription>
           </CardHeader>
         </Card>
       </Link>
     ))}
   </div>
 )
}

export default EventList

**/
"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { adminDatabase } from "@/lib/firebaseAdmin" // or your DB import
import { ref, onValue } from "firebase-admin/database" // Admin SDK
// If you're using the *client* SDK in this file, import from "firebase/database" instead

// Define the shape of your Event data WITHOUT the "id" key (since that's stored as the object key)
interface BaseEvent {
  name: string
  ratings?: number[]
  // ...any other fields
}

export default function EventList() {
  const [events, setEvents] = useState<{ id: string; name: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Reference your "events" node from the database
    const eventsRef = ref(adminDatabase, "events")

    // Subscribe to changes in the "events" node
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val()
      if (!data) {
        // If there's no data, just clear events and stop loading
        setEvents([])
        setIsLoading(false)
        return
      }

      // Cast data to "Record<string, BaseEvent>"
      const typedData = data as Record<string, BaseEvent>

      // Convert the object to an array of { id, name }
      const eventList = Object.entries(typedData).map(([id, event]) => ({
        id,
        name: event.name,
      }))

      setEvents(eventList)
      setIsLoading(false)
    })

    // Cleanup the subscription when component unmounts
    return () => unsubscribe()
  }, [])

  if (isLoading) {
    return <p>Loading events...</p>
  }

  return (
    <ul>
      {events.map((evt) => (
        <li key={evt.id}>
          <Link href={`/event/${evt.id}`}>{evt.name}</Link>
        </li>
      ))}
    </ul>
  )
}
