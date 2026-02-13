import { Star } from 'lucide-react'

const StarRating = ({ rating = 0, onChange, readonly = false, size = "sm" }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        const isFilled = i < rating
        const isHoverable = !readonly
        
        return (
          <Star
            key={i}
            className={`
              cursor-pointer transition-all duration-200 hover:scale-110
              ${isFilled 
                ? 'text-yellow-400 fill-yellow-400 shadow-lg drop-shadow-md' 
                : 'text-gray-300 hover:text-yellow-400 hover:fill-yellow-400'
              }
              ${size === 'lg' ? 'w-8 h-8' : 'w-5 h-5'}
            `}
            onClick={() => !readonly && onChange?.(i + 1)}
            style={{ filter: isFilled ? 'drop-shadow(0 0 4px rgba(234, 179, 8, 0.8))' : 'none' }}
          />
        )
      })}
    </div>
  )
}

export default StarRating
