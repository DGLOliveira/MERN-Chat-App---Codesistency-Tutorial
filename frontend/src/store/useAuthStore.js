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

    signup: async (email, password, fullname) => {
        try {
            set({ isSigningUp: true });
            const res = await axiosInstance.post("/auth/signup", { email, password, fullname});
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
}))