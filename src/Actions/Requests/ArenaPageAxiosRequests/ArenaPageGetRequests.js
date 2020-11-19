import axios from "axios";

const arenaUrl=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_ARENA_GET_URL:
				process.env.REACT_APP_TEST_ARENA_GET_URL;
export const fetchArenaInformation=async(userId)=>{
	try{
		const arenaResponse=await axios.get(`${arenaUrl}/fetchPostArenaInformation`,{
			params:{
				_id:userId
			}
		});
		const {data}=arenaResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const getVideoReactions=async({arenaId,textCounter,postType})=>{
	try{
		const videoReactionResponse=await axios.get(`${arenaUrl}/videoReactions`,{
			params:{
				arenaId,
	            textCounter,
	            postType
			}
		});
		const {data}=videoReactionResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const getTextComments=async({textCounter,postType})=>{
	try{
		const textReactionResponse=await axios.get(`${arenaUrl}/textComments`,{
			params:{
			    textCounter,
            	postType
			}
		});
		const {data}=textReactionResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const getPreviousWinners=async({previousWinnerPageCounter,postType})=>{
	try{
		const previousWinnersResponse=await axios.get(`${arenaUrl}/previousWinners`,{
			params:{
				previousWinnerPageCounter,
            	postType
			}
		});
		const {data}=previousWinnersResponse;
		return data;
	}catch(err){
		return err;
	}
}

export const getCurrentArenaPosts=async({postPageCounter,postType})=>{
	try{
		const postsResponse=await axios.get(`${arenaUrl}/currentArenaPostApi`,{
			params:{
				postPageCounter,
            	postType
			}
		});
		const {data}=postsResponse;
		return data;
	}catch(err){
		return err;
	}
}



