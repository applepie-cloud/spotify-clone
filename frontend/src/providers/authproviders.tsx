import React from 'react'
import { axiosInstance } from '@/lib/axios'
import { useAuth } from '@clerk/clerk-react'
import { useEffect,useState } from 'react'
import { Loader } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useChatStore } from '@/stores/useChatStore'

const updateApiToken = (token: string | null) => {
    if(token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axiosInstance.defaults.headers.common['Authorization']
    }
}

const AuthProviders = ({children} : {children:React.ReactNode}) => {
    const { getToken, isLoaded, isSignedIn, userId } = useAuth()
    const [loading,setLoading] = useState(true)
    const { checkAdminStatus } = useAuthStore();
    const { initSocket, disconnectSocket } = useChatStore();

    useEffect(() => {
        if (!isLoaded) return // wait for Clerk to initialize

        const initAuth = async () => {
            if (!isSignedIn) {
                updateApiToken(null)
                setLoading(false)
                return
            }

            try {
                const token = await getToken()
                updateApiToken(token)
                if(token) {
                    await checkAdminStatus();

                    // socket initialization 
                    if(userId) initSocket(userId);
                }
            } catch (error: any) {
                updateApiToken(null)
                console.log('Error in auth provider',error)
            } finally {
                setLoading(false)
            }
        }

        initAuth()

        // clean up 
        return () => disconnectSocket();
        
    },[isLoaded, isSignedIn, getToken])

    if(loading) return (
        <div className='h-screen w-full flex items-center justify-center'>
            <Loader className='size-8 text-emerald-500 animate-spin'/>
        </div>
    )

    return <>{children}</>
}

export default AuthProviders