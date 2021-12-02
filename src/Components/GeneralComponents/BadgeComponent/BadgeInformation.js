import React,{useEffect,useState} from "react";
import styled from "styled-components";
import {retrieveBadgeInformation} from "../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";

const BadgeInformation=({profileId})=>{
	const [isLoading,changeLoadingStatus]=useState(true);
	const [badgeInformation,changeBadgeInformation]=useState();

	useEffect(()=>{
		const fetchBadgeInformation=async()=>{
			const {confirmation,data}=await retrieveBadgeInformation(profileId);
			if(confirmation=="Success"){
				const {message}=data;
				changeBadgeInformation(message);
			}else{
				alert('Unfortunately there has been an error retrieving this badge information. Please try again');
			}
			changeLoadingStatus(false);
		}
		fetchBadgeInformation();
	},[]);

	const postsDecider=(data)=>{
		switch(badgeInformation.badgePostType){
			case "Images":{
				return(
					<img src={data.imgUrl} 
						style={{position:"relative",width:"120px",height:"120px",borderRadius:"5px"}}
					/>
				)
			}
			case "Videos":{
				return(
					<video id="videoElement"
						style={{borderRadius:"5px",backgroundColor:"#151515",cursor:"pointer"}}
						 position="relative" width="100%" height="100%"
					 	key={data.videoUrl} autoPlay loop autoBuffer muted playsInline>
						<source src={data.videoUrl} type="video/mp4"/>
					</video>
				)
			}
			case "Text":{
				return(
					<>
						{data.isAudioPost==true?
							<audio id="audio" controls>
							 	<source src={data.post} type="audio/ogg"/>
							  	<source src={data.post} type="audio/mp4"/>
								Your browser does not support the audio element.
							</audio>
							:
							<>{data.post}</>
						}
					</>
				)
			}

			case "Blog":{
				return(
					<img id="headerBlogLI"
						src={data.blogImageUrl} style={{borderRadius:"5px",position:"relative",width:"100%",height:"100%"}}
					/>
				)
			}
		}
	}

	return(
		<React.Fragment>
			{isLoading==true?
				<p>Loading...</p>:
				<React.Fragment>
					{badgeInformation==null?
						<p>No badge information</p>:
						<React.Fragment>
							<p style={{fontSize:"18px"}}>
								<b>{badgeInformation.caption}</b>
							</p>
							<hr/>
							<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
								{badgeInformation.badgePosts.map(data=>
									<div style={{marginRight:"2%",marginBottom:"2%"}}>
										{postsDecider(data)}
									</div>
								)}
							</div>
						</React.Fragment>
					}
				</React.Fragment>
			}
		</React.Fragment>
	)
}


export default BadgeInformation;