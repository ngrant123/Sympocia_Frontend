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

const Container=styled.div`
	position:relative;
	margin-bottom:5px;
	heigtht:40%;
	width:55px;
	top:4px;
	overflow:hidden;
	border-radius:5%;
	padding-left:5px;
	transition:.8s;

	&:hover{
		box-shadow: 10px 10px 20px 	#dbdddf;

	}
`;


const FriendsContainer=(props)=>{


	return(

		<React.Fragment>

			<Container>
				<FriendsProfilePicture>

					<img id="friendProfileImage" src={props.friendImage} style={{height:"40px",width:"40px"}}/>
				
				</FriendsProfilePicture>

				<p style={{position:"relative",color:"#5298F8",overflow:"hidden"}}>{props.friendName}</p>
			</Container>
		</React.Fragment>
	)
}


export default FriendsContainer;

