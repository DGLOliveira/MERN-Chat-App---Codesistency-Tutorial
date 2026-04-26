import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { User, Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react'
import { Link } from 'react-router'
import { toast } from 'react-hot-toast'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname: ''
  })

  const { signup, isSigningUp } = useAuthStore()

  const validadeForm = () => {
    if (!formData.fullName.trim()){ 
      return toast.error("Full name is required");
    }
    if (!formData.email.trim()){ 
      return toast.error("Email is required");
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)){ 
      return toast.error("Invalid email format");
    }
    if (!formData.password){ 
      return toast.error("Password is required");
    }
    if (formData.password.length < 8){ 
      return toast.error("Password must be at least 8 characters")
    };
    if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)){
      return toast.error("Password must contain at least one number, one lowercase letter, one uppercase letter and one special character")
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = validadeForm()
    if (success === true){
      signup(formData.email, formData.password, formData.fullname)
    } 
  }

  return (
    <div  className="min-h-screen grid lg:grid-cols-2 justify-center items-center p-6 sm:p-12">
      <h1 className="text-2xl font-bold mt-2 text-center">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label py-1">
            <span className="label-text font-medium">Full Name</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
              <User className="size-5 text-base-content/40" />
            </div>
            <input
              type="text"
              className={`input input-bordered w-full pl-10`}
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
        </div>

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

        <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
          {isSigningUp ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Loading...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
      <div className="text-center">
        <p className="text-base-content/60">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register