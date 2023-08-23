type Props = {
  rating: number
}

function RatingComponent({ rating }: Props) {
  const stars = Array(5)
    .fill(0)
    .map((_, i) => i + 1)
  return (
    <div className="flex gap-2">
      {stars.map((star) => {
        const FullStarColor = star <= rating ? '#3A82F6' : 'white'
        if (rating % star > 0 && star === Math.ceil(rating)) {
          const emptyPercentage = (star % rating) * 100
          const fillPercentage = 100 - emptyPercentage

          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#3A82F6"
              className="h-6 w-6"
            >
              <defs>
                <linearGradient id="half-star-gradient">
                  <stop offset={`${fillPercentage}%`} stopColor="#3A82F6" />
                  <stop offset={`${emptyPercentage}%`} stopColor="white" />
                </linearGradient>
              </defs>
              <path
                fill="url(#half-star-gradient)"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          )
        }
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={FullStarColor}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#3A82F6"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        )
      })}
    </div>
  )
}

export default RatingComponent
