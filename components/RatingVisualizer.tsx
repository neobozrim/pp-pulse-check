"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface RatingVisualizerProps {
  ratings: number[]
}

const colors = ["bg-cherry_red", "bg-butter_yellow", "bg-aura_indigo", "bg-dill_green", "bg-alpine_oat"]

const RatingVisualizer: React.FC<RatingVisualizerProps> = ({ ratings }) => {
  const [displayedRatings, setDisplayedRatings] = useState<number[]>([])

  useEffect(() => {
    const addRatingsWithDelay = async () => {
      for (let i = displayedRatings.length; i < ratings.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        setDisplayedRatings((prev) => [...prev, ratings[i]])
      }
    }
    addRatingsWithDelay()
  }, [ratings, displayedRatings.length])

  return (
    <div className="relative h-32 bg-gray-200 rounded-full mb-8">
      <AnimatePresence>
        {displayedRatings.map((rating, index) => (
          <motion.div
            key={index}
            className={`absolute bottom-0 w-12 h-12 rounded-full ${colors[rating % colors.length]}`}
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 15,
              mass: 1,
            }}
            style={{ left: `${((rating - 1) / 9) * 100}%` }}
          />
        ))}
      </AnimatePresence>
      <div className="absolute top-full mt-2 left-0 right-0 flex justify-between text-sm text-gray-600">
        <span>1</span>
        <span>10</span>
      </div>
    </div>
  )
}

export default RatingVisualizer

