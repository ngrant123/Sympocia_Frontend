import React,{useState,Component} from "react";
import styled, {keyframes} from "styled-components";
import StampIcon from "../../../../../designs/img/StampIcon.png";
import { Icon, InlineIcon } from '@iconify/react';
import stampIcon from '@iconify/icons-fa-solid/stamp';
import {addStampPost,unStampPost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";

const Container=styled.div`
	position:fixed;
	width:15%;
	height:40%;
	left:83%;
	top:17%;
	border-radius:5px;
	background-color:white;

`;

const ProfilePicture=styled.div`

	position:relative;
	margin-left:2px;
	margin-top:1px;
	width:60px;
	height:15%;
	border-radius:50%;
	background-color:red;

`;

const ViewTipsButton=styled.div`
	border-color:#5298F8;
	border-style:solid;
	border-width:1px;
	color:#5298F8;
	padding:10px;
	text-align:center;
	background-color:white;
	border-radius:5px;

`;

const keyFrame=keyframes`
	  0%{
	    opacity: 0;
	  }
	  10%{
	    opacity:.50;
	    transform-origin: 50% 50%;
	    transform: scale(5);
	    transition: all .3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
	  }
	  100%{
	    opacity:1;
	    transform: scale(1);
	  }

`;
const StampIconEffect=styled.div`
	  height:100px;
	  width:100px;
	  border-radius:5px;
	  position:relative;
	  animation:${keyFrame} 1s ease-in-out 0s forwards;
`;

const StampButtonCSS={
	listStyle:"none",borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	boxShadow:"2px 10px 10px #b9d6ff",
	borderRadius:"5px",
	padding:"10px",
	marginBottom:"5%"
}

/*
	The point for this section is to doing multiple things in the future:
		Offer a tips section,
		Display all contributors working on this document 

*/

const AdditionalInformation=(props)=>{

	const [profilePictureContributors,changeContributors]=useState([{},{},{},{},{}]);
	const [displayStampEffect,changeDisplayStampEffect]=useState(false);

	const createOrRemoveStampEffect=()=>{
		var isPersonalProfile=props.profileType=="personalProfile"?true:false;
		
		//(userId,postId,profileType,postType)
		if(displayStampEffect==false){
			if(isPersonalProfile==true){
				addStampPost(props.blogData.owner,props.blogData._id,"personal","BlogPost");
			}else{
				addStampPost(props.blogData.owner,props.blogData._id,"company","BlogPost");
			}
			changeDisplayStampEffect(true);

		}else{
			if(isPersonalProfile==true){
				unStampPost(props.blogData.owner,props.blogData._id,"personal","BlogPost");
			}else{
				unStampPost(props.blogData.owner,props.blogData._id,"company","BlogPost");
			}
			changeDisplayStampEffect(false);
		}
	}

	return(
		<Container>
			{/*
				<ul style={{padding:"0px"}}>
					<li onClick={()=>createOrRemoveStampEffect()} style={StampButtonCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}> 
								<Icon 
									icon={stampIcon}
									style={{fontSize:30,color:"#5298F8"}}
								/>
							</li>
							<li style={{listStyle:"none",display:"inline-block",color:"#5298F8"}}> 
								Stamp
							</li>
						</ul>
					</li>
					{displayStampEffect==false?
						null:
						<li style={{listStyle:"none"}}>
							<StampIconEffect>
								<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
							</StampIconEffect>
						</li>
					}

					<li style={{listStyle:"none",fontSize:"30px",marginBottom:"3%"}}>
						<b>Contributors</b>
					</li>


					<li style={{listStyle:"none",marginBottom:"10%"}}>
						<ul style={{padding:"0px"}}>
							{profilePictureContributors.map(data=>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",marginBottom:"5%"}}>
									<ProfilePicture/>
								</li>
							)}

						</ul>

					</li>

					<li style={{listStyle:"none"}}>
						<ViewTipsButton>
							View Tips
						</ViewTipsButton>
					</li>
				</ul>
			*/}

		</Container>
	)
}

export default AdditionalInformation;