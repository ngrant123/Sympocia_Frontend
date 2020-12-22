import {refreshTokenApi} from "../Requests/JWTRequests.js";
import {setPersonalProfileAccessToken} from "../Redux/Actions/PersonalProfile.js"; 
import {useDispatch} from "react-redux";

export const refreshTokenApiCallHandle=async(refreshToken,userId,parentApiTrigger,dispatch,parameters,isClassBasedComponent)=>{
	debugger;
	const {confirmation,data}=await refreshTokenApi({
		userId,
		refreshToken
	})
	if(confirmation=="Success"){
		const {message}=data;
		if(isClassBasedComponent!=null){
			dispatch(message);
		}else{
			dispatch(setPersonalProfileAccessToken(message));

		}
		parentApiTrigger({
			...parameters,
			accessToken:message
		});
	}else{
		alert('Unfortunately something has gone wrong. Please log out and sign back in again');
	}
}