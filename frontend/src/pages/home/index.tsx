import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { userAuthStore } from '../../lib/authStore'
import { logout } from '../../services/auth/authService'

function HomePage() {
  const navigate = useNavigate()
  const { user } = userAuthStore()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await logout()
    navigate('/login')
  }



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <span className="text-lg font-extrabold text-blue-600 tracking-tight">AuthFlow</span>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          <p className="text-sm font-medium text-gray-700">
            Hello, <span className="text-blue-600 font-semibold">{user?.name}</span> 👋
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          loading={loading}
          onClick={handleLogout}
        >
          Logout
        </Button>

      </nav>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center text-gray-400 text-sm">
          You are logged in as <span className="font-medium text-gray-600">{user?.email}</span>
          {user?.role && (
            <span className="ml-2 inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-600 capitalize">
              {user.role}
            </span>
          )}
        </div>
      </main>

    </div>
  )
}

export default HomePage