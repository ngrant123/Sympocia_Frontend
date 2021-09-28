import React,{useState} from "react"
import styled from "styled-components";
import CameraIcon from '@material-ui/icons/Camera';
import {
		createBeaconReply,
		createBeacon
	} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {useSelector} from "react-redux";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {getSymposiumTags} from "../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Container=styled.div`
	position:relative;
	padding:10px;
	@media screen and (max-width:650px){
		#uploadVideoUrl{
			height:180px !important;
			width:100% !important;
		}
	}
`;

const PostTypes=styled.div`
	display:flex;
	flex-direction:row;
`;

const InputContainer=styled.textarea`
	border-radius:5px;
	width:100%;
	height:200px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	margin-bottom:2%;
	margin-right:2%;
	margin-top:5%;

	@media screen and (max-width:1370px){
		width:100% !important;
	}
`;

const TagsInputContainer=styled.textarea`
	border-radius:5px;
	width:100%;
	height:50px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	margin-bottom:2%;
	margin-right:2%;
	margin-top:5%;

	@media screen and (max-width:1370px){
		width:100% !important;
	}
`;


const DropDownMenuCSS={
	padding:"5px",
	height:"300px",
	top:"-50px",
	marginLeft:"15%",
	width:"80%",
	overflowY:"auto",
	overflowX:"hidden"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const BackButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginBottom:"5%",
  cursor:"pointer"
}

const ButtonCSS={
	display:"flex",
	flexDirection:"row",
	alignItems:"center",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"5px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	marginTop:"10px",
	marginRight:"2%"
}

const SubmitButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	marginTop:"10px",
	marginRight:"2%",
	width:"30%"
}

const SelectedTagCSS={
	display:"flex",
	flexDirection:"row",
	alignItems:"center",
	cursor:"pointer",
	marginRight:"5%",
	marginBottom:"5%"
}

const Creation=({
				closeCreationModal,
				updateBeaconPosts,
				beaconResponseDesignatedPostType,
				ownerId,
				beaconId,
				symposiumId,
				beaconOwnerId,
				originalBeaconPostId,
				isDesktop,
				preSelectedPostType
			})=>{

	const [displayUploadPrompt,changeDisplayUploadPrompt]=useState(true);
	const [selectedPostUrl,changeSelectedPostUrl]=useState();
	const [postType,changePostType]=useState(preSelectedPostType==null?"Images":preSelectedPostType);
	const [isSubmtting,changeIsSubmitting]=useState(false);
	const userInformation=useSelector(state=>state.personalInformation);
	const [tags,changeTags]=useState([]);
	const [loadingTags,changeLoadingTagsStatus]=useState(false);
	const [selectedTags,changeSelectedTags]=useState([]);


	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const clickFileUpload=()=>{
		document.getElementById("uploadFileBeacon").click();
	}
	const handleUploadFile=(currentSelectedPostType)=>{
		const fileReader=new FileReader();
		const currentFileUrl=document.getElementById("uploadFileBeacon").files[0];

		fileReader.onloadend=()=>{
			const fileUrl=fileReader.result;
			let isFileSizeAppropriate=true;
			if(currentSelectedPostType=="Images"){
				const maxFileSize=7000*1024;
				const currentFileSize=currentFileUrl.size;
				if(maxFileSize<currentFileSize)
					isFileSizeAppropriate=false
			}else if(currentSelectedPostType=="Videos"){
				const maxFileSize=15*1024*1024 
				const currentFileSize=currentFileUrl.size;
				if(maxFileSize<currentFileSize)
					isFileSizeAppropriate=false
			}
			if(isFileSizeAppropriate==false){
				let fileSizeErrorPrompt;
				if(currentSelectedPostType=="Images"){
					fileSizeErrorPrompt="7MB for images.";
				}else{
					fileSizeErrorPrompt="15MB for videos.";
				}
				alert('The file you selected is too large. As of right now we only accept files of size '
						+fileSizeErrorPrompt+' Sorry for the inconvenience.'); 
			}else{
				changePostType(currentSelectedPostType);
				changeDisplayUploadPrompt(false);
				changeSelectedPostUrl(fileUrl);
			}
		}

		if(currentFileUrl!=null){
			fileReader.readAsDataURL(currentFileUrl);
		}else{
			alert('Sorry, this file type is not allowed. Please try again');
		}
	}

	const submitBeacon=async()=>{
		const userSubmittedInput=document.getElementById("inputPromptContainer").value;
		changeIsSubmitting(true);
		if(userSubmittedInput==""){
			alert('Please enter a prompt');
		}else{
			let uploadedBeaconResult;
			let currentSubmittedPostType=beaconResponseDesignatedPostType==null?postType:
										beaconResponseDesignatedPostType;

			if(currentSubmittedPostType=="Videos"){
				alert('We are processing your post and we wil notify you via email and on here when your post is uploaded. In the meantime you can close this screen everything is being handled');
			}
			if(beaconResponseDesignatedPostType!=null){
				uploadedBeaconResult=await uploadReplyBeacon(userSubmittedInput);
			}else{
				uploadedBeaconResult=await uploadedBeacon(userSubmittedInput);
			}
			const {confirmation,data}=uploadedBeaconResult;
			if(confirmation=="Success"){
				debugger;
				let {message}=data;
				if(currentSubmittedPostType=="Images" || currentSubmittedPostType=="Videos" ||
					currentSubmittedPostType=="Image" || currentSubmittedPostType=="Video"){

					const postUrlParameter=currentSubmittedPostType=="Images"?"imgUrl":"videoUrl"
					message={
						...message,
						[postUrlParameter]:selectedPostUrl
					};
				}
				message={
					...message,
					owner:{
						...message.owner,
						firstName:userInformation.firstName
					}
				};
				updateBeaconPosts(currentSubmittedPostType,message);
			}else{
				alert('There was an error creating this beacon response');
				return null;
			}	
		}
		changeIsSubmitting(false);
	}
	const uploadedBeacon=async(userSubmittedValue)=>{
		const createBeaconResult=await createBeacon({
			postUrl:selectedPostUrl,
			beaconDescription:userSubmittedValue,
			postType,
			ownerId,
			symposiumId,
			tags:selectedTags,
			isMobile:!isDesktop
		})
		return createBeaconResult;
	}
	const uploadReplyBeacon=async(userSubmittedValue)=>{
		const createdBeaconReplyResult=await createBeaconReply({
			beaconId,
			postUrl:selectedPostUrl,
			beaconDescription:userSubmittedValue,
			postType:beaconResponseDesignatedPostType,
			ownerId,
			symposiumId,
			beaconOwnerId,
			originalBeaconPostId,
			isMobile:!isDesktop
		});
		return createdBeaconReplyResult;
	}

	const fetchTagsData=async()=>{
		if(tags.length==0){
			changeLoadingTagsStatus(true);
			const {confirmation,data}=await getSymposiumTags(symposiumId);
			if(confirmation=="Success"){
				const {message}=data;
				changeTags([...message]);
			}else{
				alert('Unfortunately there has been an error when retrieving the symposium tags.Please try again');
			}
			changeLoadingTagsStatus(false);
		}
	}

	const fileUploadSystem=()=>{
		let fileSystemPostType=beaconResponseDesignatedPostType==null?postType:
		beaconResponseDesignatedPostType
		switch(fileSystemPostType){
			case "Images":{
				return(
					<React.Fragment>
						<ul onClick={()=>clickFileUpload()} style={{cursor:"pointer",padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
								<CameraIcon/>
							</li>

							<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
								Upload Photo
							</li>
						</ul>
						<input type="file" name="img" id="uploadFileBeacon" style={{opacity:"0"}}
					        accept="image/jpeg" 
					        name="attachments"
					        onChange={()=>handleUploadFile("Images")} 
					    >
					    </input>
					</React.Fragment>
				)
				break;
			}
			case "Videos":{
				return(
					<React.Fragment>
						<ul onClick={()=>clickFileUpload()} style={{cursor:"pointer",padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
								<CameraIcon/>
							</li>

							<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
								Upload Video
							</li>
						</ul>
						<input type="file" accept="video/mp4,video/x-m4v,video/*" 
							name="video" 
							id="uploadFileBeacon" 
							style={{position:"relative",opacity:"0",zIndex:"0"}}
							onChange={()=>handleUploadFile("Videos")} 
						>
						</input>
					</React.Fragment>
				)
				break;
			}

			case "Regular":{
				return(
					<React.Fragment>
						{promptContainer()}
					</React.Fragment>
				)
				break;
			}
		}
	}

	const postDisplayDecider=()=>{
		switch(postType){
			case "Images":{
				return(
					<img src={selectedPostUrl}
						style={{width:"160px",height:"150px",borderRadius:"5px"}}
					/>
				)
				break;
			}
			case "Videos":{
				return(
					<video id="uploadVideoUrl" key={uuidv4()} width="100%" height="40%" 
						style={{backgroundColor:"#151515",borderRadius:"5px"}}
						borderRadius="5px" controls autoplay>
						<source src={selectedPostUrl} type="video/mp4"/>
					</video>
				)
			}
		}
	}
	const promptContainer=()=>{
		return(
			<React.Fragment>
				{tagsDesign()}
				<InputContainer
					id="inputPromptContainer"
					placeholder="Enter a prompt for your beacon"
				/>
				{isSubmtting==true?
					<p>Submitting...</p>:
					<div onClick={()=>submitBeacon()} style={SubmitButtonCSS}>
						Submit
					</div>
				}
			</React.Fragment>
		)
	}
	const imageUploadType=()=>{
		return(
			<div onClick={()=>changePostType("Images")} style={ButtonCSS}>
				Images
			</div>
		)
	}

	const videoUploadType=()=>{
		return(
			<div onClick={()=>changePostType("Videos")} style={ButtonCSS}>
				Videos
			</div>
		)
	}

	const regularPostUploadType=()=>{
		return(
			<div onClick={()=>changePostType("Regular")} style={ButtonCSS}>
				Regular Posts
			</div>
		)
	}

	const postUploadType=()=>{
		if(beaconResponseDesignatedPostType!=null){
			switch(beaconResponseDesignatedPostType){
				case "Images":{
					return imageUploadType();
					break;
				}
				case "Videos":{
					return videoUploadType();
					break;
				}
				case "Regular":{
					return regularPostUploadType();
					break;
				}
			}
		}else{
			return(
				<React.Fragment>
					{imageUploadType()}
					{videoUploadType()}
					{regularPostUploadType()}
				</React.Fragment>
			)
		}
	}

	const addSelectedTag=(selectedTag)=>{
		const {
			name,
			_id
		}=selectedTag;	
		let currentTags=selectedTags;
		currentTags.push({
			name,
			tagReferenceId:_id
		})

		changeSelectedTags([...currentTags]);
	}

	const removeSelectedTag=(_id)=>{
		debugger;
		let currentTags=selectedTags;
		for(var i=0;i<currentTags.length;i++){
			if(currentTags[i].tagReferenceId==_id){
				currentTags.splice(i,1);
				break;
			}
		}
		changeSelectedTags([...currentTags]);
	}

	const tagsDesign=()=>{
		return(
			<React.Fragment>
				{originalBeaconPostId==null &&(
					<React.Fragment>
						<hr style={HorizontalLineCSS}/>
						<div style={{display:"flex",flexDirection:"column"}}>
							<div class="dropdown">
								<button class="btn btn-primary dropdown-toggle" id="text"
									type="button" data-toggle="dropdown" style={ButtonCSS}
									onClick={()=>fetchTagsData()}>
									<p>Tags</p>
									<ArrowDropDownIcon
										style={{marginTop:"-15%"}}
									/>
								</button>
								<ul class="dropdown-menu" style={DropDownMenuCSS}>
									<TagsInputContainer
										placeholder="Search through tags"
									/>
									<hr/>
									{loadingTags==true?
										<p>Loading...</p>:
										<React.Fragment>
											{tags.length==0?
												<p>No tags</p>:
												<React.Fragment>
													{tags.map(data=>
														<React.Fragment>
															<div style={{display:"flex",flexDirection:"row",cursor:"pointer"}}
																onClick={()=>addSelectedTag(data)}>
																<p>{data.name}</p>
																<p style={{marginLeft:"5%"}}>
																	<b>{data.postCountUsingTag}</b>
																</p>
															</div>
															<hr/>
														</React.Fragment>
													)}
												</React.Fragment>
											}
										</React.Fragment>
									}
								</ul>
						  	</div>
						  	<div style={{display:"flex",flexDirection:"row",marginTop:"5%",flexWrap:"wrap"}}>
						  		{selectedTags.map(data=>
						  			<div style={SelectedTagCSS}
						  				onClick={()=>removeSelectedTag(data.tagReferenceId)}>
										<p>
											<b>{data.name}</b>
										</p>
										<HighlightOffIcon
											style={{marginTop:"-10%",marginLeft:"2px"}}
										/>
						  			</div>
						  		)}
						  	</div>
						</div>
						<hr style={HorizontalLineCSS}/>
					</React.Fragment>
				)}
			</React.Fragment>
		)
	}

	return(
		<Container>
			<div onClick={()=>closeCreationModal()} style={BackButtonCSS}>
				Back
			</div>
			{displayUploadPrompt==true?
				<React.Fragment>
					<PostTypes>
						{postUploadType()}
					</PostTypes>
					<div style={{marginTop:"5%"}}>
						{fileUploadSystem()}
					</div>
				</React.Fragment>:
				<div style={{position:"relative",display:"flex",flexDirection:"column"}}>
					<div>
						{postDisplayDecider()}
					</div>

					<div style={{display:"flex",flexDirection:"column"}}>
						{promptContainer()}
					</div>
				</div>
			}
		</Container>
	)	
}

export default Creation;