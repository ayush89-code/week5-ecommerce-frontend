const Card = ({ children, className = '', shadow = 'md' }) => {
  const shadows = {
    none: 'shadow-none',
    sm: 'shadow-sm hover:shadow-md',
    md: 'shadow-lg hover:shadow-xl',
    lg: 'shadow-2xl hover:shadow-3xl'
  }

  return (
    <div className={`bg-white rounded-xl overflow-hidden transition-all ${shadows[shadow]} ${className}`}>
      {children}
    </div>
  )
}

export default Card
