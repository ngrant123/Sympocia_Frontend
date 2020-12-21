import axios from "axios";

const RefreshTokenURL=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_JWT_TOKEN_URL:
				process.env.REACT_APP_TEST_JWT_TOKEN_URL;


export const refreshTokenApi=async({userId,refreshToken})=>{
	try{
		const refreshTokenResponse=await axios.post(`${RefreshTokenURL}/refreshToken`,{
			userId,
			refreshToken
		})

		const {data}=refreshTokenResponse;
		return data;
	}catch(err){
		return err;
	}
}
