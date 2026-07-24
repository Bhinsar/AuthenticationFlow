import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/Input'
import Button from '../../components/Button'
import ErrorMessage from '../../components/errorMessage'
import { register } from '../../services/auth/authService'

function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Full name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters'
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password'
    else if (form.password !== form.confirmPassword)
      errs.confirmPassword = 'Passwords do not match'
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
      const result = await register(form.email, form.password, form.name, form.role)
      if (result?.user) {
        navigate('/home')
      } else {
        setApiError(typeof result === 'string' ? result : 'Registration failed. Please try again.')
      }
    } catch (err) {
      setApiError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <div className="w-full max-w-md my-5">
        <div className="bg-white rounded-3xl shadow-xl px-8 py-10">

          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-gray-900">Create an account</h1>
          </div>
          <ErrorMessage message={apiError} />

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Input
              id="reg-name"
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange('name')}
              error={errors.name}
            />

            <Input
              id="reg-email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange('email')}
              error={errors.email}
            />

            <div>
              <Input
                id="reg-password"
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={handleChange('password')}
                error={errors.password}
              />
             
            </div>

            <Input
              id="reg-confirm-password"
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={errors.confirmPassword}
            />

            {form.confirmPassword && (
              <p className={`text-xs font-medium ${form.password === form.confirmPassword ? 'text-green-500' : 'text-red-400'}`}>
                {form.password === form.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
              </p>
            )}

            <div className="flex flex-col gap-1">
              <label htmlFor="reg-role" className="text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="reg-role"
                value={form.role}
                onChange={handleChange('role')}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800
                  outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-400 cursor-pointer"
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>


            <Button
              type="submit"
              variant="green"
              size="lg"
              loading={loading}
              className="w-full mt-2"
            >
              Create Account
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default RegisterPage