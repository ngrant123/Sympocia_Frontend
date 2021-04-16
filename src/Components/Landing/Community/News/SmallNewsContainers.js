import React,{useState} from "react";
import styled from "styled-components";
import Test from "./Test.js";
import TestImage from "../../../../designs/background/ThirdSectionBackground.png";

const NewsContainer=styled.div`
	display:column;
	width:27%;
	height:90%;
	margin-right:5%;
	margin-bottom:5%;
	border-radius:5px;
	box-shadow: 5px 10px 10px #E1E1E1;
	overflow:hidden;
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


const SmallNewsContainer=({news,displaySelectedBlog})=>{
	return(
		<React.Fragment>
			{news.map(data=>
				<React.Fragment>
					<NewsContainer>
						<div style={{height:"250px",overflow:"hidden"}}>
							<img src={TestImage} style={{width:"100%",height:"100%"}}/>
						</div>
						<NewsInformation>
							<p style={{fontSize:"20px",maxHeight:"60px",overflow:"hidden"}}>
								<b>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
									Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
									cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</b>
							</p>
							<OwnerInformation>
								<img src={TestImage} style={{borderRadius:"50%",width:"40px",height:"40px"}}/>
								<p style={{fontSize:"12px",color:"#939393",marginLeft:"2%",maxWidth:"200px",maxHeight:"30px",overflow:"hidden"}}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
									Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
									cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</p>
							</OwnerInformation>
				 			<PostInformation>
								<p style={{maxHeight:"40px",overflow:"hidden",color:"#939393"}}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
									Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
									cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</p>
								<hr style={HorizontalLineCSS}/>
								<SecondaryPostInformation>
									<div style={ReadButtonCSS} onClick={()=>displaySelectedBlog(data)}>
										Read
									</div>

								</SecondaryPostInformation>
							</PostInformation>

						</NewsInformation>
					</NewsContainer>
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

export default SmallNewsContainer;