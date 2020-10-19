import axios from "axios";


/*
    addTextReactionToPostArena,
    addVideoReactionToPostArena,
    setCompetitionStartDate,
    setCompetitionEndDate,
    addBoostToPost,
    addStampToTextReaction,
    addStampToVideoReaction,
    removeVideoReactionComment,
    removeTextReactionComment,
    removePostArena
*/
const arenaUrl='http://localhost:4000/api/arena/alter'
export const addTextReaction=async(textReaction)=>{
	try{
		const {
			ownerId,
            post,
            postType,
            arenaId
		}=textReaction;
		const textResponse=await axios.post(`${arenaUrl}/addTextReactionToPostArena`,{
			ownerId,
            post,
            postType,
            arenaId
		});
		const {data}=textResponse;
		return data;

	}catch(err){
		console.log(err);
		return err;
	}
}

export const addVideoReaction=async(videoReaction)=>{
	try{
		const {
            videoUrl,
            ownerId,
            postType,
            arenaId
		}=videoReaction;

		const videoResponse=await axios.post(`${arenaUrl}/addVideoReactionToPostArena`,{
            videoUrl,
            ownerId,
            postType,
            arenaId
		});
		const {data}=videoResponse;
		return data;

	}catch(err){
		console.log(err);
		return err;
	}
}

 export const addBoost=async(boostInformation)=>{
	try{
		const {
         	postId,
            score,
            postType,
            arenaId,
            userId
		}=boostInformation;

		const boostResponse=await axios.post(`${arenaUrl}/addBoostToPost`,{
         	postId,
            score,
            postType,
            arenaId,
            userId
		});
		const {data}=boostResponse;
		return data;
	}catch(err){
		console.log(err);
		return err;
	}
}

 export const addStampToTextReaction=async(textStampInformation)=>{
	try{

		const {
            textId,
            previousStampCount,
            postType,
            arenaId
		}=textStampInformation;

		const textStampResponse=await axios.post(`${arenaUrl}/addStampToTextReaction`,{
            textId,
            previousStampCount,
            postType,
            arenaId
		});
		const {data}=textStampResponse;
		return data;

	}catch(err){
		console.log(err);
		return err;
	}
}

export const addStampToVideoReaction=async(videoStampInformation)=>{
	try{
		const {
            videoId,
            previousStampCount,
            postType,
            arenaId
		}=videoStampInformation;

		const videoStampResponse=await axios.post(`${arenaUrl}/addStampToVideoReaction`,{
            videoId,
            previousStampCount,
            postType,
            arenaId
		});
		const {data}=videoStampResponse;
		return data;


	}catch(err){
		console.log(err);
		return err;
	}
}

export const removeVideoReaction=async({_id,arenaId,postType})=>{
	try{
		const removedVideoReactionResponse=await axios.post(`${arenaUrl}/removeVideoReactionComment`,{
            _id,
            arenaId,
            postType
		});
		const {data}=removedVideoReactionResponse;
		return data;
	}catch(err){
		console.log(err);
		return err;
	}
}

export const removeTextReaction=async({_id,arenaId,postType})=>{
	try{
		const removedTextReactionResponse=await axios.post(`${arenaUrl}/removeTextReactionComment`,{
            _id,
            arenaId,
            postType
		});
		const {data}=removedTextReactionResponse;
		return data;
	}catch(err){
		console.log(err);
		return err;
	}
}


//The two methods below will probably not be used 
const setArenaStartDate=()=>{

}

const setArenaEndDate=()=>{

}