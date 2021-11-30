import React,{useState,useRef,useEffect} from "react";
import styled from "styled-components";
import {
	editBadgeCaption,
	removePostFromBadge
} from "../../../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:80%;
	height:50px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const ButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	marginLeft:"2%"
}

const DeleteButtonCSS={
	...ButtonCSS,
	marginLeft:"0%",
	marginTop:"5%",
	color:"white",
	backgroundColor:"#F70428",
	borderStyle:"none"
}

const BadgeInformation=({badgeInformation,displayAppropriateComponentName,profileId})=>{
	const [badgePosts,changeBadgePosts]=useState(badgeInformation.badgePosts);
	const [currentBadgeType,changeBadgeType]=useState(badgeInformation.badgePostType);
	const [caption,changeCaption]=useState(badgeInformation.caption);
	const [submittingEditedCaptionStatus,changeSubmittingEditedCaptionStatus]=useState(false);

	useEffect(()=>{
		if(submittingEditedCaptionStatus==false){
			updateCaption(caption);
		}
	},[submittingEditedCaptionStatus]);

	const updateCaption=(caption)=>{
		document.getElementById("badgeCaption").value=caption;
	}

	const editCaptionHandle=async()=>{
		const updatedCaption=document.getElementById("badgeCaption").value;
		changeSubmittingEditedCaptionStatus(true);
		if(updateCaption==caption){
			alert('Please update caption');
		}else{		
			const {confirmation,data}=await editBadgeCaption(
												badgeInformation._id,
												profileId,
												updatedCaption);
			if(confirmation=="Success"){
				alert('Caption updated');
				changeCaption(updatedCaption);
			}else{
				alert('Unfortunately an error has error when editing the caption. Please try again');
			}
		}
		changeSubmittingEditedCaptionStatus(false);
	}

	const postsDecider=(data)=>{
		switch(currentBadgeType){
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
	const deletePostHandle=async(postId,deletionRef)=>{
		deletionRef.current.innerHTML="Please wait...";
		const {confirmation,data}=await removePostFromBadge(badgeInformation._id,postId);
		if(confirmation=="Success"){
			alert('Post deleted from badge');
			deletePostFromState(postId);
		}else{
			alert('Unfortunately there has been an error deleting this post from the badge. Please try again');
		}
		deletionRef.current.innerHTML="Delete";
	}
	const deletePostFromState=(postId)=>{
		for(var i=0;i<badgePosts.length;i++){
			if(postId==badgePosts[i]._id){
				badgePosts.splice(i,1);
			}
		}
		changeBadgePosts([...badgePosts]);
	}

	const Post=({data})=>{
		const deletionRef=useRef();
		return(
			<div style={{display:"flex",flexDirection:"column",marginRight:"2%",marginBottom:"2%"}}>
		 		{postsDecider(data)}
		 		<p ref={deletionRef} style={{marginTop:"10%",color:"#5298F8",cursor:"pointer"}}
		 			onClick={()=>deletePostHandle(data._id,deletionRef)}>Delete</p>
		 	</div>
		)
	}

	return(
		<React.Fragment>
			<div>
				<p>
					<b>Badge Caption:</b>
				</p>
				<div style={{display:"flex",flexDirection:"row"}}>
					{submittingEditedCaptionStatus==true?
						<p>Please wait...</p>:
						<React.Fragment>
							<InputContainer id="badgeCaption"
								placeholder="Enter Badge Caption here"
							/>
							<div style={ButtonCSS} onClick={()=>editCaptionHandle()}>
								Edit
							</div>
						</React.Fragment>
					}
				</div>
			</div>
			<div style={{...ButtonCSS,marginLeft:"0%",marginTop:"5%"}}
				onClick={()=>displayAppropriateComponentName("postTypeChange")}>
				Change Badge Post-Type
			</div>

			<div style={{marginTop:"10%"}}>
				<p>
					<b>Posts:</b>
				</p>
				<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
					{badgePosts.length==0?
						<p>No posts</p>:
						<>
							{badgePosts.map(data=>
								<Post data={data}/>
							)}
						</>
					}
				</div>
			</div>
			<hr/>
			<div style={DeleteButtonCSS} onClick={()=>displayAppropriateComponentName("deletion")}>
				Delete Badge
			</div>


		</React.Fragment>
	)
}

export default BadgeInformation;