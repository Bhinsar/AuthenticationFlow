import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import ErrorMessage from '../../components/errorMessage'
import { login } from '../../services/auth/authService'


function LoginPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [ apiError, setApiError] = useState('')

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.password) errs.password = 'Password is required'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) return setErrors(errs)
    setErrors({})
    setApiError('')
    setLoading(true)
    try {
      const result = await login(form.email, form.password)
      if (result?.user) {
        navigate('/home')
      } else {
        setApiError(typeof result === 'string' ? result : 'Login failed. Please try again.')
      }
    } catch (error) {
      console.log(error)
      setApiError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>      
    <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl px-8 py-10">

          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-gray-900">Welcome back</h1>
            <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
          </div>
          <ErrorMessage message={apiError} />
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <Input
              id="login-email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange('email')}
              error={errors.email}
            />

            <Input
              id="login-password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange('password')}
              error={errors.password}
            />


            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginPage