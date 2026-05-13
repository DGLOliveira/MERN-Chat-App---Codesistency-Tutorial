import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isSigningIn: false,
    isLoggingIn: false,
    isUpadingProfile: false,
    onlineUsers: [],

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


    signup: async (data) => {
        try {
            set({ isSigningUp: true });
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.error);
            set({ isSigningUp: false });
            console.log("Error in signup: " + error);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        try {
            set({ isLoggingIn: true });
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
        } catch (error) {
            toast.error(error.response.data.error);
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
            toast.error(error.response.data.error);
            console.log("Error in logout: " + error);
        }
    },

    
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response.data.error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}))