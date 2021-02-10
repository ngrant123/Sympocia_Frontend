import {refreshTokenApi} from "../Requests/JWTRequests.js";
import {
	setPersonalProfileAccessToken,
	setPersonalProfileRefreshToken,
	addName
} from "../Redux/Actions/PersonalProfile.js"; 
import {useDispatch} from "react-redux";


let isTokenRefreshingIndicator=false;
export const refreshTokenApiCallHandle=async(refreshToken,userId,parentApiTrigger,dispatch,parameters,isClassBasedComponent,isTokenRefreshing)=>{
	debugger;
	if(isTokenRefreshingIndicator){
		debugger;
		return true;
		setInterval(()=>{
			if(isTokenRefreshingIndicator){
				refreshTokenApiCallHandle(
					refreshToken,
					userId,
					parentApiTrigger,
					dispatch,
					parameters,
					isClassBasedComponent,
					isTokenRefreshing
				);
			}
		},100);	
	}else{
		debugger;
		isTokenRefreshingIndicator=true;
		const {confirmation,data}=await refreshTokenApi({
			userId,
			refreshToken
		})
		debugger;
		if(confirmation=="Success"){
			const {message:{
				accessToken,
				refreshToken
			}}=data;
			const promises=[];
			if(isClassBasedComponent==true){
				const {
					setPersonalProfileAccessToken,
					setPersonalProfileRefreshToken
				}=dispatch;
				promises.push(setPersonalProfileAccessToken(accessToken));
				promises.push(setPersonalProfileRefreshToken(refreshToken));
			}else{
				promises.push(dispatch(setPersonalProfileAccessToken(accessToken)));
				promises.push(dispatch(setPersonalProfileRefreshToken(refreshToken)));
			}


			Promise.all(promises).then(result=>{
				debugger;
				isTokenRefreshingIndicator=false;
				parentApiTrigger({
					...parameters,
					isAccessTokenUpdated:true,
					updatedAccessToken:accessToken
				});
			})
		}else{
			alert('Unfortunately something has gone wrong. Please log out and sign back in again');
		}
	}
}