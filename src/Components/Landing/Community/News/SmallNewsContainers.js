import React,{useState} from "react";
import styled from "styled-components";
import HeaderImage from "../../../../designs/background/ThirdSectionBackground.png";
import SympociaProfilePicture from "../../../../designs/img/test3.png";

const NewsContainer=styled.div`
	display:column;
	width:27%;
	margin-right:5%;
	margin-bottom:5%;
	border-radius:5px;
	box-shadow: 5px 10px 10px #E1E1E1;
	overflow:hidden;

    @media screen and (min-width:2500px){
		#newsImage{
			height:500px !important;
		}
		font-size:24px !important;
    }

	@media screen and (max-width:1370px){
		width:40% !important;

		#newsImage{
			height:200px !important;
		}
	}
 
	@media screen and (max-width:650px){
		width:100% !important;
		margin-top:5% !important;

		#newsImage{
			height:200px !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	width:60% !important;
    }
`;

const NewsInformation=styled.div`
	display:flex;
	flex-direction:column;
	padding:10%;
`;

const OwnerInformation=styled.div`
	display:flex;
	flex-direction:row;
	margin-top:2%;
	margin-bottom:10%;
`;

const PostInformation=styled.div`
	display:flex;
	flex-direction:column;
`;


const SecondaryPostInformation=styled.div`
	display:flex;
	flex-direction:row;
`;


const ReadButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer"
}

const HorizontalLineCSS={
  marginLeft:"0",
  marginRight:"0"
}


const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"30px",
 	marginRight:"5%",
 	marginLeft:"5%"
}

const SmallNewsContainer=(props)=>{
	const {
		news,
		displaySelectedBlog,
		headerImage,
		displayMobileUI
	}=props;

	const desktopNewsDisplay=(data)=>{
		return(
			<React.Fragment>
				<div id="newsImage" style={{height:"250px",overflow:"hidden"}}>
					<img src={data.headerImage} style={{width:"100%",height:"100%"}}/>
				</div>
				<NewsInformation>
					<p style={{fontSize:"20px",maxHeight:"60px",overflow:"hidden"}}>
						<b>
							{data.title}
						</b>
					</p>
					<OwnerInformation>
						<img src={SympociaProfilePicture} style={{borderRadius:"50%",width:"40px",height:"35px"}}/>
						<p style={{fontSize:"12px",color:"#939393",marginLeft:"2%",maxWidth:"200px",maxHeight:"30px",overflow:"hidden"}}>
							Sympocia
						</p>
					</OwnerInformation>
		 			<PostInformation>
						<p style={{maxHeight:"40px",overflow:"hidden",color:"#939393"}}>
							{data.description}
						</p>
						<hr style={HorizontalLineCSS}/>
						<SecondaryPostInformation>
							<div style={ReadButtonCSS} onClick={()=>displaySelectedBlog(data)}>
								Read
							</div>

						</SecondaryPostInformation>
					</PostInformation>

				</NewsInformation>
			</React.Fragment>
		)
	}

	const mobileNewsDisplay=(data)=>{
		return(
			<React.Fragment>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center",padding:"5px"}}>
					<img src={data.headerImage} style={{width:"50px",height:"50px"}}/>
					<div style={VerticalLineCSS}/>
					<img src={SympociaProfilePicture} style={{borderRadius:"50%",width:"40px",height:"40px"}}/>
					<p style={{fontSize:"12px",color:"#939393",marginLeft:"2%",maxWidth:"200px",maxHeight:"30px",overflow:"hidden"}}>
						Sympocia
					</p>
				</div>
				<hr/>
				<div style={{padding:"5%"}}>
					<p style={{fontSize:"20px",maxHeight:"60px",overflow:"hidden"}}>
						<b>
							{data.title}
						</b>
					</p>
					<p style={{maxHeight:"40px",overflow:"hidden",color:"#939393"}}>
						{data.description}
					</p>
					<SecondaryPostInformation>
						<div style={ReadButtonCSS} onClick={()=>displaySelectedBlog(data)}>
							Read
						</div>

					</SecondaryPostInformation>
				</div>
			</React.Fragment>
		)
	}

	return(
		<React.Fragment>
			{news.map(data=>
				<NewsContainer>
					{displayMobileUI==false?
						<>{desktopNewsDisplay(data)}</>:
						<>{mobileNewsDisplay(data)}</>
					}
				</NewsContainer>
			)}
		</React.Fragment>
	)
}

export default SmallNewsContainer;