import React,{useState,Component} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import FormatItalicOutlinedIcon from '@material-ui/icons/FormatItalicOutlined';
import FormatBoldOutlinedIcon from '@material-ui/icons/FormatBoldOutlined';
import CodeOutlinedIcon from '@material-ui/icons/CodeOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import FormatQuoteRoundedIcon from '@material-ui/icons/FormatQuoteRounded';
import FunctionsRoundedIcon from '@material-ui/icons/FunctionsRounded';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import {createRegularPost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";

import SendIcon from '@material-ui/icons/Send';

const Container = styled.div`
	position:relative;
	width:100%;
	height:100%;
	background-color:white;

`;

const TextArea=styled.div`
	position:relative;
	height:65%;
	width:100%;
	background-color:#fefdff;
	resize:none;
	outline:none;
	border-radius:5px;
	border-style:none;
	box-shadow:1px 1px 5px #9395a0;
	font-size:20px;
	padding:40px;
	overflow:hidden;
	z-index:1;
`;

const ProfilePicture=styled.div`
	position:relative;
	width:70px;
	height:17%;
	background-color:blue;
	border-radius:50%;
	border-style:solid;
	border-color:#5298F8;
	border-width:3px;

`;

const CameraModal=styled.div`

	position:absolute;
	top:20%
	width:100%;
	height:100%;
	z-index:3;
	visibility:hidden;
`;

const PhotoButton=styled.div`
	position:absolute;
	z-index:3;
	width:5%;
	top:55%;
	left:45%;
	height:10%;
	border-radius:50%;
	background-color:red;

`;

const Photo=styled.div`
	position:absolute;
	top:20%
	width:100%;
	height:100%;
	z-index:3;
	visibility:hidden;
`;

 const RegularPostCreation=(props)=>{
	const [displayCameraModal,changeDisplayCameraModal]=useState(false);
	const [postContents,changePostContents]=useState("");
	const [displayBold,changeBold]=useState(false);
	const {personalInformation}=useSelector(state=>state);
	console.log(props);

	const displayCamera=()=>{
		if(displayCameraModal==true){
				var video=document.getElementById("video");

				if (navigator.mediaDevices.getUserMedia) {
					  navigator.mediaDevices.getUserMedia({ video: true })
					    .then(function (stream) {
					      video.srcObject = stream;
					     
					    })
				    .catch(function (error) {
				      console.log("Something went wrong!");
				    });
				}	
			}
		}

	const displayCameraModalIndicator=()=>{
			if(displayCameraModal==true){
				displayCamera();
				document.getElementById("cameraModal").style.visibility="visible";
			}
			else{
				return <React.Fragment></React.Fragment>;
			}
		}

	const stopRecording=()=>{
		var video=document.getElementById("video");
		var stream=video.srcObject;
		video.srcObject=null;
	}
	const photo=()=>{
		document.getElementById("cameraModal").style.visibility="hidden";

		var canvas = document.getElementById('canvas');
		 const video=document.getElementById("video");
        canvas.width  = video.offsetWidth;
        canvas.height = video.offsetHeight;

        var tempcontext = canvas.getContext("2d");
         var tempScale = (canvas.height/canvas.width);

        tempcontext.drawImage(
            video,
            0, 0,
            video.offsetWidth, video.offsetHeight
        );

        stopRecording();
        changeDisplayCameraModal(false);
        var canvasDataUrl=canvas.toDataURL();
        const canvasImage='<img src="' + canvasDataUrl + '">';
	}

	const insertPhotoIntoText=()=>{ 

	}

	const addBold=(props)=>{
		var textArea=document.getElementById("textAreaContainer");
        var boldTextHolder= document.createElement("b");
        boldTextHolder.innerHTML=" \u00A0";
        textArea.appendChild(boldTextHolder);
//
	}

	const regardLetters=(props)=>{

		if(displayBold==true){
			addBold(props);
		}
		else{
			changePostContents(postContents+props.key);
		}
	}

	const sendRegularPost=()=>{
		console.log("Teste");

		const content=document.getElementById("textAreaContainer").innerHTML;
		const {id}=personalInformation;
		createRegularPost("12345678",content);
		
	}

/*
	const displayPostOption=(postOption)=>{
		if(postOption=="RegularPost"){
			props.dispal
		}


	}
*/

	return(
		<Container>
			{displayCameraModalIndicator()}

			<CameraModal id="cameraModal">
							<PhotoButton id="photoButton" onClick={()=>photo()}/>
							<video id="video" height="70%" width="100%" autoplay="true">
								
							</video>
			</CameraModal>

			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginLeft:"2%",marginTop:"1%",marginBottom:"1%"}}>
							<ProfilePicture>
							
							</ProfilePicture> 
						</li>

						<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",top:"0%"}}>
							<ul style={{padding:"5px",position:"relative",top:"-30px",borderRadius:"5px",boxShadow:"1px 1px 5px 	#9395a0"}}>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<ImageOutlinedIcon
										style={{fontSize:30}}
										onClick={()=>changeDisplayCameraModal(true)}
									/>
								</li>

								<li style={{listStyle:"none",display:"inline-block"}}>
									<FormatBoldOutlinedIcon
										style={{fontSize:30}}
										onClick={()=>changeBold(!displayBold)}
									/>
								</li>

								<li style={{listStyle:"none",display:"inline-block"}}>
									<FormatItalicOutlinedIcon
										style={{fontSize:30}}
									/>
								</li>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<CodeOutlinedIcon
										style={{fontSize:30}}
									/>
								</li>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<FormatListBulletedOutlinedIcon
										style={{fontSize:30}}
									/>
								</li>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<FormatListNumberedOutlinedIcon
										style={{fontSize:30}}
									/>
								</li>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<FormatQuoteRoundedIcon
										style={{fontSize:30}}
									/>
								</li>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<FunctionsRoundedIcon
										style={{fontSize:30}}
									/>
								</li>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<EmojiEmotionsOutlinedIcon
										style={{fontSize:30}}
										/>
								</li>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<GifIcon	
										style={{fontSize:30}}
									/>
								</li>
							</ul>

						</li>

						<li style={{listStyle:"none",display:"inline-block",position:"relative",top:"-50px",marginRight:"1%"}}>
							<div class="dropdown">
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																															borderColor:"#5298F8",
																															borderStyle:"solid",
																															borderWidth:"1px",
																															color:"#5298F8",
																															backgroundColor:"white"}}>
										Industries
									   	<span class="caret"></span>
									</button>
									<ul class="dropdown-menu">
										<li><a href="">Most Popular</a></li>
										<li><a href="">Most Recent</a></li>
										
									</ul>
			  				 </div>

						</li>

						<li style={{listStyle:"none",display:"inline-block",position:"relative",top:"-50px"}}>
							<div class="dropdown">

									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																															borderColor:"#5298F8",
																															borderStyle:"solid",
																															borderWidth:"1px",
																															color:"#5298F8",
																															backgroundColor:"white"}}>
										Post Option
									   	<span class="caret"></span>
									</button>

									<ul class="dropdown-menu">
										<li onClick={()=>props.displayProps("ImagePosts")}><a>Image</a></li>
										<li onClick={()=>props.displayProps("VideoPosts")}><a>Video</a></li>
										<li onClick={()=>props.displayProps("RegularPost")}><a>Post</a></li>
										<li onClick={()=>props.displayProps("RegularPost")}><a href={"/blog"}>Blog</a></li>
									</ul>
			  				 </div>

						</li>



					</ul>

				</li>

				<li style={{listStyle:"none",marginBottom:"1%"}}>
					<TextArea id="textarea">
						<p style={{position:"absolute",height:"75%",width:"85%",overflowY:"auto"}} contenteditable="true" id="textAreaContainer"  onKeyPress={e=>regardLetters(e)}>
							Testing
						</p>
					</TextArea>
				</li>

				<li style={{listStyle:"none",backgroundColor:"#C8B0F4",width:"20%",padding:"10px",textAlign:"center",fontSize:"15px",borderRadius:"5px",marginLeft:"80%"}}>
					
					<ul onClick={()=>sendRegularPost()} style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
							<SendIcon
								style={{fontSize:20,color:"white"}}

							/>
						</li>

						<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",color:"white"}}>
							Send
						</li>
					</ul>

				</li>
			</ul>
			<canvas id="canvas"  style={{width:"240",height:"297",border:"1px solid #d3d3d3"}}>

			</canvas>

		</Container>

	)
}

export default RegularPostCreation;

