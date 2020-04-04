import axios from "axios";


export const createRegularPost=async(userId,postContent,industry,subComunity)=>{
	const CreateURl='http://localhost:4000/api/posts/alter';
	try{
			console.log("Regular post creation api working");
			const regularPostCreationVerification=await axios.post(`${CreateURl}/createRegularPost`,{
														id:userId,
														content:postContent,
														subCommunity:subComunity,
														industry:industry
												});

			const results=regularPostCreationVerification.data;
			return results; 
	}catch(err){
		console.log(err);
		return err;
	}
}