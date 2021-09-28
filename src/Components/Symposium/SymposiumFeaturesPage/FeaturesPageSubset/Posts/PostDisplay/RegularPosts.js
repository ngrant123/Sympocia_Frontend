import React from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Container=styled.div`
	display:flex;
	flex-direction:column;
	flex-wrap:wrap;

	@media screen and (max-width:1370px){
		margin-top:5%;
		#textPost{
			font-size:25px !important;
		}
	}

	@media screen and (max-width:650px){
		#textPost{
			font-size:15px !important;
		}
		#profilePicture{
			width:37px !important;
			height:35px !important;
		}
	}
`;

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%",
	height:"1px"
}

const TextPostCSS={
	cursor:"pointer",
	display:"flex",
	flexDirection:"row",
	marginRight:"8%",
	marginBottom:"5%",
	alignItems:"center"
}

const RegularPosts=({posts,triggerDisplaySelectedPost,isBeaconParentComponent})=>{
	console.log(posts);
	return(
		<Container>
			{posts.length==0?
				<p>No posts</p>:
				<React.Fragment>
					{posts.map((data,index)=>
						<React.Fragment>
							<div style={TextPostCSS}
								onClick={()=>triggerDisplaySelectedPost(data,index)}>
								<div style={{display:"flex",flexDirection:"column"}}>
									<img id="profilePicture" src={data.owner.profilePicture==null?
												NoProfilePicture:
												data.owner.profilePicture
											} 
										style={{height:"45px",width:"50px",borderRadius:"50%"}}
									/>
									{data.acceptedAnswerStatus==true &&(
										<CheckCircleIcon
											id="checkMarkIcon"
											style={{color:"#43D351",fontSize:"36"}}
										/>
									)}
								</div>
								<div style={{display:"flex",flexDirection:"column",marginLeft:"5%"}}>
									<p>
										<b>{data.owner.firstName}</b>
									</p>
									{data.isAudioPost==true?
										<audio key={data._id} controls>
											  <source src={data.post} type="audio/ogg"/>
											  <source src={data.post} type="audio/mp4"/>
												Your browser does not support the audio element.
										</audio>
										:<p id="textPost" style={{maxHeight:"60px",overflow:"hidden"}}>
											{data.post}
										</p>
									}
									{isBeaconParentComponent==true &&(
										<p>
											<b>
												<span style={{color:"#43D351",marginRight:"5%"}}>
													{data.beaconRepliesCount}
												</span> 
												beacon replies
											</b>
										</p>
									)}
								</div>
							</div>
							<hr style={HorizontalLineCSS}/>
						</React.Fragment>
					)}
				</React.Fragment>
			}
		</Container>
	)
}

export default RegularPosts;