import React from "react";
import styled from "styled-components";
import TestImage from "../../../../../designs/postimages/Notcameraactivated.png";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";

const Container=styled.div`
	margin-top:5%;
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
`;

const ProfileInformation=styled.div`
	display:flex;
	flex-direction:row;
	margin-top:2%;
	justify-content:cetner;
	align-items:center;
`;

const OwnerNameCSS={
	marginLeft:"2%",
	color:"#ADADAD",
	maxHeight:"20px",
	maxWidth:"30%",
	overflow:"hidden"
}
const BeaconPosts=({postType,posts,displayExtendedPostModal,
					triggerAlterPosts,endOfNewPosts,isFetchingNextPosts})=>{
	console.log(posts);
	console.log(postType);
	console.log(endOfNewPosts);
	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}


	const postsDecider=()=>{
		switch(postType){
			case "Images":{
				return(
					<React.Fragment>
						{posts.map(data=>
							<div onClick={()=>displayExtendedPostModal(data)}
								style={{cursor:"pointer",marginRight:"3%",width:"30%",marginBottom:"10%"}}>	
								<img src={data.post.imgUrl} style={{width:"140px",height:"130px",borderRadius:"5px"}}/>
								<ProfileInformation>
									<img src={data.post.owner.profilePicture==null?
												NoProfilePicture:data.post.owner.profilePicture}
										style={{
											width:"50px",
											height:"40px",
											borderRadius:"50%"
										}}/>
									<p style={OwnerNameCSS}>
										{data.post.owner.firstName}
									</p>
								</ProfileInformation>
								<p style={{width:"100%",height:"40px",overflow:"hidden",marginTop:"5%"}}>
									<b>
										{data.post.caption}
									</b>
								</p>
							</div>
						)}
					</React.Fragment>
				)
				break;
			}
			case "Videos":{
				return(
					<React.Fragment>
						{posts.map(data=>
							<div onClick={()=>displayExtendedPostModal(data)} 
								style={{height:"250px",cursor:"pointer",marginRight:"3%",width:"30%",marginBottom:"15%"}}>
								<video 
									style={{borderRadius:"5px",backgroundColor:"#151515",cursor:"pointer"}}
									 position="relative" width="100%" height="90%"
								 	key={data.post.videoUrl} autoPlay loop autoBuffer muted playsInline>
									<source src={data.post.videoUrl} type="video/mp4"/>
								</video>	
								<ProfileInformation>
									<img src={data.post.owner.profilePicture==null?
											NoProfilePicture:
											data.post.owner.profilePicture
										} style={{
																width:"50px",
																height:"40px",
																borderRadius:"50%"
															}}/>
									<p style={OwnerNameCSS}>
										{data.post.owner.firstName}
									</p>
								</ProfileInformation>
								<p style={{width:"100%",height:"40px",overflow:"hidden",marginTop:"5%"}}>
									<b>
										{data.post.title}
									</b>
								</p>
							</div>
						)}
					</React.Fragment>
				)
				break;
			}
			case "Regular":{
				return(
					<React.Fragment>
						{posts.map(data=>
							<div onClick={()=>displayExtendedPostModal(data)}
								style={{cursor:"pointer",marginRight:"3%",width:"100%",marginBottom:"5%"}}>
								<p style={{width:"100%",height:"80px",overflow:"hidden",marginTop:"5%"}}>
									<b>
										{data.post.post}
									</b>
								</p>
								<ProfileInformation>
									<img src={data.post.owner.profilePicture==null?
												NoProfilePicture:
												data.post.owner.profilePicture
											} style={{
																width:"50px",
																height:"40px",
																borderRadius:"50%"
															}}/>
									<p style={OwnerNameCSS}>
										{data.post.owner.firstName}
									</p>
								</ProfileInformation>
							</div>
						)}
					</React.Fragment>
				)
				break;
			}
		}

	}
	return(
		<Container>
			{posts.length==0?
				<p>No beacons :(</p>:
				<React.Fragment>
					{postsDecider()}
					{endOfNewPosts==false &&(
						<>
							{isFetchingNextPosts==true?
								<p>Loading...</p>:
								<p onClick={()=>triggerAlterPosts(postType)} 
									style={{cursor:"pointer",color:"#5298F8"}}>
									Next
								</p>
							}
						</>
					)}
				</React.Fragment>
			}
		</Container>
	)
}

export default BeaconPosts;