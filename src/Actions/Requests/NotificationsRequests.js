import axios from "axios";

const NotificationUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_NOTIFICATION_URL:
				process.env.REACT_APP_TEST_NOTIFICATION_URL;

export const notificationStatusCheck=async(userId)=>{
	try{
		const notificationStatusResponse=await axios.get(`${NotificationUrl}/notificationCheck`,{
			params:{
				ownerId:userId
			}
		})

		const {data}=notificationStatusResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const getNotifications=async(ownerId,notificationsType)=>{
	try{
		const notificationsResponse=await axios.get(`${NotificationUrl}/getNotifications`,{
			params:{
				ownerId,
				notificationsType
			}
		})

		const {data}=notificationsResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const clearNewNotifications=async(ownerId)=>{
	try{
		const clearedNewNotificationsResponse=await axios.post(`${NotificationUrl}/clearNewNotifications`,{
			ownerId
		});
		const {data}=clearedNewNotificationsResponse;
		return data;
	}catch(err){
		return err;
	}
}