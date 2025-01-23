"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface RatingDisplayProps {
  ratings: number[]
}

const colors = ["bg-cherry_red", "bg-butter_yellow", "bg-aura_indigo", "bg-dill_green", "bg-alpine_oat"]

const RatingDisplay: React.FC<RatingDisplayProps> = ({ ratings }) => {
  const [displayedRatings, setDisplayedRatings] = useState<number[]>([])

  useEffect(() => {
    if (ratings.length > displayedRatings.length) {
      const newRating = ratings[ratings.length - 1]
      setTimeout(() => {
        setDisplayedRatings((prev) => [...prev, newRating])
      }, 500)
    }
  }, [ratings, displayedRatings])

  return (
    <div className="flex items-end h-64 space-x-2">
      {displayedRatings.map((rating, index) => (
        <motion.div
          key={index}
          className={`w-8 h-8 rounded-full ${colors[rating % colors.length]}`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          style={{ marginBottom: `${(rating - 1) * 10}px` }}
        />
      ))}
    </div>
  )
}

export default RatingDisplay

