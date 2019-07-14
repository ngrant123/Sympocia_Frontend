import React,{Component} from "react";
import styled from "styled-components";
import { PropTypes } from "prop-types";

const Container = styled.div`

	position:absolute;
	width:15%
	height:93%;
	top:3%;
`;

const FriendImageContainer = styled.div`
	position:absolute;
	background-color:blue;
	width:95%;
	height:70%;	
	left:10%;
	border-radius:50%;

`;

const FriendsCompanyName = styled.div`

	position:absolute;
	width:90%;
	height:30%;
	top:72%;	
	left:10%;
	font-size:110%;
	color:#3f8ecf;
	overflow:scroll;
`;


class SmallHomeFriendsProfile extends Component{

	constructor(props){
		super(props);

		this.state={

			companyName:"",
			imageContainer:""

		}
	}

	render(){
		return(

			<Container>
				<FriendImageContainer>
				</FriendImageContainer>
				<FriendsCompanyName>Razu</FriendsCompanyName>

			</Container>

		)
	}
}


SmallHomeFriendsProfile.propTypes={

	companyName:PropTypes.string,
	imageContainer:PropTypes.string

};

export default SmallHomeFriendsProfile;