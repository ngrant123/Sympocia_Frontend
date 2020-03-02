import React,{Component} from "react";
import styled from "styled-components";


const Container=styled.div`
	position:relative;
	width:100%;
	height:80%;
	background-color:white;

`;

const PlayListHeaderImage=styled.div`
	position:relative;
	width:300px;
	height:30%;
	border-radius:5px;
	background-color:blue;
`;

const CurrentPlayListName=styled.div`
	position:relative;
	width:35%;
	font-size:30px;

`;

const PlayListButton=styled.div`
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


const PlayListThumbnail=styled.div`
	position:relative;
	width:140px;
	height:90%;
	background-color:blue
	border-radius:5px;
	margin-bottom:5px;

`;


const HeaderInformationListCSS={
	listStyle:"none",
	fontSize:"20px",
	color:"#6e6e6e"
}

class HeaderInformation extends Component{



	constructor(props){
		super(props);

		this.state={
			playListContainer:[{},{},{},{},{},{},{},{},{},{},{},{}]
		}
	}




	render(){

		return(
			<Container>
				<p style={{position:"relative",fontSize:"60px",top:"20%",left:"30%"}}><b>Play list Information</b></p>

				<ul style={{position:"relative",top:"20%"}}>
					<li style={{listStyle:"none"}}>
						<ul style={{position:"relative",padding:"10px",height:"20%",width:"60%",left:"20%",borderRadius:"5px",marginBottom:"5px",overflowX:"auto"}}>
							{this.state.playListContainer.map(data=>

								<li style={{listStyle:"none",display:"inline-block",marginRight:"10px"}}>
									<PlayListThumbnail>

									</PlayListThumbnail>	
								</li>
							)}
						</ul>
					</li>
					<li style={{listStyle:"none",marginLeft:"40%",marginBottom:"10px"}}>
						<CurrentPlayListName>

							Testing this out lets get it baby
						</CurrentPlayListName>

					</li>
					<li style={{listStyle:"none"}}>
						<ul style={{position:"relative",marginLeft:"30%"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								<PlayListHeaderImage>
								</PlayListHeaderImage>
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>

								<ul style={{position:"absolute",top:"10%"}}>
									<li style={HeaderInformationListCSS}>
										2 Videos 
									</li>

									<li style={HeaderInformationListCSS}>
										Last updated August 2018 
									</li>

									<li style={HeaderInformationListCSS}>
										Public 
									</li>

									<li style={{listStyle:"none",padding:"0px",marginTop:"10px"}}>	
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",marginBottom:"10px"}}>
												<PlayListButton>
													Play all
												</PlayListButton>

											</li>


											<li style={{listStyle:"none"}}>
												<PlayListButton>
													Edit Play List
												</PlayListButton>

											</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</Container>
		)
	}
}


export default HeaderInformation;