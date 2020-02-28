import React,{Component} from "react";
import styled from "styled-components";


const Container=styled.div`
	position:absolute;
	width:95%;
	height:95%;

`;


const ImageContainer=styled.div`
	position:relative;
	width:230px;
	height:35%;
`;

const Image=styled.div`
	width:100%;
	height:75%;
	background-color:black;
	border-radius:5px;
`;

const ImageCaption=styled.div`
	width:100%;
	height:15%;
	overflow:hidden;
	color:#767677;
`;


class ImagePostsContainer extends Component{

	constructor(props){
		super(props);

		this.state={
		 	images:[
		 		{},
		 		{},
		 		{},
		 		{}
		 	]
		}
	}

	render(){
		return(

			<Container>
				<ul style={{padding:"0px"}}>	
					{this.state.images.map(data=>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",marginBottom:"5%"}}>
							<ImageContainer>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none"}}>
										<Image>

										</Image>
									</li>

									<li style={{listStyle:"none",marginBottom:"5%"}}>
										
										<ImageCaption>

											Lorem ipsum dolor sit amet, consectetur 
											adipiscing elit, sed do eiusmod tempor 
											incididunt ut labore et dolore magna aliqua.
											 Ut enim ad minim veniam, quis nostrud exercitation
											  ullamco laboris nisi ut aliquip ex ea commodo consequat.
											   Duis aute irure dolor in reprehenderit in voluptate velit 
											   esse cillum dolore eu fugiat nulla pariatur. Excepteur
											    sint occaecat cupidatat non proident, sunt in culpa qui
											     officia deserunt mollit anim id est laborum.
										</ImageCaption>
										
									</li>

									<li style={{listStyle:"none"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
												Likes 
											</li>

											<li style={{listStyle:"none",display:"inline-block",marginRight:"24%"}}>
												Comments
											</li>

											<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",color:"#C8B0F4"}}>
												Dec 23, 1996
											</li>
										</ul>
									</li>

								</ul>

							</ImageContainer>
						</li>
					)}
				</ul>

			</Container>
		)
	}
}

export default ImagePostsContainer;