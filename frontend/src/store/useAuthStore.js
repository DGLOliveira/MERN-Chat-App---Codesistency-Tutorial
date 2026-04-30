import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import { toast } from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isSigningIn: false,
    isLoggingIn: false,
    isUpadingProfile: false,

    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            
            set({ authUser: res.data });
        }catch(error){
            set({ authUser: null, isCheckingAuth: false });
            console.log("Error in checkAuth: " + error);
        }finally{
            set({ isCheckingAuth: false });
        }
    },

    validateForm: (data) => {
        if(!data.email.trim()){
            return toast.error("Email is required");
        }
        if(!/\S+@\S+\.\S+/.test(data.email)){
            return toast.error("Invalid email format");
        }
        if(!data.password){
            return toast.error("Password is required");
        }
        if(data.password.length < 8){
            return toast.error("Password must be at least 8 characters")
        };
        if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(data.password)){
            return toast.error("Password must contain at least one number, one lowercase letter, one uppercase letter and one special character")
        }
        return true
    },

    signup: async (data) => {
        try {
            set({ isSigningUp: true });
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
        } catch (error) {
            toast.error(error.res.data.message);
            set({ isSigningUp: false });
            console.log("Error in signup: " + error);
        } finally {
            toast.success("Account created successfully");
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        try {
            set({ isLoggingIn: true });
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
        } catch (error) {
            toast.error(error.res.data.message);
            set({ isLoggingIn: false });
            console.log("Error in login: " + error);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.get("/auth/logout");
            set({ authUser: null });
        } catch (error) {
            toast.error(error.res.data.message);
            console.log("Error in logout: " + error);
        }
    },
}))