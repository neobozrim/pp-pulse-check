"use client"
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