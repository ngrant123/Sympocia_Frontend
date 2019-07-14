export function sendUsersNewsFeedAddition(newsfeed,userId){

	axios.put(`${baseurl}/InsertNewsFeed`, { params: 
			{ 
				newsFeed: newsfeed,
				id: userId
			}
		}).
		then(response=>{

			console.log(response.data);

		}).
		catch(err=>{

			console.log(err.message);
		})

}