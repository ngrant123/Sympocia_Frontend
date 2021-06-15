import React,{useState} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";


const CommentContainer=styled.div`
	display:flex;
	flex-direction:row;
	height:200px;
	margin-bottom:5%;
	padding:20px;
	border-radius:5px;
	overflow-y:scroll;
	display:flex;
	flex-direction:row;
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
  marginRight:"4%",
  cursor:"pointer",
  width:"30%"
}
const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	marginRight:"5px",
	borderRadius:"5px",
	borderStyle:"none",
	marginRight:"10%",
	marginBottom:"2%",
	cursor:"pointer"
}

const HorizontalLineCSS={
	marginLeft:"0",
	position:"relative",
	marginRight:"0"
}

const ExtendedOligarichElectionCard=({closeOligarchCardModal,electionCardInformation})=>{
	const [comments,changeComments]=useState([{
		firstName:"Nathan",
		electionSpeech:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},{

	},{

	},{

	}]);
	const [displayComments,changeDisplayComments]=useState(false);
	const [isSponsored,changeIsSponsored]=useState(false);

	const comment=(commentData)=>{
		return(
			<CommentContainer>
				<img src={commentData.profilePicture==null?
					NoProfilePicture:commentData.profilePicture}
					style={{width:"50px",height:"50px",borderRadius:"50%"}}
				/>
				<div style={{marginLeft:"5%",display:"flex",flexDirection:"column"}}>
					<p>
						<b>{commentData.firstName}</b>
					</p>
					<p>{commentData.electionSpeech}</p>
				</div>
			</CommentContainer>
		)
	}

	const sponsorUser=()=>{
		changeIsSponsored(true);
	}

	const unSponsoreUser=()=>{
		changeIsSponsored(false);
	}
	return(
		<React.Fragment>
			<div onClick={()=>closeOligarchCardModal()} style={ButtonCSS}>
				Back
			</div>
			<div style={{marginTop:"5%",display:"flex",flexDirection:"row"}}>
				<img src={electionCardInformation.profilePicture==null?
					NoProfilePicture:
					electionCardInformation.profilePicture} 
					style={{borderRadius:"50%",width:"100px",height:"100px"}}
				/>
				<div style={{marginLeft:"5%",display:"flex",flexDirection:"column"}}>
					<div style={{display:"flex",flexDirection:"row"}}>
						<p>	
							<b>{electionCardInformation.firstName}</b>
						</p>
					</div>
					<p>{electionCardInformation.electionSpeech}</p>
					<div style={{display:"flex",flexDirection:"row"}}>
						{isSponsored==true?
							<div onClick={()=>unSponsoreUser()} style={ShadowButtonCSS}>
								UnSponsor
							</div> 
							:<div onClick={()=>sponsorUser()} style={ShadowButtonCSS}>
								Sponsor
							</div>
						}
						{displayComments==true?
							<div onClick={()=>changeDisplayComments(false)} style={ShadowButtonCSS}>
								Hide Comments
							</div>
							:<div onClick={()=>changeDisplayComments(true)} style={ShadowButtonCSS}>
								View Comments
							</div>
						}
					</div>
				</div>
			</div>
			<hr style={HorizontalLineCSS}/>
			{displayComments==true &&(
				<div>
					{comments.map(data=>
						<>{comment(data)}</>
					)}
				</div>
			)}
		</React.Fragment>
	)
}

export default ExtendedOligarichElectionCard;