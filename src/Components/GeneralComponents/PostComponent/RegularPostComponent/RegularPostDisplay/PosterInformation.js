import React,{useState} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {
	addStampPost,
	unStampPost,
	deletePost
} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import StampIcon from "../../../../../designs/img/StampIcon.png";
import {StampIconEffect} from "../../ImageComponent/ImageDisplay/ImageContainerCSS.js";

const PostInformationContainer=styled.div`
	position:relative;
	height:90%;
	width:330px;
`;

const PostProfilePicture=styled.div`
	position:relative;
	width:110px;
	height:100px;
	border-radius:50%;
	left:40%;
	margin-top:10%;
	top:10%;
	border-style:solid;
	border-width:5px;
	border-color:#5298F8;
	overflow:hidden;

`;

const IndustryButton=styled.div`
	position:relative;
	background-color:#5298F8;
	left:25%;
	text-align:center;
	width:160px;
	padding:10px;
	color:white;
	border-style:solid;
	border-width:1px;
	border-color:#0857c2;
	border-radius:5px;
	transition:.8s;

	&:hover{
		background-color:#0857c2;
	}
`;

const NameContainer=styled.div`
	position:relative;
	left:30%;
	text-align:center;
	width:160px;
	padding:10px;
	color:black;
	transition:.8s;
	font-size:20px;

`;

const DateContainer=styled.div`
	position:relative;
	left:30%;
	text-align:center;
	width:160px;
	padding:10px;
	color:black;
	transition:.8s;
	font-size:15px;
`;


const SocialMedaIcon=styled.div`
	position:relative;
	width:40px;
	height:40px;
	background-color:blue;
	border-radius:50%;

`;
const LabelContainer=styled.div`
	position:relative;
	background-color:white;
	text-align:center;
	padding:10px;
	color:#5298F8;
	border-style:solid;
	border-width:1px;
	border-color:#0857c2;
	border-radius:5px;
	transition:.8s;
	width:60px;
	overflow:scroll;
	&:hover{
		background-color:#0857c2;
	}
`;

const EditPostButtonCSS={
	listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginBottom:"2%"
}
	
	

const PosterInformation=(props)=>{

	const {	
		owner,
		industriesUploaded,
		datePosted,
		_id,
		contextLocation
	}=props.postData;

	const [displayStampEffect,changeDisplayStampEffect]=useState(false);
	const constructDate=(dateMilliseconds)=>{
		const newDate=new Date(dateMilliseconds).toLocaleDateString();
		return newDate;
	}

	const createOrRemoveStampEffect=()=>{
		debugger;
		if(displayStampEffect==false){
			addStampPost(_id,"personal","RegularPost");
			changeDisplayStampEffect(true);
		}else{
			unStampPost(_id,"personal","RegularPost");
			changeDisplayStampEffect(false);
		}
	}
	return(

		<PostInformationContainer>
						<ul style={{position:"absolute",listStyle:"none"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									{(props.pageType=="personalProfile" && props.isOwnPostViewing==true) &&(
										<li onClick={()=>props.triggerEditPostModal()} style={EditPostButtonCSS}>
											Edit Post
										</li>
									)}
									{displayStampEffect==true &&(
										<li style={{position:"relative",listStyle:"none",zIndex:"20"}}>
											<StampIconEffect
												id="stampEffect"
											>
												<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
											</StampIconEffect>
										</li>
									)}
								</ul>
							</li>
				
							{owner!=null &&(
								<>
									<li style={{listStyle:"none"}}>
										<PostProfilePicture>
											<img src={owner.profilePicture==null?
												NoProfilePicture:
												owner.profilePicture
											} style={{width:"100%",height:"100"}}/>
										</PostProfilePicture>
									</li>

									<li style={{listStyle:"none"}}>
										<NameContainer>
											{owner.firstName}
										</NameContainer>
									</li>
								</>
							)}

							<li style={{listStyle:"none",left:"15%",marginBottom:"2%",height:"20%",overflowY:"auto"}}>
					
								<ul style={{padding:"0px"}}>
									{industriesUploaded.map(data=>
										<li style={{listStyle:"none"}}>
											<IndustryButton>
												{industriesUploaded[0].industry}
											</IndustryButton>
										</li>
									)}
								</ul>
							</li>

							<li style={{listStyle:"none",left:"20%"}}>

								<DateContainer>
									Posted {constructDate(datePosted)}
								</DateContainer>
							</li>

							<li style={{listStyle:"none",position:"relative",left:"25%"}}>
								<ul style={{padding:"0px"}}>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>createOrRemoveStampEffect()} style={{listStyle:"none",display:"inline-block",marginRight:"20%"}}>
											<LabelContainer>
												Stamp
											</LabelContainer>	
										</li>
									</a>
									{(props.pageType=="personalProfile" && props.isOwnPostViewing==true) &&(
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>props.triggerPromoteModal(_id,"RegularPosts")}
												style={{listStyle:"none",display:"inline-block"}}>
												<LabelContainer>
													Promote
												</LabelContainer>	
											</li>
										</a>
									)}
								</ul>
							</li>

							{(props.pageType=="personalProfile" && props.isOwnPostViewing==true) &&(
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>props.deletePost()} style={{listStyle:"none",marginBottom:"2%",marginLeft:"60%"}}>
										<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler 
											icon-tabler-trash" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#151515" fill="none" stroke-linecap="round" stroke-linejoin="round">
										  <path stroke="none" d="M0 0h24v24H0z"/>
										  <line x1="4" y1="7" x2="20" y2="7" />
										  <line x1="10" y1="11" x2="10" y2="17" />
										  <line x1="14" y1="11" x2="14" y2="17" />
										  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
										  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
										</svg>
									</li>
								</a>
							)}
						</ul>
					</PostInformationContainer>

	)
}

export default PosterInformation;