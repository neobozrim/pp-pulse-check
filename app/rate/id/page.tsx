"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function RatePage() {
  const { id } = useParams()
  const router = useRouter()
  const [rating, setRating] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (rating !== null) {
      setIsSubmitting(true)
      try {
        const response = await fetch(`/api/events/${id}/rate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating }),
        })
        if (!response.ok) {
          throw new Error("Failed to submit rating")
        }
        toast({
          title: "Thank You!",
          description: "Your rating has been submitted successfully.",
        })
        setTimeout(() => {
          router.push(`/event/${id}`)
        }, 2000)
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="container mx-auto p-4 bg-alpine_oat min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-cherry_red">Rate This Event</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-dill_green">How do you feel about this event?</p>
          <div className="flex justify-between mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <Button
                key={value}
                onClick={() => setRating(value)}
                variant={rating === value ? "default" : "outline"}
                className={`w-10 h-10 p-0 ${rating === value ? "bg-aura_indigo text-white" : "text-cherry_red"}`}
                disabled={isSubmitting}
              >
                {value}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleSubmit}
            className="w-full bg-dill_green text-white hover:bg-aura_indigo"
            disabled={rating === null || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Rating"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

