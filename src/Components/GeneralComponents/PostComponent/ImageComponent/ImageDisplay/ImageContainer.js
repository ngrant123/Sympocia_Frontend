import React,{useState,useEffect,Component} from "react";
import styled,{keyframes} from "styled-components";
import ImageInformation from "./ImageInformation.js";
import Comments from "./Comments.js";
import {ImageProvider} from "./ImageContext.js";
import EditImageCreation from "../ImageCreation/EditImageCreation.js";
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {addStampPost,unStampPost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import StampIcon from "../../../../../designs/img/StampIcon.png";


const Container=styled.div`
	position:relative;
	width:90%;
	height:50%;
	z-index:9;
	border-radius:5px;
	background-color:white;
	border-radius:5px;
	padding:5px;
	box-shadow: 1px 1px 50px #d5d5d5;
	overflow-y:auto;
`;


const Image=styled.div`
	position:relative;
	width:460px;
	height:85%;
	background-color:blue;
	border-radius:20px;
	margin-bottom:5px;
`;

const ImageButtons=styled.div`
	position:relative;
	background-color:#5298F8;
	text-align:center;
	width:120px;
	padding:5px;
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
	  position:absolute;
	  animation:${keyFrame} 1s ease-in-out 0s forwards;
`;


const ImageContainer=(props)=>{
	console.log("Image Modal data");
	console.log(props);
	debugger;
	const [commentImageIndicator,changeIndicator]=useState(true);
	const [displayImageModal,changeDisplayImage]=useState(false);
	const [displayStampEffect,changeDisplayStampEffect]=useState(false);

	const handleRemoveImagePost=()=>{

	}

	const createOrRemoveStampEffect=()=>{
		var isPersonalProfile=props.profileType=="personalProfile"?true:false;
		debugger;
		//(userId,postId,profileType,postType)
		if(displayStampEffect==false){
			if(isPersonalProfile==true){
				addStampPost(props.imageData.owner,props.imageData._id,"personal","ImagePost");
			}else{
				addStampPost(props.imageData.owner,props.imageData._id,"company","ImagePost");
			}
			changeDisplayStampEffect(true);

		}else{
			if(isPersonalProfile==true){
				unStampPost(props.imageData.owner,props.imageData._id,"personal","ImagePost");
			}else{
				unStampPost(props.imageData.owner,props.imageData._id,"company","ImagePost");
			}
			changeDisplayStampEffect(false);
		}
	}



	return(
	
		
		<ImageProvider value={{
			updateIndicator:(indicator)=>{
				changeIndicator(indicator);
			}
		}}>
			<React.Fragment>>
				{displayImageModal==true?
					<EditImageCreation
						imageSrcUrl={props.imageData.imgUrl}

					/>:
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"70px"}}>
							<ul>
								<li style={{listStyle:"none",marginBottom:"2%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",marginBottom:"5px",marginRight:"5px"}}>
											<ImageButtons>
												Promote
											</ImageButtons>
										</li>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"3%"}}>
											<ImageButtons onClick={()=>createOrRemoveStampEffect()}>
												Stamp
											</ImageButtons> 
										</li>
										<li onClick={()=>changeDisplayImage(!displayImageModal)} style={{listStyle:"none",display:"inline-block",marginRight:"3%"}}>
											<a style={{textDecoration:"none"}}href="javascript:;">
												<EditIcon/> 
												Edit image
											</a>
										</li>

										<li onClick={()=>handleRemoveImagePost()} style={{listStyle:"none",display:"inline-block"}}>
											<a style={{textDecoration:"none"}}href="javascript:;">
												<HighlightOffIcon/> 
												Remove image
											</a>
										</li>
									</ul>
								</li>
								<li style={{listStyle:"none"}}>
									<Image>	
										{displayStampEffect==true?
												<React.Fragment>
													<StampIconEffect
														id="stampEffect"
													>
														<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
													</StampIconEffect>
												</React.Fragment>:
												null}
										<img src={props.imageData.imgUrl} style={{width:"100%",height:"100%"}}/>
									</Image>
								</li>

							</ul>
						</li>

						<li style={{listStyle:"none",display:"inline-block",padding:"0px"}}>
							{
								commentImageIndicator==true?
									<ImageInformation
										imageInformation={props.imageData}
									/>
									:<Comments
										imageComments={props.imageData}
									/>
							}

						</li>
					</ul>
				}
			</React.Fragment>
		</ImageProvider>

	)
}

export default ImageContainer;