import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand'
import type { Message,User } from '@/types/index';
import { io } from 'socket.io-client';

interface ChatStore {
    users: User[];
    fetchUsers: () => Promise<void>;
    isLoading: boolean;
    socket : any;
    isConnected : boolean;
    onlineUsers : Set<string>;
    userActivities : Map <string,string>;
    messages : Message[];
    error: string | null;
    selectedUser : User | null;
    fetchMessages : (userId : string) => Promise<void>;
    initSocket : (userId : string) => void;
    disconnectSocket : () => void;
    sendMessage : (recieverId : string, senderId : string, content : string) => void;
    setSelectedUser : (user : User | null ) => void;
}

const baseURL = "https://localhost:5000";
const socket = io(baseURL, {
    autoConnect : false,
    withCredentials : true,
});
export const useChatStore = create<ChatStore>((set, get) => ({
    users: [],
    isLoading : false,
    error : null,
    socket : null,
    isConnected : false,
    onlineUsers : new Set(),
    userActivities : new Map(),
    messages : [],
    selectedUser : null,

    initSocket : (userId : string) => {
        if(!get().isConnected) {
            socket.auth = {userId};
            socket.connect();
            set({ socket });
            socket.emit("user_connected",userId);
        }

        socket.on("user_online", (users:string[]) => {
            set({ onlineUsers : new Set(users) })
        })

        socket.on("activities",(activities : [string,string][]) => {
            set({userActivities : new Map(activities)});
        })

        socket.on("user_connnected", (userId : string) => {
            set((state) => ({
                onlineUsers :  new Set([...state.onlineUsers, userId])
            }));
        });

        socket.on("user_disconnected", (userId : string) => {
            set((state) => {
                const newOnlineUsers = new Set(state.onlineUsers);
                newOnlineUsers.delete(userId);
                return { onlineUsers : newOnlineUsers };
            });
        });

        socket.on("recive_message", (message : Message) => {
            set((state) => ({
                messages : [...state.messages, message], 
            }))
        })

        socket.on("recive_sent", (message : Message) => {
            set((state) => ({
                messages : [...state.messages, message], 
            }))
        })

        socket.on("activity_update", ([userId, activity]) => {
            set((state) => {
                return { userActivities : new Map(state.userActivities.set(userId, activity)) };
            })
        })

        set({ isConnected : true });
    },
    disconnectSocket : () => {
        if(get().isConnected) {
            socket.disconnect();
            set({ isConnected : false});
        }
    },
    sendMessage : async (recieverId : string, senderId : string, content : string) => {
        const socket = get().socket;
        if(!socket) return;
        
        socket.emit("send_message", { recieverId, senderId, content });
    },
    fetchMessages : async (userId : string) => {
        set({ isLoading : true , error : null });
        try {
            const response = await axiosInstance.get(`/users/messages/${userId}`);
            set( { messages : response.data });
        } catch (error: any ) {
            set({ error : error.response?.data?.message ?? error.message });
        } finally {
            set({ isLoading : false })
        }
    },
    fetchUsers : async() => {
        
        set({ isLoading : true, error : null });
        try {
            const response = await axiosInstance.get('/users');
            set({ users: response.data })
        } catch (err : any) {
            set({ error : err.response.data.message })
        } finally {
            set({ isLoading : false })
        }
    },
    setSelectedUser : (user) => {
        set({ selectedUser : user })
    } 
}))