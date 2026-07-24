import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'

const features = [
  'Secure JWT token-based authentication',
  <>Three role levels: <span className="text-blue-500 font-medium">User</span>, <span className="text-blue-500 font-medium">Manager</span>, and <span className="text-green-500 font-medium">Admin</span></>,
  <>Protected routes with <span className="text-blue-400 font-medium">role-based</span> authorization</>,
  'Responsive design with Tailwind CSS',
]

function MainPage() {
  const navigate = useNavigate()

  return (
    <>

      <div className="w-full max-w-2xl">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md px-8 py-10 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            JWT Authentication System
          </h1>
          <p className="mt-3 text-gray-500 text-base">
            Role-Based Access Control with MERN Stack
          </p>
        </div>

        
          <h2 className="text-center text-lg font-bold text-gray-800 mb-5">Features</h2>
          <ul className="space-y-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        

        <div className="flex justify-center mt-10 gap-4">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/login')}
            className="bg-white hover:bg-blue-500 hover:text-white hover:border-blue-500 min-w-[120px]"
          >
            Login
          </Button>
          <Button
            variant="green"
            size="md"
            onClick={() => navigate('/register')}
            className="hover:bg-white hover:text-green-500 hover:border-green-500 min-w-[120px]"
          >
            Register
          </Button>
        </div>
        </div>

      </div>
    </>
  )
}

export default MainPage