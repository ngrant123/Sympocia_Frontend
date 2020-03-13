import axios from "axios";


export const createRegularPost=(userId,postContent)=>{
	const CreateURl='http://localhost:4000/api/posts/alter/createRegularPost';

	axios.post(`${CreateURl}/createRegularPost`,{
			_id:userId,
			content:postContent
	}).then(post=>{
		return post;
	}).catch(err=>{
		console.log(err);
		return err;
	})

}