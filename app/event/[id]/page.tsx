"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { QRCodeSVG } from "qrcode.react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RatingVisualizer from "@/components/RatingVisualizer"
import { fetchEvent } from "@/lib/firebase-utils"

console.log("Page rendering started")

export default function EventPage() {
 const { id } = useParams()
 console.log("ID from params:", id)
 console.log("Full params:", useParams())
 
 const [eventName, setEventName] = useState("Loading...")
 const [ratings, setRatings] = useState<number[]>([])
 const [isLoading, setIsLoading] = useState(true)
 const [error, setError] = useState<string | null>(null)

 useEffect(() => {
   async function loadEvent() {
     if (!id) {
       setError("No event ID provided")
       setIsLoading(false)
       return
     }
     try {
       const eventId = Array.isArray(id) ? id[0] : id
       const event = await fetchEvent(eventId)
       
       if (!event) {
         setError("Event not found")
         setIsLoading(false)
         return
       }
       setEventName(event.name)
       setRatings(event.ratings)
       setIsLoading(false)
     } catch (err) {
       console.error(err)
       setError("Failed to load event")
       setIsLoading(false)
     }
   }
   loadEvent()
 }, [id])

 if (isLoading) {
   return (
     <div className="container mx-auto p-4 bg-alpine_oat min-h-screen flex items-center justify-center">
       <p className="text-2xl text-aura_indigo">Loading event...</p>
     </div>
   )
 }

 if (error) {
   return (
     <div className="container mx-auto p-4 bg-alpine_oat min-h-screen flex items-center justify-center">
       <Card className="w-full max-w-md">
         <CardHeader>
           <CardTitle className="text-3xl text-cherry_red">Error</CardTitle>
         </CardHeader>
         <CardContent>
           <p className="text-lg text-aura_indigo">{error}</p>
         </CardContent>
       </Card>
     </div>
   )
 }

 return (
   <div className="container mx-auto p-4 bg-alpine_oat min-h-screen">
     <Card className="mb-8">
       <CardHeader>
         <CardTitle className="text-3xl text-cherry_red">{eventName}</CardTitle>
         <p className="text-lg text-aura_indigo">Event ID: {id}</p>
       </CardHeader>
       <CardContent className="flex flex-col items-center">
         <p className="mb-4 text-dill_green">Scan the QR code to rate this event</p>
         <QRCodeSVG 
           value={`${process.env.NEXT_PUBLIC_APP_URL}/rate/${id}`} 
           size={200} 
           bgColor="#ffffff"
           fgColor="#000000"
         />
       </CardContent>
     </Card>
     <Card>
       <CardHeader>
         <CardTitle className="text-2xl text-aura_indigo">Live Ratings</CardTitle>
       </CardHeader>
       <CardContent>
         <RatingVisualizer ratings={ratings} />
       </CardContent>
     </Card>
   </div>
 )
}