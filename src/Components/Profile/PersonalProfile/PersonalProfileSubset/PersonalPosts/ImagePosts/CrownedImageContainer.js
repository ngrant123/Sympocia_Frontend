import React from "react";
import styled from "styled-components";


/*
	audioDescription: "data:application/octet-stream;base64,GkXfo59ChoEBQ"
	caption: "TEStin"
	comments: []
	datePosted: 1594367618370
	description: "yup"
	imageScore: 0
	imgUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcIA"
	industriesUploaded: [{…}]
	owner: "5f07eabdda8abe1fb10375e5"
	stampCount: 0
	videoDescription: "data:application/octet-stream;base64,GkXfo6NChoEBQ"
	__v: 0
	_id: "5f081ee3502ed922ffba5169"
*/

const Image=styled.div`
	position:relative;
	width:400px;
	height:90%;
	background-color:blue;
	border-radius:5px;
	overflow:hidden;
`;

const Description=styled.div`
	position:relative;
	height:150%;
	overflow:hidden;
	color:#767677;
`;


const IndustryButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	listStyle:"none",
	padding:"5px",
	display:"inline-block",
	borderRadius:"5px",
	marginRight:"2%"
}

const CrownedImageContainer=(props)=>{
	const {imageData}=props;
	return(
		<ul style={{padding:"0px",height:"45%"}}>
			<li style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
				<Image>
					<img src={imageData.imgUrl} style={{width:"100%",height:"100%"}}/>
				</Image>
			</li>

			<li style={{position:"absolute",top:"0%",listStyle:"none",display:"inline-block",width:"50%"}}>
				<ul style={{paddging:"0px"}}>
					<li style={IndustryButtonCSS}>
						{imageData.industriesUploaded[0].industry}
					</li>
					<li style={{listStyle:"none",marginRight:"5%",marginBottom:"5px"}}>
						<b>{imageData.caption}</b>
					</li>

					{/*
						<li style={{listStyle:"none",marginBottom:"5px"}}>
							2 days ago
						</li>
					*/}

					<li style={{listStyle:"none"}}>
						<Description>
							{imageData.description}
						</Description>
					</li>
					<li style={{listStyle:"none",marginTop:"2%"}}>
						<ul style={{padding:"0px"}}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li style={IndustryButtonCSS}>
									Stamp
								</li>
							</a>

							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li style={IndustryButtonCSS}>
									Comment
								</li>
							</a>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	)
}

export default CrownedImageContainer;