import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react'
import { Link } from 'react-router'
import toast from 'react-hot-toast'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { login, isLoggingIn, validateForm } = useAuthStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData)
  }

  return (
    <div  className="min-h-screen flex flex-col justify-center items-center p-6 sm:p-12">
      <h1 className="text-2xl font-bold mt-2 text-center p-4">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="form-control">
          <label className="label py-1">
            <span className="label-text font-medium">Email</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
              <Mail className="size-5 text-base-content/40" />
            </div>
            <input
              type="email"
              className={`input input-bordered w-full pl-10`}
              placeholder="you@example.com"
              value={formData.email}
              disabled={isLoggingIn}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label py-1">
            <span className="label-text font-medium">Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
              <Lock className="size-5 text-base-content/40" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className={`input input-bordered w-full pl-10`}
              placeholder="••••••••"
              value={formData.password}
              disabled={isLoggingIn}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="size-5 text-base-content/40" />
              ) : (
                <Eye className="size-5 text-base-content/40" />
              )}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
          {isLoggingIn ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Loading...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="text-center p-4">
        <p className="text-base-content/60">
          Don't have an account?{" "}
          <Link to="/register" className="link link-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login