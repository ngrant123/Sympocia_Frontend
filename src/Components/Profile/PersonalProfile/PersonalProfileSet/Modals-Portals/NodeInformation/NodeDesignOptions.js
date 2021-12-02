import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {
	retrieveFriendsGaugeNodePaymentVerification,
	retrieveSympociaFriendsGaugeNodeAvatars
} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import ArrowBackIosNewIcon from '@material-ui/icons/ChevronLeft';
import {
	updateFriendsGaugeNodeAvatar
} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {Link} from "react-router-dom";

const ButtonCSS={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer",
  marginRight:"2%"
}

const BackButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"1px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	marginRight:"5px",
	borderRadius:"50%",
	borderStyle:"none",
	marginRight:"2%",
	marginBottom:"2%",
	cursor:"pointer"
}


const NodeDesignOptions=({userId,nodeId,closeEditArea})=>{
	const [displaySympociaAvatarOption,changeDisplaySympociaAvatarsOptions]=useState(false);
	const [displayUserUploadAvatarOption,changeDisplayUserUploadAvatarOption]=useState(false);
	const [displayEditStage,changeDisplayEditStage]=useState(false);
	const [displaySympociaFriendsNodeAvatars,changeDisplaySympociaAvatars]=useState();
	const [sympociaFriendsGaugeAvatars,changeSympociaFriendsGaugeAvatars]=useState([]);
	const [displaySelectedSympociaFriendGaugeAvatar,changeDisplaySelectedFriendsGaugeAvatar]=useState();
	const [img,changeImgUrl]=useState();
	const [selectedAvatarKey,changeSelectedAvatarKey]=useState();


	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await retrieveFriendsGaugeNodePaymentVerification(userId);
			if(confirmation=="Success"){
				const {
					message:{
						sympociaAvatarAccess,
						userUploadAvatarAccess
					}
				}=data;
				changeDisplaySympociaAvatarsOptions(sympociaAvatarAccess);
				changeDisplayUserUploadAvatarOption(userUploadAvatarAccess);
			}else{
				alert("Unfortunately there has been an error with payment verification. Please try again");
			}
		}

		fetchData();
	},[]);

	useEffect(()=>{
		const fetchSympociaAvatarsData=async()=>{
			const {confirmation,data}=await retrieveSympociaFriendsGaugeNodeAvatars();
			if(confirmation=="Success"){
				const {message}=data;
				changeSympociaFriendsGaugeAvatars([...message]);
			}else{
				alert("Unfortunately there has been an error with payment verification. Please try again");
			}
		}

		if(displaySympociaFriendsNodeAvatars){
			fetchSympociaAvatarsData();
		}
	},[displaySympociaFriendsNodeAvatars]);

	const uploadImage=async()=>{
		const updatedAvatarInformation={
			userId,
			nodeId,
			imgUrl:displaySympociaFriendsNodeAvatars==false?img:null,
			avatarKey:displaySympociaFriendsNodeAvatars==true?selectedAvatarKey:null,
			isUserUploaded:!displaySympociaFriendsNodeAvatars
		}

		const {confirmation,data}=await updateFriendsGaugeNodeAvatar(updatedAvatarInformation);
		if(confirmation=="Success"){
			alert('Success');
			closeEditArea();
		}else{
			alert('Unfortunately there has been an error with updating your avatar ')
		}
	}

	const backButton=()=>{
		return(
			<div style={BackButtonCSS} onClick={()=>changeDisplayEditStage(false)}>
				<ArrowBackIosNewIcon
					style={{fontSize:"20px"}}
				/>  
			</div>
		)
	}

	const selecteSympociaFriendsNodeAvatar=({key,base64url})=>{
		changeImgUrl(base64url);
		changeSelectedAvatarKey(key);
		changeDisplaySelectedFriendsGaugeAvatar(true);
	}

	const sympociaFriendsGaugeAvatar=(data)=>{
		return(
			<div style={{marginRight:"5%",marginBottom:"5%",cursor:"pointer"}} 
				onClick={()=>selecteSympociaFriendsNodeAvatar(data)}>
				<img src={data.base64url} style={{width:"80px",height:"80px",borderRadius:"5px"}}/>
			</div>
		)
	}


	const selectedImageDisplay=()=>{
		return(
			<div style={{display:"flex",flexDirection:"column"}}>
				<img src={img} />
				<div style={{display:"flex",flexDirection:"row",marginTop:"2%"}}>
					<div onClick={()=>changeDisplaySelectedFriendsGaugeAvatar(false)}
						style={ButtonCSS}>
						Back
					</div>
					<div style={ButtonCSS} onClick={()=>uploadImage()}>
						Upload
					</div>
				</div>
			</div>
		)	
	}

	const sympociaFriendsNodeAvatars=()=>{
		return(
			<div>
				<div style={{display:"flex",flexDirection:"row"}}>
					{backButton()}
					<p>Sympocia Avatars</p>
				</div>
				<hr/>
				{displaySelectedSympociaFriendGaugeAvatar==true?
					<>{selectedImageDisplay()}</>:
					<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
						{sympociaFriendsGaugeAvatars.map(data=>
							<>{sympociaFriendsGaugeAvatar(data)}</>
						)}
					</div>
				}
			</div>
		)
	}


	const handleUploadPicture=()=>{
		let reader= new FileReader();
		const picture=document.getElementById("uploadPictureFile").files[0];

		reader.onloadend=()=>{
			const picUrl=reader.result;
			const maxFileSize=7000*1024;
			if(picture.size>maxFileSize){
				alert('Your file is too large. We only accept images that have a max size of 7MB. You can go to preview (Mac) and lower the resolution there.');
			}else{
				const picUrl=reader.result;
				changeImgUrl(picUrl);
				changeDisplaySelectedFriendsGaugeAvatar(false);


			}
		}

		if(picture!=null){
				reader.readAsDataURL(picture);
		}
		else{
			alert("Sorry but this type of image is not currently allowed. Change it to either jpeg,png to continue");
		}
	}

	const clickUploadPhotoButton=()=>{
		document.getElementById("uploadPictureFile").click();
	}


	const uploadOwnerFriendNodeAvatarModal=()=>{
		return(
			<div>
				{img==null?
					<>
						<div style={{...ButtonCSS,width:"30%"}} onClick={()=>clickUploadPhotoButton()}>
							Upload image
						</div>
						<input type="file" name="img" id="uploadPictureFile" style={{opacity:"0"}}  onChange={()=>handleUploadPicture()} 
					        accept="image/jpeg" 
					        name="attachments">
					    </input>
					</>:
					<>{selectedImageDisplay()}</>
				}
			</div>
		)
	}

	const triggerDisplayEditStage=(displaySymposicaAvatarsIndicator)=>{
		changeDisplayEditStage(true);
		changeDisplaySympociaAvatars(displaySymposicaAvatarsIndicator);
	}

	return(
		<div style={{marginTop:"5%"}}>	
			{displayEditStage==false?
				<React.Fragment>
					{(displaySympociaAvatarOption==false && displayUserUploadAvatarOption==false)==true?
						<div>
							<p>
								Unfortunately you have not unlocked the option to design your node avatar. 
								You can access this option through the payment page.
							</p>
							<div style={ButtonCSS}>
								<Link to={{pathname:"/payment"}}>
									<p>Proceed to payment page</p>
								</Link>
							</div>
						</div>:
						<React.Fragment>
							<p>Which would you like to do?</p>
							<div style={{display:"flex",flexDirection:"row"}}>
								{displaySympociaAvatarOption==true &&(
									<div style={ButtonCSS} onClick={()=>triggerDisplayEditStage(true)}>
										Choose from sympocia avatars
									</div>
								)}

								{displayUserUploadAvatarOption==true &&(
									<div style={ButtonCSS} onClick={()=>triggerDisplayEditStage(false)}>
										Upload own friend gauge node avatar
									</div>
								)}
							</div>
						</React.Fragment>
					}
				</React.Fragment>:
				<React.Fragment>
					{displaySympociaFriendsNodeAvatars==true?
						<>{sympociaFriendsNodeAvatars()}</>:
						<>{uploadOwnerFriendNodeAvatarModal()}</>
					}
				</React.Fragment>
			}
		</div>
	)
}


export default NodeDesignOptions;