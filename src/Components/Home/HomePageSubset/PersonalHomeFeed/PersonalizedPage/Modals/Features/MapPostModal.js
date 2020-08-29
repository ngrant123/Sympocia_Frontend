import React,{Component} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CameraIcon from '@material-ui/icons/Camera';
import ReactMapGL ,{Marker,Popup } from 'react-map-gl';

const DescriptionInputContainer=styled.textarea`
	border-radius:5px;
	height:20%;
	width:95%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const MarkerContainer=styled.div`

	position:relative;
	background-color:white;
	width:70px;
	height:65px;
	border-radius:5px;
	padding:2px;
	overflow:hidden;
	box-shadow:2px 2px 5px #707070;
`;

const UploadChoicesButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"2%"
}

const ButtonCSS={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  width:"30%"
}

const BackButtonCSS={
	listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  width:"30%"
}

const MAPBOX_TOKEN ="pk.eyJ1IjoibmdyYW50MTIzIiwiYSI6ImNrNzZzcjV3NTAwaGYza3BqbHZjNXJhZDkifQ.DsFpgYjX7ZUtOe7cFmylhQ";

class MapPostModal extends Component{


	constructor(props){
		super(props);
		this.state={
			viewport: {
		      width: "100%",
		      height:"100%",
		      latitude:40.730610,
		      longitude:-73.935242,
		      zoom: 8
		    },
		    displayMarker:false,
			long:0,
			lat:0,
			displayMapPage:false,
			displayPostDecider:false,
			description:"",
			imgUrl:null
		}
	}


	handleUploadPicture=()=>{
		var fileReader=new FileReader();
		var currentImgUrl=document.getElementById("uploadPictureFile").files[0];

		fileReader.onloadend=()=>{
			const imgResult=fileReader.result;
			this.setState({
				imgUrl:imgResult,
				displayPostDecider:true
			});
		}

		if(currentImgUrl!=null){
			fileReader.readAsDataURL(currentImgUrl);
		}else{
			alert('Sorry, this image type is not allowed. Please try again');
		}
	}

	clickFileUpload=()=>{
		document.getElementById("uploadPictureFile").click();
	}

	displayMapPageHandle=()=>{
		this.setState({
			description:document.getElementById("description").value,
			displayMapPage:true
		});
	}

	updateLatLongMarker=(props)=>{
		const {lngLat}=props;
		const long=lngLat[0];
		const lat=lngLat[1];
		this.setState({
			lat:lat,
			long:long,
			displayMarker:true
		});
	}



	render(){
		return(
			<ul style={{padding:"20px"}}>
			{this.state.displayMapPage==false?
				<>
					<p style={{fontSize:"20px"}}>
						<b>Step 1: Upload an Image or Write a description</b>
					</p>
					<hr/>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							{this.state.displayPostDecider==false?
								<>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li style={UploadChoicesButton} onClick={()=>this.clickFileUpload()}>
												<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
															<CameraIcon/>
														</li>

														<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
															Upload Photo
														</li>
													</ul>
												<input type="file" name="img" id="uploadPictureFile" 
													style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>this.handleUploadPicture()} 
													accept="image/x-png,image/gif,image/jpeg">
												</input>
										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li style={UploadChoicesButton}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
													<BorderColorIcon/>
												</li>

												<li style={{listStyle:"none",display:"inline-block"}}>
													Write a post
												</li>
												<input type="file" name="img" id="uploadPictureFile2" 
														style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>this.handleUploadPicture()} 
														accept="image/x-png,image/gif,image/jpeg">
												</input>
											</ul>
										</li>
									</a>
								</>
								:
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										<li onClick={()=>this.setState({displayPostDecider:false})} style={BackButtonCSS}>
											Back
										</li>
										<li style={{listStyle:"none",marginBottom:"2%",width:"40%",marginTop:"2%"}}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block",width:"40%",}}>
													<img src={this.state.imgUrl} style={{height:"40%",width:"90%",borderRadius:"5px"}}/>
												</li>
												<li style={{width:"45%",listStyle:"none",display:"inline-block"}}>
													<DescriptionInputContainer id="description" placeholder="Write down a description here"/>
												</li>
											</ul>
										</li>
										<li onClick={()=>this.displayMapPageHandle()} style={ButtonCSS}>
											Next
										</li>
									</ul>
								</li>
							}
						</ul>
					</li> 
				</>
				:
				<>
					<p style={{fontSize:"20px"}}>
						<b>Step 2: Click the country you want to place your post in </b>
					</p>
					{this.state.displayMarker==true?
						<li style={ButtonCSS}>
							Submit
						</li>:
						null
					}
					<hr/>
					<li style={{listStyle:"none"}}>
						<ReactMapGL
							{...this.state.viewport}
							mapboxApiAccessToken={MAPBOX_TOKEN}
							mapStyle="mapbox://styles/ngrant123/ck78412jk0v5s1io79mvz3etw"
							onClick={(e)=>this.updateLatLongMarker(e)}
							onViewportChange={(viewport) => this.setState({viewport})}
							style={{height:"100%",width:"100%"}}>

							{this.state.displayMarker && (
								<Marker latitude={this.state.lat} longitude={this.state.long} offsetLeft={-20} offsetTop={-10}>
						          <MarkerContainer>
						          </MarkerContainer>
						        </Marker>
							)}
						</ReactMapGL>
					</li>

				</>
			}

		</ul>
		)
	}
}

export default MapPostModal;