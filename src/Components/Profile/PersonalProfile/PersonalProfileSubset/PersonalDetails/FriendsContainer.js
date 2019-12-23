import React, {useEffect} from "react";
import styled from "styled-components";



const FriendsProfilePicture=styled.div`
	position:relative;
	margin-bottom:5px;
	width:40px;
	height:40px;
	top:4px;
	border-radius:50%;
	overflow:hidden;
	border-style:solid;
	border-width:2px;
	border-color:#5298F8;
`;


const FriendsContainer=(props)=>{

	return(

		<React.Fragment>
			<FriendsProfilePicture>

				<img id="friendProfileImage" src={props.friendImage} stlye={{borderRadius:"50%"}} height="40px" width="40px"/>
			
			</FriendsProfilePicture>
			<p style={{position:"relative",color:"#5298F8",overflow:"hidden"}}>{props.friendName}</p>
		</React.Fragment>
	)
}


export default FriendsContainer;

