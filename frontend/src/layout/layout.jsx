import React from 'react'

function layout({children}) {
  return (
    <div className="min-h-screen bg-linear-to-r from-blue-400 to-blue-600 flex flex-col items-center justify-center px-4 font-sans">
        {children}
    </div>
  )
}

export default layout