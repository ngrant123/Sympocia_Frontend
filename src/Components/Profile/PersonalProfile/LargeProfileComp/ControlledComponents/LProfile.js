import React, { useState, useEffect, useRef,Component } from 'react'
import styled from "styled-components";
import { GeneralNavBar } from "../../../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import MediumProfileContentsContainer from "../../MediumProfileComp/MediumProfileContentsContainer.js";
import MediumProfilePersonalInformation from "../../MediumProfileComp/MediumProfilePersonalInformation.js";
import Anime from 'react-anime';
import Typed from "react-typed";
import {useSelector,useDispatch} from 'react-redux';

//import BIRDS from '../../../../../vanta/src/vanta.birds.js'

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
`;


const ProfilePictureContainer=styled.div`
	position:absolute;
	width:25%;
	height:30%;
	top:15%;
	left:2%;
	background-color:white;
	border-style:solid;
	border-color:white;
	border-width:7px;
	border-radius:5px;
	box-shadow: 5px 5px 5px 5px #f1f1f1;
`;


const HeaderContainer=styled.div`

	width:100%;
	height:30%;
	background-color:white;

`;

const ProfileContainer=styled.div`
	width:100%;
	height:70%;
	background-color:white;
	box-shadow: 5px 5px 5px 5px #d5d5d5;
`;

const PersonalProfileInformationContainer= styled.div`
	position:absolute;
	top:50%;
	width:25%;
	height:45%;
	left:2%
	background-color:#fbfdff;
	border-radius:5px;
	box-shadow: 2px 2px 2px 2px #d5d5d5;
	transition:.8s;
	padding:10px;

	&:hover{
		box-shadow: 5px 5px 5px 5px #d5d5d5;

	}
`;

const PersonalProfileContentContainer= styled.div`

	position:relative;
	top:0%;
	width:68%;
	height:95%;
	left:30%;
	background-color:white;
	border-radius:5px;
`;

const ImageButtonContainer=styled.div`
	position:absolute;
	width:15%;
	height:7%;
	top:20%;
	left:30%;
	font-size:310%;
	box-shadow: 2px 2px 2px 2px #d5d5d5;
	background-color:white;
	text-align:center;
	transition:.8s;
	border-radius:5px;


  &::before,
  &::after {
    box-sizing: inherit;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &::before,
  &::after {
    top: 0;
    left: 0;
  }

  &::before {
    border: 2px solid transparent; // We're animating border-color again
  }

  &:hover::before {
    border-color: #3386f6;
    border-radius:5px;

    transition:
      border-top-color 0.15s linear, // Stagger border appearances
      border-right-color 0.15s linear 0.10s,
      border-bottom-color 0.15s linear 0.20s;
      border-left-color 0.15s linear 0.20s;
  }

  &::after {
    border: 0 solid transparent;
  }

  &:hover::after {
    border-top: 2px solid $border-color; // Shows border
    border-left-width: 2px; // Solid edges, invisible borders
    border-right-width: 2px; // Solid edges, invisible borders

    transition:
      transform 0.4s linear 0s,
      border-left-width 0s linear 0.35s; // Solid edge post-rotation
  }
`;

const VideoButtonContainer=styled.div`
	position:absolute;
	width:15%;
	height:7%;
	top:20%;
	font-size:310%;
	box-shadow: 2px 2px 2px 2px #d5d5d5;
	left:50%;
	background-color:white;
	text-align:center;
	border-radius:5px;



  &::before,
  &::after {
    box-sizing: inherit;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &::before,
  &::after {
    top: 0;
    left: 0;
  }

  &::before {
    border: 2px solid transparent; // We're animating border-color again
  }

  &:hover::before {
    border-color:#af9ad5;
    border-radius:5px;

    transition:
      border-top-color 0.15s linear, // Stagger border appearances
      border-right-color 0.15s linear 0.10s,
      border-bottom-color 0.15s linear 0.20s;
      border-left-color 0.15s linear 0.20s;
  }

  &::after {
    border: 0 solid transparent;
  }

  &:hover::after {
    border-top: 2px solid $border-color; // Shows border
    border-left-width: 2px; // Solid edges, invisible borders
    border-right-width: 2px; // Solid edges, invisible borders

    transition:
      transform 0.4s linear 0s,
      border-left-width 0s linear 0.35s; // Solid edge post-rotation
  }


`;


const ChangePictureButton=styled.div`	
	position:absolute;
	top:


`;

const NameContainer=styled.div`
	position:absolute;
	top:51%;
	font-size:120%;
	left:3%;
	width:30%;
	height:20%;
`;

const ChangeBioButton=styled.div`
	position:relative;
	background-color:white;
	width:20%;
	height:20%;
	left:5%;
	border-radius:5px;
	border-style:solid;
	border-color:#0649a4;
	border-width:1px;
	text-align:center;
	transition:.8s;
	box-shadow: 1px 1px 1px 1px #d5d5d5;

	color:#5298F8;
	&:hover{
		background-color:white;
		box-shadow: 2px 2px 2px 2px #d5d5d5;
	}

`;

const AddInterestedIndustryButton=styled.div`
	position:absolute;
	background-color:white;
	width:40%;
	height:30%;
	top:35%;
	left:40%;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:	#0649a4;
	transition:.8s;
	text-align:center;
	color:#5298F8;
	box-shadow: 1px 1px 1px 1px #d5d5d5;

	&:hover{
		background-color:white;
		box-shadow: 2px 2px 2px 2px #d5d5d5;
	}
`;

/*
const LProfile = (props) => {

 const [vantaEffect, setVantaEffect] = useState(0)
  const myRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(BIRDS({
        el: myRef.current
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (	

	  	<div  style={{position:'absolute', width:'100%', height:'100%'}}ref={myRef}>
	    Foreground content goes here
	  	</div>

  )
}

*/

const handleChangeProfilePicture=()=>{


	console.log('Change pic button clicked');
}

const LProfile=()=>{

	//const displayImagesOrVideos=useSelector(state=>this.state.images);
	useEffect(()=>{

		console.log('Component mounted');
	})

	return(
		<Container>

			<HeaderContainer>

				<GeneralNavBar/>

			</HeaderContainer>

			<ProfileContainer>

				<ImageButtonContainer>
					<b>Images</b>
				</ImageButtonContainer>


				<VideoButtonContainer>
					<b>Videos</b>
				</VideoButtonContainer>

				<ProfilePictureContainer>


					<ChangePictureButton onClick={()=>handleChangeProfilePicture()}>
						Change Profile Picture
					</ChangePictureButton>

				</ProfilePictureContainer>


				<NameContainer>
					<b>Hope you're have a good night Nathan</b>
					<p>What are you interested in doing? </p>

					<ChangeBioButton>
						Edit Bio
					</ChangeBioButton>


					<AddInterestedIndustryButton>
						Add Interested Industry
					</AddInterestedIndustryButton>


				</NameContainer>

				<PersonalProfileInformationContainer>

					<MediumProfilePersonalInformation/>

				</PersonalProfileInformationContainer>

				<PersonalProfileContentContainer>

					<MediumProfileContentsContainer/>

				</PersonalProfileContentContainer>

			</ProfileContainer>


		</Container>

	)
}

export default LProfile;
