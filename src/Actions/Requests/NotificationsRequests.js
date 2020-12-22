import axios from "axios";

const NotificationUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_NOTIFICATION_URL:
				process.env.REACT_APP_TEST_NOTIFICATION_URL;

export const notificationStatusCheck=async(userId,accessToken)=>{
	try{
		debugger;
		const notificationStatusResponse=await axios.get(`${NotificationUrl}/notificationCheck`,{
			params:{
				ownerId:userId
			},
			headers:{
				authorization:accessToken
			}
		})

		const {data}=notificationStatusResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const getNotifications=async(ownerId,notificationsType,accessToken)=>{
	try{
		const notificationsResponse=await axios.get(`${NotificationUrl}/getNotifications`,{
			params:{
				ownerId,
				notificationsType
			},
			headers:{
				authorization:accessToken
			}
		})



		const {data}=notificationsResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const clearNewNotifications=async(ownerId,accessToken)=>{
	try{
		const clearedNewNotificationsResponse=await axios.post(`${NotificationUrl}/clearNewNotifications`,{
			    ownerId,
            },
    		{
                headers:{
                    authorization:accessToken
                }
            }
        );
		const {data}=clearedNewNotificationsResponse;
		return data;
	}catch(err){
		return err;
	}
}