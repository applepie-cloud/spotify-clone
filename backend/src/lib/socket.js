import { Server } from "socket.io";
import { Message } from "../models/messageModel.js";

export const intializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors : {
            origin : "https://localhost:3000",
            credentials : true
        }
    })
    const userSocket = new Map();
    const userActivities = new Map();

    io.on("connection", (socket) => {
        socket.on("user_conected", (userId) => {
            userSocket.set(userId, socket.id);
            userActivities.set(userId, 'Idle');

            io.emit("user_connected",userId);

            socket.emit("user_online",Array.from(userSocket.keys()));
            io.emit("activities",Array.from(userActivities.entries()));

            socket.on("update_activity", (userId,activity) => {
                userActivities.set(userId,activity);
                io.emit("activity_updated",{userId,activity});
            })

            socket.on("send_message", async (data) => {
                try{
                    const {senderId, recieverId, content } = data;
                    const message = await Message.create({
                        senderId,
                        recieverId,
                        content
                    });

                    const recieverSocketId = userSocket.get(recieverId);
                    if(recieverSocketId) {
                        io.to(recieverSocketId).emit("receive_message",message);
                    }
                    socket.emit("message_sent",message);
                } catch(error) {
                    console.log("error occured", error);
                    socket.emit("error_message", error.message);
                } 
            })

            socket.on("disconnect", () => {
                let disconnectedUserId;
                for( const [userId, SocketId] of userSocket.entries()) {
                    if(SocketId == socket.id) {
                        disconnectedUserId = userId;
                        userSocket.delete(userId);
                        userActivities.delete(userId);
                        break;
                    }
                }
                if(disconnectedUserId) {
                    io.emit("user_disconnected", disconnectedUserId);
                }
            })
        })
    })
}