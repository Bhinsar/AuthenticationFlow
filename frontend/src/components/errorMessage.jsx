import React from 'react'

function errorMessage({ message, className = '' }) {
  if (!message) return null

  return (
    <div
      role="alert"
      className={`flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 ${className}`}
    >
      <p className="text-sm text-red-600 font-medium leading-snug">{message}</p>
    </div>
  )
}

export default errorMessage
