"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import EventList from "@/components/EventList"
import { toast } from "@/components/ui/use-toast"

export default function Home() {
  const [newEventName, setNewEventName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newEventName.trim()) {
      setIsLoading(true)
      try {
        const response = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newEventName.trim() }),
        })
        const data = await response.json()
        if (response.ok) {
          router.push(`/event/${data.id}`)
        } else {
          throw new Error(data.error || "Failed to create event")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="container mx-auto p-4 bg-alpine_oat min-h-screen">
      <h1 className="text-4xl font-bold text-cherry_red mb-8">Event Rating App</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
          <CardDescription>Enter a name for your new event</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateEvent} className="flex items-center space-x-2">
            <Input
              placeholder="Event name"
              className="flex-grow"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <EventList />
    </div>
  )
}

