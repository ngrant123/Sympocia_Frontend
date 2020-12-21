import {refreshTokenApi} from "../JWTRequests.js";
import {setPersonalProfileAccessToken} from "../Redux/Actions/PersonalProfile.js"; 

export const refreshTokenApiCallHandle=async(refreshToken,userId,parentApiTrigger)=>{
	const {confirmation,data}=await refreshTokenApi({
		userId,
		refreshToken
	})
	if(confirmation=="Success"){
		const {message}=data;
		await dispatch(setPersonalProfileAccessToken(message));
		parentApiTrigger();
	}else{
		alert('Unfortunately something has gone wrong. Please log out and sign back in again');
	}
}