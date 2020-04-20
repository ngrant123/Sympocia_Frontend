import React,{useState} from "react";
import styled from "styled-components";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const Container=styled.div`
	position:absolute;
	width:95%;
	height:97%;
	margin-top:1%;
`;


const HeaderImage=styled.div`
	width:100%;
	height:80%;
	border-radius:5px;
	background-color:red;
	border-radius:5px;
`;

const ImagesContainer=styled.div`
	position:relative;
	width:320px;
	height:230px;
	border-radius:5px;
	background-color:red;
`;

const ShadowContainer= styled.div`
	position:absolute;
	width:320px;
	height:230px;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:1;
	transition:.8s;
	border-radius:5px;

	&:hover{
		background-color:transparent
	}
`;

const ImageLabelCSS={
	listStyle:"none",
	display:"inline-block",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	padding:"5px",
	borderRadius:"5px",
	marginRight:"2%"
}
const ImagePostsModal=()=>{
	const [images,changeImages]=useState([{},{},{},{}]);

	return(
			<React.Fragment>
				<li style={{listStyle:"none",display:"inline-block",width:"50%"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",backgroundColor:"red",width:"90%",borderRadius:"5px"}}>
							 <HeaderImage>

							 </HeaderImage>
						</li>
						<li style={{listStyle:"none",width:"80%"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",fontSize:"30px",marginRight:"2%"}}>
									<b>Nathan</b>
								</li>

								<li style={ImageLabelCSS}>
									Engineering
								</li>

								<li style={ImageLabelCSS}>
									Follow
								</li>
							</ul>
						</li>
						<li style={{listStyle:"none",width:"90%"}}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
							  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
							  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
							  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
							  qui officia deserunt mollit anim id est laborum.
						</li>
					</ul>
				</li>

				<li style={{width:"55%",position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"2%",height:"80%",overflowY:"auto",marginBottom:"5%"}}>
					<ul style={{padding:"0px"}}>
						{images.map(data=>
							<li style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"45%",marginRight:"2%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",marginBottom:"1%"}}>
										<ShadowContainer/>
										<ImagesContainer/>
									</li>
									<li style={{listStyle:"none",marginBottom:"1%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
												<b>Nathan</b>
											</li>

											<li style={ImageLabelCSS}>
												Engineering
											</li>
										</ul>
									</li>
									<li style={{listStyle:"none",width:"100%",height:"20%",overflow:"hidden"}}>
										  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit
										  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
										  </p>
									</li>
								</ul>
							</li>
						)}
					</ul>
				</li>
			</React.Fragment>
	)
}

export default ImagePostsModal;