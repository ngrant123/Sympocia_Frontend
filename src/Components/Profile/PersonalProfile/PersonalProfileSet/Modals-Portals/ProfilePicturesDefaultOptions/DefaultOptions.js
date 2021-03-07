import React,{useEffect,useState} from "react";
import styled from "styled-components";

const importAll = (r) => r.keys().map(r);
const PicturesContainer=styled.div`
	width:100%;
	flex-wrap:wrap;
	display:flex;
	flex-direction:row;
`;

const SelectedPictureContainer=styled.div`
	display:flex;
	flex-direction:row;
`;

const ButtonContainerCSS={
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer",
  marginRight:"5%",
  marginTop:"5%"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0"
}

const ImageCSS={
	marginRight:"2%",
	marginBottom:"2%",
	width:"90px",
	height:"90px",
	cursor:"pointer"
}

const DefaultOptions=({backButtonTrigger,uploadFile})=>{
	const [defaultProfileOptions,changeDefaultProfileOptions]=useState([]);
	const [selectedImgSrc,changeSelectedImageSrc]=useState();
	useEffect(()=>{
		const defaultProfileOptions=importAll(require.context("../../../../../../designs/defaultProfilePictures", false, /\.jpeg$/));
		changeDefaultProfileOptions([...defaultProfileOptions]);
	},[])
	const selectImage=(imageSrc)=>{
		changeSelectedImageSrc(imageSrc);
	}

	const convertImageToDataUrl=()=>{
		debugger;
		let defaultImage=new Image();
		const canvas=document.createElement('canvas');
		const canvasContext=canvas.getContext('2d');
		defaultImage.onload=function(){
			canvas.width=defaultImage.width;
			canvas.height=defaultImage.height;

			canvasContext.drawImage(defaultImage,0,0,defaultImage.width,defaultImage.height);
			const dataUrl=canvas.toDataURL("image/jpeg");
			uploadFile({isAccessTokenUpdated:false,selectedImageSrc:dataUrl})
		}
		defaultImage.src=selectedImgSrc
	}

	const backButton=()=>{
		if(selectedImgSrc!=null){
			changeSelectedImageSrc(null)
		}else{
			backButtonTrigger()
		}
	}
	return(
		<React.Fragment>
			<p style={ButtonContainerCSS} onClick={()=>backButton()}>
				Back
			</p>
			{selectedImgSrc!=null ?
				<SelectedPictureContainer>
					<img src={selectedImgSrc} style={ImageCSS}/>
					<p onClick={()=>convertImageToDataUrl()} style={ButtonContainerCSS}> Upload</p>
				</SelectedPictureContainer>:
				<React.Fragment>
					<p> Choose from the options below </p>
					<hr style={HorizontalLineCSS}/>
					<PicturesContainer>
						{defaultProfileOptions.map(data=>
							<img onClick={()=>selectImage(data.default)}
								src={data.default} style={ImageCSS}
							/>
						)}
					</PicturesContainer>
				</React.Fragment>
			}

		</React.Fragment>
	)
}


export default DefaultOptions;